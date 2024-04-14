import React, { useEffect, useState } from "react";
import { getResourcePhoto, getPersonelByTeamName } from "../../api/Personel";
import PersonelInfo from "../../components/personel/PersonalInfo.jsx";
import Education from "../education/Education";
import Experience from "../experience/Experience";
import Project from "../project/Project";
import Activity from "../activity/Activity";
import PersonelFile from "../personelFile/PersonelFile";
import styles from "./PersonelsByTeamName.module.css";

function SuperUserPersonels({ teamName }) {
  const [personels, setPersonels] = useState([]);
  const [resourceUrls, setResourceUrls] = useState({});
  const [selectedPersonel, setSelectedPersonel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPersonelsByTeamName = async () => {
      if (!teamName) {
        setError("No team name provided.");
        return;
      }
      setIsLoading(true);
      try {
        const response = await getPersonelByTeamName(teamName);
        if (response.status === 200) {
          setPersonels(response.data);
          fetchResourcePhotos(response.data);
        } else {
          setError("Failed to load team personels from server");
        }
      } catch (error) {
        setError("An error occurred while fetching team personels");
        console.error("Error fetching team personels", error);
      }
      setIsLoading(false);
    };

    fetchPersonelsByTeamName();
  }, [teamName]);

  const fetchResourcePhotos = async (personels) => {
    const fetchPromises = personels.map((personel) =>
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
  };

  const handleSelectPersonel = (personel) => {
    setSelectedPersonel(personel);
  };

  if (!teamName) return <div>Please provide a team name.</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {personels.map((personel) => (
            <tr
              key={personel.id}
              onClick={() => handleSelectPersonel(personel)}
            >
              <td>
                <img
                  src={resourceUrls[personel.id]}
                  alt={`${personel.name} ${personel.surname}`}
                  style={{ width: "100px", height: "100px" }}
                />
              </td>
              <td>{`${personel.name} ${personel.surname}`}</td>
              <td>{personel.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedPersonel && (
        <div style={{ marginLeft: "20px" }}>
          <PersonelInfo 
            personelId={selectedPersonel.id} 
            isPersonels={false}
          />
          <Education 
            personelId={selectedPersonel.id} 
            isPersonels={false}
          />
          <Experience
            personelId={selectedPersonel.id} 
            isPersonels={false}
          />
          <Project 
            personelId={selectedPersonel.id} 
            isPersonels={false}
          />
          <Activity 
            personelId={selectedPersonel.id} 
            isPersonels={false}
          />
          <PersonelFile 
            personelId={selectedPersonel.id} 
            isPersonels={false}
          />
        </div>
      )}
    </div>
  );
}

export default SuperUserPersonels;
