// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import {
  addProject,
  deleteProject,
  getProjectByPersonelId,
  updateProject,
} from "../../api/Personel";
import "./Project.css";

function formatDate(dateString) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString("tr-TR", options);
}

async function deleteProjectItem(projectId) {
  try {
    console.log("activityId", projectId);
    await deleteProject(projectId);
    window.location.reload();
  } catch (error) {
    console.error("Error deleting activity:", error);
  }
}

function Project({ personelId, isPersonels }) {
  const [projectDetails, setProjectDetails] = useState([]);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [projectToUpdate, setProjectToUpdate] = useState(null);

  const [projectData, setProjectData] = useState({
    projectName: "",
    teamName: "",
    projectTask: "",
    projectStartDate: "",
    projectFinishDate: "",
    projectStatus: "",
    personelId: personelId,
  });

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleProjectUpdate = async () => {
    try {
      if (projectToUpdate) {
        const updatedProjectData = {
          ...projectData,
          projectName: projectData.projectName,
          teamName: projectData.teamName,
          projectTask: projectData.projectTask,
          projectStartDate: projectData.projectStartDate,
          projectFinishDate: projectData.projectFinishDate,
          projectStatus: projectData.projectStatus,
        };
        await updateProject(projectToUpdate.id, updatedProjectData);
        setUpdateModalOpen(false);
        alert("Project updated successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const openUpdateModal = (project) => {
    setProjectToUpdate(project);
    setProjectData({
      ...projectData,
      projectName: project.projectName,
      teamName: project.teamName,
      projectTask: project.projectTask,
      projectStartDate: project.projectStartDate,
      projectFinishDate: project.projectFinishDate,
      projectStatus: project.projectStatus,
    });
    setUpdateModalOpen(true);
  };

  const handleProjectionSubmit = async () => {
    try {
      await addProject(projectData);
      setProjectData({
        ...projectData,
        projectName: "",
        teamName: "",
        projectTask: "",
        projectStartDate: "",
        projectFinishDate: "",
        projectStatus: "",
      });
      toggleModal();
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const detailsResponse = await getProjectByPersonelId(personelId);
        if (detailsResponse.status === 200) {
          setProjectDetails(detailsResponse.data);
        } else {
          setError("Failed to load personel details");
        }
      } catch (error) {
        setError("An error occurred while fetching personel details");
        console.error("Error fetching personel details", error);
      }
    };

    if (personelId) {
      fetchProjectDetails();
    }
  }, [personelId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!projectDetails || projectDetails.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isPersonels && (
        <div style={{ position: "relative" }}>
          <button
            style={{ position: "unset", top: 0, right: 0 }}
            onClick={toggleModal}
          >
            Proje Ekle
          </button>
        </div>
      )}
      <table className="project-details-container">
        <thead>
          <tr>
            <th className="project-info-section">Proje Adı</th>
            <th className="project-info-section">Takım</th>
            <th className="project-info-section">Görevi</th>
            <th className="project-info-section">Başlangıç Tarihi</th>
            <th className="project-info-section">Bitiş Tarihi</th>
            {isPersonels && <th className="project-info-section"></th>}
            {isPersonels && <th className="project-info-section"></th>}
          </tr>
        </thead>
        <tbody>
          {projectDetails.map((prj, index) => (
            <tr key={index}>
              <td>{prj.projectName}</td>
              <td>{prj.teamName}</td>
              <td>{prj.projectTask}</td>
              <td>{formatDate(prj.projectStartDate)}</td>
              <td>
                {prj.projectStatus
                  ? formatDate(prj.projectFinishDate)
                    ? formatDate(prj.projectFinishDate)
                    : "Bitiş Tarihi Girilmedi"
                  : "Devam Ediyor"}
              </td>

              {isPersonels && (
                <td>
                  <button onClick={() => openUpdateModal(prj)}>Güncelle</button>
                </td>
              )}
              {isPersonels && (
                <td>
                  <button onClick={() => deleteProjectItem(prj.id)}>Sil</button>
                </td>
              )}
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
                <p className="modal-card-title">Proje Ekle</p>
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
                  placeholder="Proje Adı"
                  name="projectName"
                  value={projectData.projectName}
                  onChange={handleInputChange}
                />
                <input
                  className="input"
                  type="text"
                  placeholder="Takım Adı"
                  name="teamName"
                  value={projectData.teamName}
                  onChange={handleInputChange}
                />
                <input
                  className="input"
                  type="text"
                  placeholder="Görevi"
                  name="projectTask"
                  value={projectData.projectTask}
                  onChange={handleInputChange}
                />
                <input
                  className="input"
                  type="date"
                  name="projectStartDate"
                  value={projectData.projectStartDate}
                  onChange={handleInputChange}
                />
                {projectData.projectStatus === "true" && (
                  <input
                    className="input"
                    type="date"
                    name="projectFinishDate"
                    value={projectData.projectFinishDate}
                    onChange={handleInputChange}
                  />
                )}
                <select
                  className="input"
                  name="projectStatus"
                  value={projectData.projectStatus}
                  onChange={handleInputChange}
                >
                  <option value="false">Devam Ediyor</option>
                  <option value="true">Bitti</option>
                </select>
              </section>
              <footer className="modal-card-foot">
                <button
                  className="button is-success"
                  onClick={handleProjectionSubmit}
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
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Update Project</p>
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
                  placeholder="Project Name"
                  name="projectName"
                  value={projectData.projectName}
                  onChange={handleInputChange}
                />
                <input
                  className="input"
                  type="text"
                  placeholder="Team Name"
                  name="teamName"
                  value={projectData.teamName}
                  onChange={handleInputChange}
                />
                <input
                  className="input"
                  type="text"
                  placeholder="Task"
                  name="projectTask"
                  value={projectData.projectTask}
                  onChange={handleInputChange}
                />
                <input
                  className="input"
                  type="date"
                  name="projectStartDate"
                  value={projectData.projectStartDate}
                  onChange={handleInputChange}
                />
                <input
                  className="input"
                  type="date"
                  name="projectFinishDate"
                  value={projectData.projectFinishDate}
                  onChange={handleInputChange}
                />
                <select
                  className="input"
                  name="projectStatus"
                  value={projectData.projectStatus}
                  onChange={handleInputChange}
                >
                  <option value="false">Devam Ediyor</option>
                  <option value="true">Bitti</option>
                </select>
              </section>
              <footer className="modal-card-foot">
                <button
                  className="button is-success"
                  onClick={handleProjectUpdate}
                >
                  Update
                </button>
                <button
                  className="button"
                  onClick={() => setUpdateModalOpen(false)}
                >
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

export default Project;
