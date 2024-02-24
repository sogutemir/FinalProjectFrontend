import React, { useEffect, useState } from "react";
import { getAllPersonel, getResource as fetchResource } from "../api/Personel";

function Personels() {
  const [personels, setPersonels] = useState([]);
  const [resourceUrls, setResourceUrls] = useState({});

  useEffect(() => {
    const fetchAllPersonels = async () => {
      try {
        const response = await getAllPersonel();
        setPersonels(response.data);

        const fetchPromises = response.data.map((personel) =>
          fetchResource(personel.photoId)
            .then((response) => ({
              id: personel.id,
              url: URL.createObjectURL(response.data),
            }))
            .catch((error) => ({ id: personel.id, url: "" }))
        );

        const results = await Promise.all(fetchPromises);

        const urls = results.reduce((acc, current) => {
          acc[current.id] = current.url;
          return acc;
        }, {});

        setResourceUrls(urls);
      } catch (error) {
        console.error("Error fetching personels", error);
      }
    };

    fetchAllPersonels();
  }, []);

  return (
    <table className="personel-table">
      <thead className="personel-thead">
        <tr className="personel-tr">
          <th className="personel-th">Photo</th>
          <th className="personel-th">Name Surname</th>
          <th className="personel-th">Team Name Title</th>
          <th className="personel-th">Position</th>
        </tr>
      </thead>
      <tbody>
        {personels.map((personel) => (
          <tr key={personel.id} className="personel-tr">
            <td className="personel-td">
              {resourceUrls[personel.id] ? (
                <img
                  src={resourceUrls[personel.id]}
                  alt={`${personel.name} ${personel.surname}`}
                  className="personel-img"
                />
              ) : (
                <span>Loading...</span>
              )}
            </td>
            <td className="personel-td">
              {personel.name} {personel.surname}
            </td>
            <td className="personel-td">
              {personel.teamName} {personel.title}
            </td>
            <td className="personel-td">{personel.position}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Personels;
