import React, { useState, useEffect } from "react";
import { getFileByPersonelId } from "../../api/Personel";
import "./PersonelFile.css";

function PersonalFile({ personelId }) {
  const [fileDetails, setFileDetails] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFileDetails = async () => {
      try {
        const detailsResponse = await getFileByPersonelId(personelId);
        if (detailsResponse.status === 200) {
          setFileDetails(detailsResponse.data);
        } else {
          setError("Failed to load personel details");
        }
      } catch (error) {
        setError("An error occurred while fetching personel details");
        console.error("Error fetching personel details", error);
      }
    };

    if (personelId) {
      fetchFileDetails();
    }
  }, [personelId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!fileDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="file-container">
      <table className="file-details-container">
        <tbody>
          {fileDetails.map((detail, index) => (
            <tr key={index}>
              <td className="file-info-section">
                <div className="file-info">
                  <p>Dosya Türü:</p>
                </div>
              </td>
              <td>{detail.fileType}</td>
              <td className="file-info-section">
                <p>Dosya Adı:</p>
              </td>
              <td>{detail.fileName}</td>
              <td className="file-info-section">
                <p>Bölüm:</p>
              </td>
              <td>{detail.section}</td>
              <td className="file-info-section">
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

export default PersonalFile;
