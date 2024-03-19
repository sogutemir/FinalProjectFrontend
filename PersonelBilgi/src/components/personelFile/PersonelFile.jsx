// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import {deleteFile, getFileByPersonelId} from "../../api/Personel";
import { addFile } from "../../api/Personel";
import "./PersonelFile.css";

function removePrefix(inputString) {
  if (inputString) {
    const parts = inputString.split('/');
    return parts.length > 1 ? '.' + parts[1] : '.' + inputString;
  }
  return inputString;
}

async function deletePersonelFileItem(fileId) {
  try {
    await deleteFile(fileId);
    window.location.reload();
  } catch (error) {
    console.error("Error deleting activity:", error);
  }
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString("tr-TR", options);
}

function PersonalFile({ personelId }) {
  const [fileDetails, setFileDetails] = useState('');
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [section, setSection] = useState('');
  const [file, setFile] = useState();

  
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleUploadFile = () => {
    addFile(file, section, personelId, () => {
      setFile(null);
      setSection('');
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

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
      <button onClick={toggleModal}>Ekle</button>
      <table className="file-details-container">
        <thead>
        <tr>
          <th className="file-info-section">Dosya Türü</th>
          <th className="file-info-section">Dosya Adı</th>
          <th className="file-info-section">Bölüm</th>
          <th className="file-info-section">Yüklenme Tarihi</th>
          <th className="file-info-section"></th>
        </tr>
        </thead>
        <tbody>
        {fileDetails.map((detail, index) => (
            <tr key={index}>
              <td>{removePrefix(detail.fileType)}</td>
              <td>{detail.fileName}</td>
              <td>{detail.section}</td>
              <td>{formatDate(detail.uploadDate)}</td>
                <td>
                    <button onClick={() => deletePersonelFileItem(detail.id)}>Delete</button>
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
                placeholder="Text input"
                value={section}
                onChange={(e) => setSection(e.target.value)}
              />
              <div>
                <div className="file has-name">
                  <label className="file-label">
                    <input
                      className="file-input"
                      type="file"
                      name="resume"
                      onChange={handleFileChange}
                    />
                    <span className="file-cta">
                      <span className="file-icon">
                      </span>
                      <span className="file-label"></span>
                    </span>
                    <span className="file-name">Dosya Seçiniz</span>
                  </label>
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success" onClick={handleUploadFile}>
                Save changes
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

export default PersonalFile;
