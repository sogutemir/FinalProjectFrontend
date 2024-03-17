import React, { useEffect, useState } from "react";
import { getAllPersonel, getResourcePhoto } from "../../api/Personel";

function Personels() {
  const [personels, setPersonels] = useState([]);
  const [resourceUrls, setResourceUrls] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRouteDetail = (id) => {
    console.log(id);
    window.location.href = `http://localhost:5173/personal-detail/${id}`;
    console.log("id", id);
  };

  useEffect(() => {
    const fetchAllPersonels = async () => {
      setIsLoading(true);
      try {
        const response = await getAllPersonel();
        if (response.status === 200) {
          setPersonels(response.data);

          const fetchPromises = response.data.map((personel) =>
            getResourcePhoto(personel.photoId)
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

        } else {
          setError("Failed to load data from server");
        }
      } catch (error) {
        setError("An error occurred while fetching personel data");
        console.error("Error fetching personel", error);
      }
      setIsLoading(false);
    };

    fetchAllPersonels();
  }, []);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <table className="personel-table">
        <thead className="personel-thead">
          <tr className="personel-tr">
            <th className="personel-th">Photo</th>
            <th className="personel-th">Name Surname</th>
            <th className="personel-th">Team Name Title</th>
            <th className="personel-th">Position</th>
            <th className="personel-th">More</th>
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
                {personel.teamName} {personel.teamName}
              </td>
              <td className="personel-td">{personel.position}</td>
              <td className="personel-td">
                <button onClick={() => handleRouteDetail(personel.id)}>
                  More
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>

      </div>
    </>
  );
}

export default Personels;
