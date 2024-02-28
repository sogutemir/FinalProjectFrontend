import React, { useState, useEffect } from "react";
import { getActivityByPersonelId, addActivity } from "../../api/Personel";
import "./Activity.css";

function formatDate(dateString) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString("tr-TR", options);
}

function Activity({ personelId }) {
  const [activityDetails, setActivityDetails] = useState([]);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [newActivity, setNewActivity] = useState({
    activityName: "",
    description: "",
    eventType: "",
    link: "",
    file: null,
    personelId: personelId, 
  });

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleActivitySubmit = async () => {
    try {
      await addActivity(
        newActivity.file,
        newActivity.activityName,
        newActivity.description,
        newActivity.eventType,
        newActivity.link,
        newActivity.personelId,
      );
      setNewActivity({
        activityName: "",
        description: "",
        eventType: "",
        link: "",
        file: null,
        personelId: personelId,
      });
      toggleModal();
      // Refresh the list of activities after adding new one
      fetchActivityDetails();
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setNewActivity((prevData) => ({
      ...prevData,
      file: e.target.files[0],
    }));
  };

  useEffect(() => {
    const fetchActivityDetails = async () => {
      try {
        const detailsResponse = await getActivityByPersonelId(personelId);
        if (detailsResponse.status === 200) {
          setActivityDetails(detailsResponse.data);
        } else {
          setError("Failed to load activity details");
        }
      } catch (error) {
        setError("An error occurred while fetching activity details");
        console.error("Error fetching activity details", error);
      }
    };

    if (personelId) {
      fetchActivityDetails();
    }
  }, [personelId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!activityDetails || activityDetails.length === 0) {
    return <div>No activities to display. Add some!</div>;
  }

  return (
    <div className="activity-container">
      <button onClick={toggleModal}>Add Activity</button>
      <table className="activity-details-container">{/* ... */}</table>
      {modalOpen && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Add New Activity</p>
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
                name="activityName"
                value={newActivity.activityName}
                onChange={handleInputChange}
              />
              <input
                className="input"
                type="text"
                placeholder="Description"
                name="description"
                value={newActivity.description}
                onChange={handleInputChange}
              />
              <input
                className="input"
                type="text"
                placeholder="Event Type"
                name="eventType"
                value={newActivity.eventType}
                onChange={handleInputChange}
              />
              <input
                className="input"
                type="text"
                placeholder="Link"
                name="link"
                value={newActivity.link}
                onChange={handleInputChange}
              />
              <div className="file">
                <label className="file-label">
                  <input
                    className="file-input"
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                  />
                  <span className="file-cta">
                    <span className="file-icon">
                      {/* Icon component or element */}
                    </span>
                    <span className="file-label">Choose a file…</span>
                  </span>
                  <span className="file-name">
                    {newActivity.file
                      ? newActivity.file.name
                      : "No file chosen"}
                  </span>
                </label>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button
                className="button is-success"
                onClick={handleActivitySubmit}
              >
                Submit Activity
              </button>
              <button className="button" onClick={toggleModal}>
                Cancel
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}

export default Activity;
