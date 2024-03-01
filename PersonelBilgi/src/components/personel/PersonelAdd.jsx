// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import {addPersonel} from "../../api/Personel.jsx";

function PersonelAddForm() {

    const initialPersonelState = {
        name: '',
        surname: '',
        identityNumber: '',
        academicTitle: '',
        dateOfBirth: new Date(),
        isMale: '',
        email: '',
        phone: '',
        emergencyContact: '',
        emergencyContactPhone: '',
        residenceAddress: '',
        registrationNo: '',
        position: '',
        bloodType: '',
        title: '',
        teamName: '',
        department: '',
        task: '',
        personnelType: '',
        workStatus: '',
        serviceUsage: '',
        internalNumber: '',
        roomNumber: '',
        carPlate: '',
        workingType: '',
        mentor: '',
        cadre: '',
        startDateOfEmployment: new Date()
    };

    const [personelDTO, setPersonelDTO] = useState(initialPersonelState);
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        if (event.target.files[0]) {
            const file = event.target.files[0];
            if (file && (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg")) {
                setFile(file);
            } else {
                alert("Only .png, .jpg, and .jpeg files are allowed!");
            }
        }
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setPersonelDTO({...personelDTO, [name]: value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addPersonel(personelDTO, file);
    };

    return (
        <div className="forms-container">
            <form className="form-box" onSubmit={handleSubmit}>
                <h2>Genel</h2>
                <input type="text" name="name" placeholder="Ad*" value={personelDTO.name} onChange={handleFormChange}/>
                <input type="text" name="surname" placeholder="Soyad*" value={personelDTO.surname}
                       onChange={handleFormChange}/>
                <input type="text" name="identityNumber" placeholder="T.C. Kimlik Numarası*"
                       value={personelDTO.identityNumber} onChange={handleFormChange}/>
                <input type="email" name="email" placeholder="E-posta*" value={personelDTO.email}
                       onChange={handleFormChange}/>
                <select name="isMale" value={personelDTO.isMale} onChange={handleFormChange}>
                    <option value="">Cinsiyet*</option>
                    <option value="true">Erkek</option>
                    <option value="false">Kadın</option>
                </select>
                <input type="text" name="academicTitle" placeholder="Akademik Ünvan*" value={personelDTO.academicTitle}
                       onChange={handleFormChange}/>
                <input type="date" name="employmentStartDate" placeholder="İşe Giriş Tarihi*"
                       value={personelDTO.employmentStartDate} onChange={handleFormChange}/>
                <input type="text" name="registrationNo" placeholder="Sicil No*" value={personelDTO.registrationNo}
                       onChange={handleFormChange}/>
                <input type="text" name="workingType" placeholder="Çalışma Türü*" value={personelDTO.workingType}
                       onChange={handleFormChange}/>
                <input type="text" name="task" placeholder="Görevi*" value={personelDTO.task}
                       onChange={handleFormChange}/>
                <input type="text" name="mentor" placeholder="Mentor*" value={personelDTO.mentor}
                       onChange={handleFormChange}/>
                <input type="text" name="cadre" placeholder="Kadro*" value={personelDTO.cadre}
                       onChange={handleFormChange}/>
                <select name="serviceUsage" value={personelDTO.serviceUsage} onChange={handleFormChange}>
                    <option value="">Servis Kullanımı</option>
                    <option value="true">Kullanıyor</option>
                    <option value="false">Kullanmıyor</option>
                </select>
                {/* Submit button */}
                <button type="submit">PERSONEL EKLE</button>
            </form>

            <form className="form-box">
                <h2>Diğer</h2>
                <input type="text" name="residenceAddress*" placeholder="İkametgah Adresi"
                       value={personelDTO.residenceAddress} onChange={handleFormChange}/>
                <input type="tel" name="phone" placeholder="Telefon*" value={personelDTO.phone} onChange={handleFormChange} />
                <input type="date" name="dateOfBirth" value={personelDTO.dateOfBirth} onChange={handleFormChange} />
                <input type="text" name="internalNumber" placeholder="Dahili Numara*" value={personelDTO.internalNumber} onChange={handleFormChange} />
                <input type="text" name="roomNumber" placeholder="Oda Numara*" value={personelDTO.roomNumber} onChange={handleFormChange} />
                <input type="text" name="carPlate" placeholder="Araç Plakası*" value={personelDTO.carPlate} onChange={handleFormChange} />
                <select name="bloodType" value={personelDTO.bloodType} onChange={handleFormChange}>
                    <option value="">Kan Grubu</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="0+">0+</option>
                    <option value="0-">0-</option>
                </select>
                <input type="text" name="emergencyContact" placeholder="Acil Durumda Ulaşılacak Kişi*" value={personelDTO.emergencyContact} onChange={handleFormChange} />
                <input type="tel" name="emergencyContactPhone" placeholder="Acil Durumda Ulaşılacak Kişi Tel*" value={personelDTO.emergencyContactPhone} onChange={handleFormChange} />
                <div className="upload-photo">
                    <label htmlFor="photo-upload">Fotoğraf:</label>
                    <input type="file" id="photo-upload" name="file" onChange={handleFileChange}
                           accept=".png, .jpg, .jpeg"/>
                </div>
                <input type="submit" value="PERSONEL EKLE"/>
            </form>
        </div>
    );
}

export default PersonelAddForm;
