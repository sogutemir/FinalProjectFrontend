// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import {
  deleteActivity,
  getActivityByPersonelId,
  addActivity,
  updateActivity,
} from "../../api/Personel";
import "./Activity.css";

function removePrefix(inputString) {
  if (inputString) {
    const parts = inputString.split("/");
    return parts.length > 1 ? "." + parts[1] : "." + inputString;
  }
  return "";
}

async function deletePersonelActivityItem(activityId) {
  try {
    await deleteActivity(activityId);
    window.location.reload();
  } catch (error) {
    console.error("Error deleting activity:", error);
  }
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString("tr-TR", options);
}

function Activity({ personelId, isPersonels }) {
  const [activityDetails, setActivityDetails] = useState(null);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [activity, setActivity] = useState();
  const [activityName, setActivityName] = useState("");
  const [description, setDescription] = useState("");
  const [eventType, setEventType] = useState("");
  const [link, setLink] = useState("");
  const [updateOldActivity, setUpdateOldActivity] = useState([]);
  const [fileName, setFileName] = useState("");

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  const toggleUpdateModal = (id) => {
    setUpdateModalOpen(!updateModalOpen);
    setUpdateOldActivity(
      activityDetails.find((activity) => activity.id === id)
    );
    setFileName(updateOldActivity.filename);
  };

  const handleUploadActivity = () => {
    addActivity(
      activity,
      activityName,
      description,
      eventType,
      link,
      personelId
    ).then(() => {
      setActivity(null);
      setActivityName("");
      setDescription("");
      setEventType("");
      setLink("");
      setModalOpen(false);
      alert("Activity Added successfully");
      window.location.reload();
    });
  };

  const handleUpdateActivity = () => {
    const newActivity = { activityName, description, eventType, link };
    
    updateActivity(updateOldActivity.id, newActivity, activity).then(() => {
      setActivityName("");
      setDescription("");
      setEventType("");
      setLink("");
      setActivity(null);
      setUpdateModalOpen(false);
      alert("Activity updated successfully");
      window.location.reload();
    });
  
  };

  const handleActivityChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setActivity(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  useEffect(() => {
    const fetchActivityDetails = async () => {
      try {
        const detailsResponse = await getActivityByPersonelId(personelId);
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
      {isPersonels && (
        <button onClick={toggleModal}>Ekle</button>
      )}

      <table className="activity-details-container">
        <thead>
        <tr>
          <th className="activity-info-section">Etkinlik Türü</th>
          <th className="activity-info-section">Etkinlik Adı</th>
          <th className="activity-info-section">Link</th>
          <th className="activity-info-section">Yüklenme Tarihi</th>
          <th className="activity-info-section">Ek</th>
          <th className="activity-info-section"></th>
          <th className="activity-info-section"></th>
        </tr>
        </thead>
        <tbody>
        {activityDetails.map((detail, index) => (
            <tr key={index}>
              <td>{removePrefix(detail.eventType)}</td>
              <td>{detail.activityName}</td>
              <td>{detail.link}</td>
              <td>{formatDate(detail.uploadDate)}</td>
              <td>{detail.fileName}</td>
              <td>
                <button onClick={() => deletePersonelActivityItem(detail.id)}>
                  Delete
                </button>

              </td>
              <td>
                <button onClick={() => toggleUpdateModal(detail.id)}>
                  Güncelle
                </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {modalOpen && (
            <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Modal title</p>
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
                  placeholder="Activity Name"
                  value={activityName}
                  onChange={(e) => setActivityName(e.target.value)}
                />
                <input
                  className="input"
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input
                  className="input"
                  type="text"
                  placeholder="Event Type"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                />
                <input
                  className="input"
                  type="text"
                  placeholder="Link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
                <div>
                  <div>
                    <div className="file has-name">
                      <label className="file-label">
                        <input
                          className="file-input"
                          type="file"
                          name="resume"
                          onChange={handleActivityChange}
                        />
                        <span className="file-cta">
                          <span className="file-icon"></span>
                          <span className="file-label"></span>
                        </span>
                        <span className="file-name">{fileName || "Dosya Seçiniz"}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </section>
              <footer className="modal-card-foot">
                  <button className="button is-success" onClick={handleUploadActivity}>
                    Save changes
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
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Modal title</p>
                <button
                  className="delete"
                  aria-label="close"
                  onClick={toggleUpdateModal}
                ></button>
              </header>
              <section className="modal-card-body">
                <input
                  className="input"
                  type="text"
                  placeholder="Activity Name"
                  value={activityName || updateOldActivity.activityName}
                  onChange={(e) => setActivityName(e.target.value)}
                />
                <input
                  className="input"
                  type="text"
                  placeholder="Description"
                  value={description || updateOldActivity.description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input
                  className="input"
                  type="text"
                  placeholder="Event Type"
                  value={eventType || updateOldActivity.eventType}
                  onChange={(e) => setEventType(e.target.value)}
                />
                <input
                  className="input"
                  type="text"
                  placeholder="Link"
                  value={link || updateOldActivity.link}
                  onChange={(e) => setLink(e.target.value)}
                />
                <div>
                  <div>
                    <div className="file has-name">
                      <label className="file-label">
                        <input
                          className="file-input"
                          type="file"
                          name="resume"
                          onChange={handleActivityChange}
                        />
                        <span className="file-cta">
                          <span className="file-icon"></span>
                          <span className="file-label"></span>
                        </span>
                        <span className="file-name">
                          {fileName}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </section>
              <footer className="modal-card-foot">
                <button
                  className="button is-success"
                  onClick={handleUpdateActivity}
                >
                  Update Activity
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

export default Activity;
