import React, { useState, useEffect } from "react";
import { getPersonelsWithRoles } from "../../api/Personel";

function AuthorizationPage() {
  const [personels, setPersonels] = useState([]);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleRoleChange = (personId, role, isChecked) => {
    // Update person roles in an immutable way
    setPersonels(
      personels.map((person) => {
        if (`${person.name} ${person.surname}` === personId) {
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
  };

  useEffect(() => {
    const fetchPersonelsWithRoles = async () => {
      try {
        const response = await getPersonelsWithRoles();
        if (response.status === 200) {
          const groupedPersonels = response.data.reduce((acc, person) => {
            const id = `${person.name} ${person.surname}`;
            if (!acc[id]) {
              acc[id] = {
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
            const personId = `${person.name} ${person.surname}`;
            return (
              <tr key={personId}>
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
                          handleRoleChange(personId, role, e.target.checked)
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
      <button onClick={handleEdit}>{editMode ? "Kaydet" : "Düzenle"}</button>
    </div>
  );
}

export default AuthorizationPage;
