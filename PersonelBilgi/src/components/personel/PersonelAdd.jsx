// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import {addPersonel} from "../../api/Personel.jsx";

const PersonelAdd = () => {

    const [personelData, setPersonelData] = useState({
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
        mentor:"",
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
        position:"",
        isServiceUsage: true,
    });

    const [selectedFile, setSelectedFile] = useState(null);

    const handleInputChange = event => {
        setPersonelData({
            ...personelData,
            [event.target.name]: event.target.value,
        });
    };

    const handleFileChange = event => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async event => {
        event.preventDefault();
        await addPersonel(personelData, selectedFile);
    };

    return (
        <form onSubmit={handleSubmit}>

            {/* Iterate through all fields of the personelData */}
            {Object.keys(personelData).map((key, index) => {
                if (key === 'isMale' || key === 'isServiceUsage') {
                    return (
                        <div key={index}>
                            <label>{key}</label>
                            <input type="checkbox" name={key} checked={personelData[key]} onChange={handleInputChange} />
                        </div>
                    );
                } else if(key === 'dateOfBirth' || key === 'startDateOfEmployment') {
                    return (
                        <div key={index}>
                            <label>{key}</label>
                            <input type="date" name={key} value={personelData[key]} onChange={handleInputChange} />
                        </div>
                    );
                } else {
                    return (
                        <div key={index} >
                            <label>{key}</label>
                            <input type="text" name={key} value={personelData[key]} onChange={handleInputChange} />
                        </div>
                    )
                }
            })}

            <div>
                <label>Select File:</label>
                <input type="file" onChange={handleFileChange} />
            </div>

            <button type="submit">Add Personel</button>

        </form>
    );
};

export default PersonelAdd;