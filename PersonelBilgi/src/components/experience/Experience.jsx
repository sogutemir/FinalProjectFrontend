// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import {deleteExperience, getExperienceByPersonelId} from "../../api/Personel";
import "./Experience.css";

function formatDate(dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('tr-TR', options);
}

async function deleteExperienceItem(experienceId) {
  try {
    await deleteExperience(experienceId);
    window.location.reload();
  } catch (error) {
    console.error("Error deleting activity:", error);
  }
}

// eslint-disable-next-line react/prop-types
function Experience({ personelId }) {
  const [experienceDetails, setExperienceDetails] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExperienceDetails = async () => {
      try {
        const detailsResponse = await getExperienceByPersonelId(personelId);
        if (detailsResponse.status === 200) {
          setExperienceDetails(detailsResponse.data);
        } else {
          setError("Failed to load personel details");
        }
      } catch (error) {
        setError("An error occurred while fetching personel details");
        console.error("Error fetching personel details", error);
      }
    };

    if (personelId) {
      fetchExperienceDetails();
    }
  }, [personelId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!experienceDetails || experienceDetails.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <table className="experience-details-container">
      <thead>
      <tr>
        <th className="experience-info-section">Çalıştığı Kurum Adı</th>
        <th className="experience-info-section">Çalıştığı Pozisyon</th>
        <th className="experience-info-section">Çalışma Şekli</th>
        <th className="experience-info-section">İşe Başlama Tarihi</th>
        <th className="experience-info-section">İşten Çıkış Tarihi</th>
        <th className="experience-info-section">İşten Ayrılış Nedeni</th>
        <th className="experience-info-section"></th>
      </tr>
      </thead>
      <tbody>
      {experienceDetails.map((exp, index) => (
            <tr key={index}>
              <td>{exp.institutionName}</td>
              <td>{exp.workPosition}</td>
              <td>{exp.workType}</td>
              <td>{formatDate(exp.jobStartDate)}</td>
              <td>{formatDate(exp.jobEndDate)}</td>
              <td>{exp.workDescription}</td>
              <td>
                <button onClick={() => deleteExperienceItem(exp.id)}>Delete</button>
              </td>
            </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Experience;
