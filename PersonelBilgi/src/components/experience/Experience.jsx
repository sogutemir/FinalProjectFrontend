// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import {deleteExperience, getExperienceByPersonelId, addExperience, updateExperience} from "../../api/Personel";
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
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [experienceToUpdate, setExperienceToUpdate] = useState(null);

  const openUpdateModal = (experience) => {
    setExperienceToUpdate(experience);
    setExperienceData(experience);

    setUpdateModalOpen(true);
  };

  const handleExperienceUpdate = async () => {
    try {
      if (experienceToUpdate) {
        await updateExperience(experienceToUpdate.id, experienceData);
        setUpdateModalOpen(false);
        alert('Experience updated successfully');
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating experience:", error);
    }
  };

  const [experienceData, setExperienceData] = useState({
    institutionName: "",
    workType: "",
    jobStartDate: "",
    jobEndDate: "",
    workPosition: "",
    workDescription: "",
    personelId: personelId,
  });

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExperienceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleExperienceSubmit = async () => {
    try {
      await addExperience(experienceData);
      setExperienceData({
        institutionName: "",
        workType: "",
        jobStartDate: "",
        jobEndDate: "",
        workPosition: "",
        workDescription: "",
        personelId: personelId,
      });
      toggleModal();
    } catch (error) {
      console.error("Error adding experience:", error);
    }
  };

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
      <div>
        <button onClick={toggleModal}>Add Experience</button>
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
                <td>
                  <button onClick={() => openUpdateModal(exp)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {modalOpen && (
              <div className="modal is-active">
                <div className="modal-card">
                  <header className="modal-card-head">
                    <p className="modal-card-title">Add Experience</p>
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
                        placeholder="Institution Name"
                        name="institutionName"
                        value={experienceData.institutionName}
                        onChange={handleInputChange}
                    />
                    <input
                        className="input"
                        type="text"
                        placeholder="Work Type"
                        name="workType"
                        value={experienceData.workType}
                        onChange={handleInputChange}
                    />
                    <input
                        className="input"
                        type="text"
                        placeholder="Work Position"
                        name="workPosition"
                        value={experienceData.workPosition}
                        onChange={handleInputChange}
                    />
                    <input
                        className="input"
                        type="date"
                        name="jobStartDate"
                        value={experienceData.jobStartDate}
                        onChange={handleInputChange}
                    />
                    <input
                        className="input"
                        type="date"
                        name="jobEndDate"
                        value={experienceData.jobEndDate}
                        onChange={handleInputChange}
                    />
                    <input
                        className="input"
                        type="text"
                        placeholder="Work Description"
                        name="workDescription"
                        value={experienceData.workDescription}
                        onChange={handleInputChange}
                    />
                  </section>
                  <footer className="modal-card-foot">
                    <button
                        className="button is-success"
                        onClick={handleExperienceSubmit}
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

          {updateModalOpen && (
              <div className="modal is-active">
                <div className="modal-card">
                  <header className="modal-card-head">
                    <p className="modal-card-title">Update Experience</p>
                    <button
                        className="delete"
                        aria-label="close"
                        onClick={() => setUpdateModalOpen(false)}
                    ></button>
                  </header>
                  <section className="modal-card-body">
                    <input
                        className="input"
                        type="text"
                        placeholder="Institution Name"
                        name="institutionName"
                        value={experienceData.institutionName}
                        onChange={handleInputChange}
                    />
                    <input
                        className="input"
                        type="text"
                        placeholder="Work Type"
                        name="workType"
                        value={experienceData.workType}
                        onChange={handleInputChange}
                    />
                    <input
                        className="input"
                        type="text"
                        placeholder="Work Position"
                        name="workPosition"
                        value={experienceData.workPosition}
                        onChange={handleInputChange}
                    />
                    <input
                        className="input"
                        type="date"
                        name="jobStartDate"
                        value={experienceData.jobStartDate}
                        onChange={handleInputChange}
                    />
                    <input
                        className="input"
                        type="date"
                        name="jobEndDate"
                        value={experienceData.jobEndDate}
                        onChange={handleInputChange}
                    />
                    <input
                        className="input"
                        type="text"
                        placeholder="Work Description"
                        name="workDescription"
                        value={experienceData.workDescription}
                        onChange={handleInputChange}
                    />
                  </section>
                  <footer className="modal-card-foot">
                    <button
                        className="button is-success"
                        onClick={handleExperienceUpdate}
                    >
                      Update
                    </button>
                    <button className="button" onClick={() => setUpdateModalOpen(false)}>
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

export default Experience;
