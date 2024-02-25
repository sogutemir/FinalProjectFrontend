import React, { useState, useEffect } from "react";
import { getActivitiesByPersonelId } from "../../api/Personel";
import "./Activity.css";

function Activity({ personelId }) {
  const [activityDetails, setActivityDetails] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchActivityDetails = async () => {
      try {
        const detailsResponse = await getActivitiesByPersonelId(personelId);
        if (detailsResponse.status === 200) {
          setActivityDetails(detailsResponse.data);
        } else {
          setError("Failed to load personel details");
        }
      } catch (error) {
        setError("An error occurred while fetching personel details");
        console.error("Error fetching personel details", error);
      }
    };

    if (personelId) {
      fetchActivityDetails();
    }
  }, [personelId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!activityDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="activity-container">
      <table className="activity-details-container">
        <tbody>
          {activityDetails.map((detail, index) => (
            <tr key={index}>
              <td className="activity-info-section">
                <div className="activity-info">
                  <p>Etkinlik Türü:</p>
                </div>
              </td>
              <td>{detail.eventType}</td>
              <td className="activity-info-section">
                <p>Açıklama:</p>
              </td>
              <td>{detail.activityName}</td>
              <td className="activity-info-section">
                <p>Link:</p>
              </td>
              <td>{detail.link}</td>
              <td className="activity-info-section">
                <p>Ek:</p>
              </td>
              <td>{detail.fileName}</td>
              <td className="activity-info-section">
                <p>Yüklenme Tarihi:</p>
              </td>
              <td>{detail.uploadDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Activity;
