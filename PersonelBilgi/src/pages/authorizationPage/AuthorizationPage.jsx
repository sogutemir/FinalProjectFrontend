import React, { useState, useEffect } from "react";
import { getPersonelsWithRoles } from "../../api/Personel";

function AuthorizationPage() {
  const [personals, setPersonels] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    const fetchPersonelsWithRoles = async () => {
      try {
        const response = await getPersonelsWithRoles();
        if (response.status === 200) {
          setPersonels(response.data);
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
  return (
    <table>
      <thead>
        <th>Personel</th>
        <th>Standart Kullanıcı</th>
        <th>Yetkili Kullanıcı</th>
        <th>Süper Kullanıcı</th>
        <th>Admin</th>
      </thead>
      <tbody>
        {personals.map((person) => (
          <tr key={person.name + person.surname}>
            <td>
              {person.name} {person.surname}
            </td>
            <td>
              <input
                type="checkbox"
                checked={
                  person.roles.includes("USER") ||
                  person.roles.includes("AUTHORIZEDUSER") ||
                  person.roles.includes("SUPERUSER") ||
                  person.roles.includes("ADMIN")
                }
                disabled={true}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={
                  person.roles.includes("AUTHORIZEDUSER") ||
                  person.roles.includes("SUPERUSER") ||
                  person.roles.includes("ADMIN")
                }
                disabled={true}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={
                  person.roles.includes("SUPERUSER") ||
                  person.roles.includes("ADMIN")
                }
                disabled={true}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={person.roles.includes("ADMIN")}
                disabled={true}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AuthorizationPage;
