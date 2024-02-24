import React, { useEffect, useState } from "react";
import {
  getAllPersonel,
  getResourcePhoto as fetchResource,
} from "../api/Personel";

function Personels() {
  const [personels, setPersonels] = useState([]);
  const [resourceUrls, setResourceUrls] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [employedThisMonth, setEmployedThisMonth] = useState([]);
  const [latestPersonel, setLatestPersonel] = useState(null);

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
        setEmployedThisMonth(
          response.data.filter((personel) =>
            isEmployedThisMonth(personel.employmentStartDate)
          )
        );

        // Set the latest personel
        const latestStartDate = Math.max(
          ...response.data.map(
            (personel) => new Date(personel.employmentStartDate)
          )
        );
        setLatestPersonel(
          response.data.find(
            (personel) =>
              new Date(personel.employmentStartDate).getTime() ===
              latestStartDate
          )
        );
      } catch (error) {
        console.error("Error fetching personels", error);
      }
    };

    fetchAllPersonels();
  }, []);

  // Utility function to check employment date
  const isEmployedThisMonth = (startDate) => {
    const employmentDate = new Date(startDate);
    const currentDate = new Date();
    return (
      employmentDate.getMonth() === currentDate.getMonth() &&
      employmentDate.getFullYear() === currentDate.getFullYear()
    );
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : employedThisMonth.length - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % employedThisMonth.length);
  };

  return (
    <>
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
                {personel.teamName} {personel.teamName}
              </td>
              <td className="personel-td">{personel.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {employedThisMonth.length > 0 && (
          <div className="cards-container">
            <button onClick={handlePrevClick}>{"<"}</button>
            <div className="personel-card">
              <img
                src={resourceUrls[employedThisMonth[currentIndex].photoId]}
                alt="Personel"
                className="personel-img"
              />
              <div className="card-text">
                <p className="welcome-text">Hoşgeldin!</p>
                <h3>{`${employedThisMonth[currentIndex].name} ${employedThisMonth[currentIndex].surname}`}</h3>
                <p>Seninle Daha Güçlüyüz!</p>
                <p>
                  {new Date(
                    employedThisMonth[currentIndex].employmentStartDate
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button onClick={handleNextClick}>{">"}</button>
          </div>
        )}
        {latestPersonel && (
          <div className="personel-card">
            <div>
              <img src={resourceUrls[latestPersonel.photoId]} alt="Personel" />
              <h2>İyi Ki Doğdun!</h2>
              <h3>{`${latestPersonel.name} ${latestPersonel.surname}`}</h3>
              <p>Nice mutlu, sağlıklı günler dileriz.</p>
              <p>
                {new Date(
                  latestPersonel.employmentStartDate
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Personels;
