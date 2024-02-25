import React, { useState, useEffect } from "react";
import { getPersonelById, getResourcePhoto } from "../../api/Personel";
import "./Personel.css";

function PersonnelDetails({ personnelId = 1 }) {
  const [personnelPhotoUrl, setPersonnelPhotoUrl] = useState("");
  const [personnelDetails, setPersonnelDetails] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPersonnelDetails = async () => {
      try {
        const detailsResponse = await getPersonelById(personnelId);
        if (detailsResponse.status === 200) {
          setPersonnelDetails(detailsResponse.data);

          const photoId = detailsResponse.data.photoId;
          const photoResponse = await getResourcePhoto(photoId);
          if (photoResponse.status === 200) {
            setPersonnelPhotoUrl(URL.createObjectURL(photoResponse.data));
          } else {
            setError("Failed to load personnel photo");
          }
        } else {
          setError("Failed to load personnel details");
        }
      } catch (error) {
        setError("An error occurred while fetching personnel details");
        console.error("Error fetching personnel details", error);
      }
    };

    if (personnelId) {
      fetchPersonnelDetails();
    }
  }, [personnelId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!personnelDetails) {
    return <div>Loading...</div>;
  }

  const initialPersonnelDetails = {
    name: "",
    surname: "",
    identityNumber: "",
    academicTitle: "",
    email: "",
    phone: "",
    bloodType: "",
    dateOfBirth: "",
    emergencyContact: "",
    emergencyContactPhone: "",
    residenceAddress: "",
    title: "",
    position: "",
    employmentStartDate: "",
    registrationNo: "",
    department: "",
    Task: "",
    personnelType: "",
    workStatus: "",
    serviceUsage: "",
    roomNumber: "",
    internalNumber: "",
  };

  const handleChange = (e, fieldName) => {
    setPersonnelDetails({ ...personnelDetails, [fieldName]: e.target.value });
  };

  return (
    <div className="personnel-details-container">
      <div className="personal-info-section">
        <h2>Kişisel</h2>
        <div className="personnel-photo-section">
          {personnelPhotoUrl ? (
            <img
              src={personnelPhotoUrl}
              className="personnel-photo"
              alt="Personnel"
            />
          ) : (
            <div>Loading photo...</div>
          )}
        </div>
        <div className="personal-info">
          {Object.entries(personnelDetails).map(([fieldName, value]) => (
            <input
              key={fieldName}
              type="text"
              value={value}
              onChange={(e) => handleChange(e, fieldName)}
              className="form-control"
              placeholder={fieldName === "Task" ? "Çalışılan Proje" : fieldName}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PersonnelDetails;
