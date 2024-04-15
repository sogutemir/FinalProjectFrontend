// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { getPersonelsWithRoles, updateUserRoles } from "../../api/Personel";

function AuthorizationPage() {
  const [personels, setPersonels] = useState([]);
  const [changes, setChanges] = useState([]);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(!editMode);
  };
  const updatePersonelRoles = async (personelId, roles) => {
    try {
      const response = await updateUserRoles(personelId, roles);
      if (response.status === 200) {
        // ...
      } else {
        setError("Failed to update personel roles");
      }
    } catch (error) {
      setError("An error occurred while updating personel roles");
      console.error("Error updating personel roles", error);
    }
  };

  const handleUpdate = () => {
    changes.forEach((change) => {
      updatePersonelRoles(change.personId, change.roles);
    });
    console.log("Roles updated successfully.");
  };

  const handleRoleChange = (personId, role, isChecked) => {
    setPersonels(
      personels.map((person) => {
        if (person.id === personId) {
          return {
            ...person,
            roles: isChecked
              ? [...person.roles, role]
              : person.roles.filter((r) => r !== role),
          };
        }
        return person;
      })
    );


    setChanges((prevChanges) => {
      if (prevChanges.length === 0) {
        return personels.map((person) => ({
          personId: person.id,
          roles: person.roles,
        }));
      }

      const existingChangeIndex = prevChanges.findIndex(
        (change) => change.personId === personId
      );

      if (existingChangeIndex > -1) {
        const newChanges = [...prevChanges];
        const existingChange = newChanges[existingChangeIndex];

        if (isChecked) {
          existingChange.roles = [...existingChange.roles, role];
        } else {
          existingChange.roles = existingChange.roles.filter((r) => r !== role);
        }

        return newChanges;
      } else {
        return [...prevChanges, { personId, roles: [role] }];
      }
    });

  };

  useEffect(() => {
    console.log("Changes", changes);
  }, [changes]);

  useEffect(() => {
    const fetchPersonelsWithRoles = async () => {
      try {
        const response = await getPersonelsWithRoles();
        if (response.status === 200) {
          const groupedPersonels = response.data.reduce((acc, person) => {
            const id = `${person.userId}`;
            if (!acc[id]) {
              acc[id] = {
                id: person.userId,
                name: person.name,
                surname: person.surname,
                roles: [],
              };
            }
            if (Array.isArray(person.roles) && person.roles[0]) {
              acc[id].roles = [...new Set([...acc[id].roles, ...person.roles])];
            }
            return acc;
          }, {});
          setPersonels(Object.values(groupedPersonels));
        } else {
          setError("Failed to load team personels from server");
        }
      } catch (error) {
        setError("An error occurred while fetching team personels");
        console.error("Error fetching team personels", error);
      }
    };

    fetchPersonelsWithRoles();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Personel</th>
            <th>Standart Kullanıcı</th>
            <th>Yetkili Kullanıcı</th>
            <th>Süper Kullanıcı</th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody>
          {personels.map((person) => {
            return (
              <tr key={person.id}>
                <td>
                  {person.name} {person.surname}
                </td>
                {["USER", "AUTHORIZEDUSER", "SUPERUSER", "ADMIN"].map(
                  (role) => (
                    <td key={role}>
                      <input
                        type="checkbox"
                        checked={person.roles.includes(role)}
                        onChange={(e) =>
                          handleRoleChange(person.id, role, e.target.checked)
                        }
                        disabled={!editMode}
                      />
                    </td>
                  )
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={editMode ? handleUpdate : handleEdit}>
        {editMode ? "Kaydet" : "Düzenle"}
      </button>
    </div>
  );
}

export default AuthorizationPage;
