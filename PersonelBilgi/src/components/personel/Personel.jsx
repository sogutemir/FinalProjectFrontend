// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import {
  getPersonelById,
  getResourcePhoto,
  updatePersonel,
} from "../../api/Personel";
import "./Personel.css";

function formatDate(dateString) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString("tr-TR", options);
}

function personelDetails({ personelId }) {
  const [personelPhotoUrl, setPersonelPhotoUrl] = useState("");
  const [personelDetails, setPersonelDetails] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const excludedKeys = ["id", "photoId"];

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchPersonelDetails = async () => {
      try {
        const detailsResponse = await getPersonelById(personelId);
        if (detailsResponse.status === 200) {
          setPersonelDetails(detailsResponse.data);
          setUpdatedDetails(detailsResponse.data);

          const photoId = detailsResponse.data.photoId;
          const photoResponse = await getResourcePhoto(photoId);
          if (photoResponse.status === 200) {
            setPersonelPhotoUrl(URL.createObjectURL(photoResponse.data));
          } else {
            setError("Failed to load personel photo");
          }
        } else {
          setError("Failed to load personel details");
        }
      } catch (error) {
        setError("An error occurred while fetching personel details");
        console.error("Error fetching personel details", error);
      }
    };
    if (personelId) {
      fetchPersonelDetails();
    }
  }, [personelId]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpdate = async () => {
    try {
      const response = await updatePersonel(personelId, updatedDetails, file);
      console.log("Updated personel response: ", response);
    } catch (error) {
      console.error("Error while updating personel: ", error);
    }
  };

  const handleChange = (e, fieldName) => {
    setUpdatedDetails({ ...updatedDetails, [fieldName]: e.target.value });
  };

  return (
    <div className="personel-details-container">
      <div className="personal-info-section">
        <div className="personel-photo-section">
          {personelPhotoUrl ? (
            <>
              <img
                src={personelPhotoUrl}
                className="personel-photo"
                alt="personel"
              />
              <input type="file" onChange={handleFileChange} />
            </>
          ) : (
            <div>Loading photo...</div>
          )}
        </div>
        <div className="personal-info">
          {updatedDetails && Object.entries(updatedDetails)
              .filter(([fieldName]) => !excludedKeys.includes(fieldName))
              .map(([fieldName, value]) => {
                let displayValue = value;
                if (fieldName === "employmentStartDate" || fieldName === "dateOfBirth") {
                  displayValue = formatDate(value);
                }

                return (
                    <input
                        key={fieldName}
                        type="text"
                        value={displayValue}
                        onChange={(e) => handleChange(e, fieldName)}
                        className="form-control"
                        placeholder={
                          fieldName === "Task" ? "Çalışılan Proje" : fieldName
                        }
                    />
                );
            })}
        </div>
      </div>
      <button
        disabled={
          JSON.stringify(personelDetails) === JSON.stringify(updatedDetails)
        }
        onClick={handleUpdate}
      >
        Save
      </button>
    </div>
  );
}

export default personelDetails;
