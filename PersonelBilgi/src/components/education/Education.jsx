import React, { useState, useEffect } from "react";
import { getEducationByPersonelId } from "../../api/Personel";
import "./Education.css";

function Education({ personnelId }) {
  const [educationDetails, setEducationDetails] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEducationDetails = async () => {
      try {
        const detailsResponse = await getEducationByPersonelId(personnelId);
        if (detailsResponse.status === 200) {
          setEducationDetails(detailsResponse.data);
        } else {
          setError("Failed to load personnel details");
        }
      } catch (error) {
        setError("An error occurred while fetching personnel details");
        console.error("Error fetching personnel details", error);
      }
    };

    if (personnelId) {
      fetchEducationDetails();
    }
  }, [personnelId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!educationDetails || educationDetails.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <table className="education-details-container">
      <thead>
        <tr>
          <th className="education-info-section">Eğitim Türü</th>
          <th className="education-info-section">Üniversite/Okul</th>
          <th className="education-info-section">Bölüm</th>
          <th className="education-info-section">Başlangıç Tarihi</th>
          <th className="education-info-section">Mezuniyet Tarihi</th>
          <th className="education-info-section">Açıklama</th>
        </tr>
      </thead>
      <tbody>
        {educationDetails.map((edu, index) => (
          <tr key={index}>
            <td>{edu.educationType}</td>
            <td>{edu.universityName}</td>
            <td>{edu.department}</td>
            <td>{edu.educationStartDate}</td>
            <td>{edu.educationEndDate}</td>
            <td>{edu.additionalInformation}</td>
          </tr>
        ))}
      </tbody>
    </table>
);
}

export default Education;
