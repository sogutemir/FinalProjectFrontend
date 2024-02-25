import React, { useState, useEffect } from "react";
import { getFileByPersonelId } from "../../api/Personel";
import "./PersonelFile.css";

function File({ personnelId }) {
  const [fileDetails, setFileDetails] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFileDetails = async () => {
      try {
        const detailsResponse = await getFileByPersonelId(personnelId);
        if (detailsResponse.status === 200) {
          setFileDetails(detailsResponse.data);
        } else {
          setError("Failed to load personnel details");
        }
      } catch (error) {
        setError("An error occurred while fetching personnel details");
        console.error("Error fetching personnel details", error);
      }
    };

    if (personnelId) {
      fetchFileDetails();
    }
  }, [personnelId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!fileDetails) {
    return <div>Loading...</div>;
  }

  const fileInfo = [
    { label: "Dosya Türü:", value: "fileName" },
    { label: "Dosya Adı:", value: "fileType" },
    { label: "Bölüm:", value: "section" },
    { label: "Yüklenme Tarihi:", value: "uploadDate" },
  ];

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

export default File;
