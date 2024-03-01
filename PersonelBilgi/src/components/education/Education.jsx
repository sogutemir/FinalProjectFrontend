// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { getEducationByPersonelId, addEducation } from "../../api/Personel";
import "./Education.css";

function formatDate(dateString) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString("tr-TR", options);
}

function Education({ personelId }) {
  const [educationDetails, setEducationDetails] = useState([]);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [educationData, setEducationData] = useState({
    educationType: "",
    universityName: "",
    educationStartDate: "",
    educationEndDate: "",
    additionalInformation: "",
    personelId: personelId,
  });

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleEducationSubmit = async () => {
    try {
      await addEducation(educationData);
      setEducationData({
        ...educationData,
        educationType: "",
        universityName: "",
        educationStartDate: "",
        educationEndDate: "",
        additionalInformation: "",
      });
      toggleModal();
    } catch (error) {
      console.error("Error adding education:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEducationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchEducationDetails = async () => {
      try {
        const detailsResponse = await getEducationByPersonelId(personelId);
        if (detailsResponse.status === 200) {
          setEducationDetails(detailsResponse.data);
        } else {
          setError("Failed to load personel details");
        }
      } catch (error) {
        setError("An error occurred while fetching personel details");
        console.error("Error fetching personel details", error);
      }
    };

    if (personelId) {
      fetchEducationDetails();
    }
  }, [personelId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!educationDetails || educationDetails.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="education-container">
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
              <td>{formatDate(edu.educationStartDate)}</td>
              <td>{formatDate(edu.educationEndDate)}</td>
              <td>{edu.additionalInformation}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={toggleModal}>Add Education</button>
        {modalOpen && (
          <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Add Education</p>
                <button
                  className="delete"
                  aria-label="close"
                  onClick={toggleModal}
                ></button>
              </header>
              <section className="modal-card-body">
                <input
                  className="input"
                  type="text"
                  placeholder="Education Type"
                  name="educationType"
                  value={educationData.educationType}
                  onChange={handleInputChange}
                />
                <input
                  className="input"
                  type="text"
                  placeholder="University Name"
                  name="universityName"
                  value={educationData.universityName}
                  onChange={handleInputChange}
                />
                <input
                  className="input"
                  type="date"
                  name="educationStartDate"
                  value={educationData.educationStartDate}
                  onChange={handleInputChange}
                />
                <input
                  className="input"
                  type="date"
                  name="educationEndDate"
                  value={educationData.educationEndDate}
                  onChange={handleInputChange}
                />
                <textarea
                  className="textarea"
                  placeholder="Additional Information"
                  name="additionalInformation"
                  value={educationData.additionalInformation}
                  onChange={handleInputChange}
                />
              </section>
              <footer className="modal-card-foot">
                <button
                  className="button is-success"
                  onClick={handleEducationSubmit}
                >
                  Submit
                </button>
                <button className="button" onClick={toggleModal}>
                  Cancel
                </button>
              </footer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Education;
