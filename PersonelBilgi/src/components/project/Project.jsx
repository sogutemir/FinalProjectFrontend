import React, { useState, useEffect } from "react";
import { getProjectByPersonelId } from "../../api/Personel";
import "./Project.css";

function Project({ personelId }) {
  const [projectDetails, setProjectDetails] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const detailsResponse = await getProjectByPersonelId(personelId);
        if (detailsResponse.status === 200) {
          setProjectDetails(detailsResponse.data);
        } else {
          setError("Failed to load personel details");
        }
      } catch (error) {
        setError("An error occurred while fetching personel details");
        console.error("Error fetching personel details", error);
      }
    };

    if (personelId) {
      fetchProjectDetails();
    }
  }, [personelId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!projectDetails || projectDetails.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <table className="project-details-container">
      <thead>
        <tr>
          <th className="project-info-section">Proje Adı</th>
          <th className="project-info-section">Takım</th>
          <th className="project-info-section">Görevi</th>
          <th className="project-info-section">Başlangıç Tarihi</th>
          <th className="project-info-section">Bitiş Tarihi</th>
        </tr>
      </thead>
      <tbody>
        {projectDetails.map((prj, index) => (
          <tr key={index}>
            <td>{prj.projectName}</td>
            <td>{prj.teamName}</td>
            <td>{prj.projectTask}</td>
            <td>{prj.projectStartDate}</td>
            <td>
              {prj.projectStatus
                ? prj.projectFinishDate
                  ? prj.projectFinishDate
                  : "Bitiş Tarihi Girilmedi"
                : "Devam Ediyor"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Project;
