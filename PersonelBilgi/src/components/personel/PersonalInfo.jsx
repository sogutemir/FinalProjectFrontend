import React, { useEffect, useState } from "react";
import {
  getPersonelById,
  getResourcePhoto,
  updatePersonel,
} from "../../api/Personel";

function PersonalInfo(props) {
  const { personelId } = props;
  const [personel, setPersonel] = useState({
    name: "",
    surname: "",
    identityNumber: "",
    isMale: true,
    academicTitle: "",
    email: "",
    dateOfBirth: new Date(),
    bloodType: "",
    phone: "",
    vehiclePlate: "",
    emergencyContact: "",
    emergencyContactPhone: "",
    residenceAddress: "",
    startDateOfEmployment: new Date(),
    registrationNo: "",
    cadre: "",
    title: "",
    department: "",
    projectInProgress: "",
    task: "",
    teamName: "",
    personnelType: "",
    workingType: "",
    workStatus: "",
    inServiceUsage: "",
    internalNumber: "",
    roomNumber: "",
    photoId: 0,
    isServiceUsage: true,
  });
  const [personelPhotoUrl, setPersonelPhotoUrl] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPersonelById(personelId);
        if (response.data) {
          setPersonel(response.data);
          const photoResponse = await getResourcePhoto(response.data.photoId);
          if (photoResponse.status === 200) {
            setPersonelPhotoUrl(URL.createObjectURL(photoResponse.data));
          } else {
            setError("Failed to load personel photo");
          }
        }
      } catch (error) {
        setError("An error occurred while fetching personel details");
        console.error("Error fetching personel details", error);
      }
    };

    fetchData();
  }, [personelId]);

  const handleUpdate = () => {
    updatePersonel(personelId, personel, file).then((response) => {
      console.log("Updated personel response: ", response.status);
      if (response.data !== null) {
        alert("Personel updated successfully");
      } else {
        alert("Failed to update personel");
      }
    });
  };

  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      if (
        file &&
        (file.type === "image/png" ||
          file.type === "image/jpeg" ||
          file.type === "image/jpg")
      ) {
        // Add '||' between conditions
        setFile(file);
      } else {
        alert("Only .png, .jpg, and .jpeg files are allowed!");
      }
    }
  };
  return (
    <>
      <button onClick={handleUpdate}>Kaydet</button>
      <div>
        <div>
          <h2>Kişisel</h2>
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
        <div>
          <label htmlFor="name">Ad</label>
          <input
            type="text"
            value={personel.name}
            onChange={(e) => {
              setPersonel({
                ...personel,
                name: e.target.value,
              });
            }}
            id="name"
          />
          <label htmlFor="surname">Soyad</label>
          <input
            type="text"
            value={personel.surname}
            onChange={(e) => {
              setPersonel({
                ...personel,
                surname: e.target.value,
              });
            }}
            id="surname"
          />
        </div>
        <div>
          <label htmlFor="idnum">T.C. Kimlik Numarası</label>
          <input
            type="text"
            value={personel.identityNumber}
            onChange={(e) => {
              setPersonel({
                ...personel,
                identityNumber: e.target.value,
              });
            }}
            id="idnum"
          />
          <label htmlFor="gender">Cinsiyet</label>
          <input
            type="text"
            value={personel.isMale ? "Erkek" : "Kadın"}
            onChange={(e) => {
              setPersonel({
                ...personel,
                isMale: e.target.value.toLowerCase() === "erkek",
              });
            }}
            id="gender"
          />
        </div>
        <div>
          <label htmlFor="academic-title">Akademik Unvan</label>
          <input
            type="text"
            value={personel.academicTitle}
            onChange={(e) => {
              setPersonel({
                ...personel,
                academicTitle: e.target.value,
              });
            }}
            id="academic-title"
          />
          <label htmlFor="email">E-Posta</label>
          <input
            type="email"
            value={personel.email}
            onChange={(e) => {
              setPersonel({
                ...personel,
                email: e.target.value,
              });
            }}
            id="email"
          />
        </div>
        <div>
          <label htmlFor="birthdate">Doğum Tarihi</label>
          <input
            type="date"
            value={personel.dateOfBirth}
            onChange={(e) => {
              setPersonel({
                ...personel,
                dateOfBirth: e.target.value,
              });
            }}
            id="birthdate"
          />
          <label htmlFor="blood-type">Kan Grubu</label>
          <input
            type="text"
            value={personel.bloodType}
            onChange={(e) => {
              setPersonel({
                ...personel,
                bloodType: e.target.value,
              });
            }}
            id="blood-type"
          />
        </div>
        <div>
          <label htmlFor="phone">Telefon</label>
          <input
            type="text"
            value={personel.phone}
            onChange={(e) => {
              setPersonel({
                ...personel,
                phone: e.target.value,
              });
            }}
            id="phone"
          />
          <label htmlFor="vehicle-plate">Araç Plakası</label>
          <input
            type="text"
            value={personel.vehiclePlate}
            onChange={(e) => {
              setPersonel({
                ...personel,
                vehiclePlate: e.target.value,
              });
            }}
            id="vehicle-plate"
          />
        </div>
        <div>
          <label htmlFor="emergency-contact">
            Acil Durumda Ulaşılacak Kişi
          </label>
          <input
            type="text"
            value={personel.emergencyContact}
            onChange={(e) => {
              setPersonel({
                ...personel,
                emergencyContact: e.target.value,
              });
            }}
            id="emergency-name"
          />
          <label htmlFor="emergency-contact-phone">
            Acil Durumda Ulaşılacak Kişi Tel
          </label>
          <input
            type="text"
            value={personel.emergencyContactPhone}
            onChange={(e) => {
              setPersonel({
                ...personel,
                emergencyContactPhone: e.target.value,
              });
            }}
            id="emergency-phone"
          />
        </div>
        <div>
          <label htmlFor="residance-address">İkametgah Adresi</label>
          <input
            type="text"
            value={personel.residenceAddress}
            onChange={(e) => {
              setPersonel({
                ...personel,
                residenceAddress: e.target.value,
              });
            }}
            id="residance-address"
          />
        </div>
      </div>
      <div>
        <div>
          <h2>Kurumsal</h2>
        </div>
        <div>
          <label htmlFor="job-entreance">İşe Giriş Tarihi</label>
          <input
            type="date"
            value={personel.startDateOfEmployment}
            onChange={(e) => {
              setPersonel({
                ...personel,
                startDateOfEmployment: e.target.value,
              });
            }}
            id="job-entreance"
          />
          <label htmlFor="registration-num">Sicil No</label>
          <input
            type="text"
            value={personel.registrationNo}
            onChange={(e) => {
              setPersonel({
                ...personel,
                registrationNo: e.target.value,
              });
            }}
            id="registration-num"
          />
        </div>
        <div>
          <label htmlFor="cadre">Kadro</label>
          <input
            type="text"
            value={personel.cadre}
            onChange={(e) => {
              setPersonel({
                ...personel,
                cadre: e.target.value,
              });
            }}
            id="cadre"
          />
          <label htmlFor="title">Unvan</label>
          <input
            type="text"
            value={personel.title}
            onChange={(e) => {
              setPersonel({
                ...personel,
                title: e.target.value,
              });
            }}
            id="title"
          />
        </div>
        <div>
          <label htmlFor="department">Birim</label>
          <input
            type="text"
            value={personel.department}
            onChange={(e) => {
              setPersonel({
                ...personel,
                department: e.target.value,
              });
            }}
            id="department"
          />
          <label htmlFor="project-in-progress">Çalışılan Proje</label>
          <input
            type="text"
            value={personel.projectInProgress}
            onChange={(e) => {
              setPersonel({
                ...personel,
                projectInProgress: e.target.value,
              });
            }}
            id="project-in-progress"
          />
        </div>
        <div>
          <label htmlFor="task">Görevi</label>
          <input
            type="text"
            value={personel.task}
            onChange={(e) => {
              setPersonel({
                ...personel,
                task: e.target.value,
              });
            }}
            id="task"
          />
          <label htmlFor="team-name">Takım</label>
          <input
            type="text"
            value={personel.teamName}
            onChange={(e) => {
              setPersonel({
                ...personel,
                teamName: e.target.value,
              });
            }}
            id="team-name"
          />
        </div>
        <div>
          <label htmlFor="personnel-type">Personel Türü</label>
          <input
            type="text"
            value={personel.personnelType}
            onChange={(e) => {
              setPersonel({
                ...personel,
                personnelType: e.target.value,
              });
            }}
            id="personnel-type"
          />
          <label htmlFor="working-type">Çalışma Türü</label>
          <input
            type="text"
            value={personel.workingType}
            onChange={(e) => {
              setPersonel({
                ...personel,
                workingType: e.target.value,
              });
            }}
            id="working-type"
          />
        </div>
        <div>
          <label htmlFor="work-status">Çalışma Durumu</label>
          <input
            type="text"
            value={personel.workStatus}
            onChange={(e) => {
              setPersonel({
                ...personel,
                workStatus: e.target.value,
              });
            }}
            id="working-status"
          />
          <label htmlFor="in-service-usage">Servis Kullanımı</label>
          <input
            type="text"
            value={personel.isServiceUsage ? "Kullanılıyor" : "Kullanılmıyor"}
            onChange={(e) => {
              setPersonel({
                ...personel,
                isServiceUsage: e.target.value.toLowerCase() === "kullanılıyor",
              });
            }}
            id="in-service-usage"
          />
        </div>
        <div>
          <label htmlFor="internal-number">Dahili Numara</label>
          <input
            type="text"
            value={personel.internalNumber}
            onChange={(e) => {
              setPersonel({
                ...personel,
                identityNumber: e.target.value,
              });
            }}
            id="internal-number"
          />
          <label htmlFor="room-number">Oda Numara</label>
          <input
            type="text"
            value={personel.roomNumber}
            onChange={(e) => {
              setPersonel({
                ...personel,
                roomNumber: e.target.value,
              });
            }}
            id="room-number"
          />
        </div>
      </div>
    </>
  );
}

export default PersonalInfo;
