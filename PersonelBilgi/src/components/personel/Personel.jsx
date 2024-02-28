import React, { useState, useEffect } from "react";
import { getPersonelById, getResourcePhoto } from "../../api/Personel";
import "./Personel.css";

function formatDate(dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('tr-TR', options);
}

function personelDetails({ personelId }) {
  const [personelPhotoUrl, setpersonelPhotoUrl] = useState("");
  const [personelDetails, setpersonelDetails] = useState(null);
  const [error, setError] = useState("");
  const excludedKeys = ["id", "photoId"];

  useEffect(() => {
    const fetchpersonelDetails = async () => {
      try {
        const detailsResponse = await getPersonelById(personelId);
        if (detailsResponse.status === 200) {
          setpersonelDetails(detailsResponse.data);

          const photoId = detailsResponse.data.photoId;
          const photoResponse = await getResourcePhoto(photoId);
          if (photoResponse.status === 200) {
            setpersonelPhotoUrl(URL.createObjectURL(photoResponse.data));
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
      fetchpersonelDetails();
    }
  }, [personelId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!personelDetails) {
    return <div>Loading...</div>;
  }

  const handleChange = (e, fieldName) => {
    setpersonelDetails({ ...personelDetails, [fieldName]: e.target.value });
  };

  return (
    <div className="personel-details-container">
      <div className="personal-info-section">
        <div className="personel-photo-section">
          {personelPhotoUrl ? (
            <img
              src={personelPhotoUrl}
              className="personel-photo"
              alt="personel"
            />
          ) : (
            <div>Loading photo...</div>
          )}
        </div>
        <div className="personal-info">
  {Object.entries(personelDetails)
    .filter(([fieldName]) => !excludedKeys.includes(fieldName)) // Filter out excluded keys
    .map(([fieldName, value]) => {
      // Tarih formatlaması gerektiren alanı kontrol et
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
          readOnly
        />
      );
    })}
</div>
      </div>
    </div>
  );
}

export default personelDetails;
