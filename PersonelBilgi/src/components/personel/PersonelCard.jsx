// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { getPersonelCardLastMonth, getResourcePhoto } from "../../api/Personel.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const FALLBACK_IMAGE_URL = 'fallback/image/url';
const FETCH_ERROR_MESSAGE = 'Error occurred while fetching data';
const cardStyles = {
    card: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '10px',
        margin: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        display: 'inline-block',
        position: 'relative',
        width: '250px',
        textAlign: 'center',
    },
    image: {
        borderRadius: '50%',
        width: '100px',
        height: '100px',
    },
    name: {
        color: '#E53935',
    },
    date: {
        fontSize: '0.85rem',
    },
    lastCard: {
        border: '2px solid #E53935',
    },
};

const fetchPhoto = async (photoId) => {
    const response = await getResourcePhoto(photoId);
    return URL.createObjectURL(response.data);
};

const ErrorMessage = () => <div>An error occurred while fetching data. Please refresh or try again later.</div>;

const EmployeeCard = ({ employee, handleImageError, isLast }) => (
    <div style={{ ...cardStyles.card, ...(isLast && cardStyles.lastCard) }}>
        <img
            src={employee.photoURL}
            onError={handleImageError}
            alt={employee.name}
            style={cardStyles.image}
        />
        <h2 style={cardStyles.name}>{`${employee.name} ${employee.surname}`}</h2>
        <p style={cardStyles.date}>{`Start date: ${new Date(employee.startDateOfEmployment).toLocaleDateString()}`}</p>
    </div>
);

const fetchAndUpdateEmployees = async (setEmployees) => {
    try {
        const response = await getPersonelCardLastMonth();
        if (!response.data?.length) throw new Error();
        let updatedEmployees = await Promise.all(
            response.data.map(async employee => ({
                ...employee,
                photoURL: await fetchPhoto(employee.photoId)
            }))
        );
        updatedEmployees.sort((a, b) => new Date(b.startDateOfEmployment) - new Date(a.startDateOfEmployment));
        setEmployees(updatedEmployees);
    } catch (error) {
        console.error(FETCH_ERROR_MESSAGE, error);
    }
};

const EmployeeCards = () => {
    const [employees, setEmployees] = useState([]);
    const [currentEmployeeIndex, setCurrentEmployeeIndex] = useState(0);

    const handleImageError = (e) => {
        e.target.src = FALLBACK_IMAGE_URL;
    };

    useEffect(() => {
        fetchAndUpdateEmployees(setEmployees);
    }, []);

    const handleRightArrowClick = () => {
        setCurrentEmployeeIndex((currentEmployeeIndex + 1) % employees.length);
    };

    const handleLeftArrowClick = () => {
        setCurrentEmployeeIndex((currentEmployeeIndex - 1 + employees.length) % employees.length);
    };

    if (!employees || employees.length === 0) return <ErrorMessage />;

    return (
        <div>
            <h1>New Employees of the Last Month</h1>
            <div>
                {employees.length > 0 && (
                    <EmployeeCard
                        handleImageError={handleImageError}
                        employee={employees[currentEmployeeIndex]}
                        isLast={false}
                    />
                )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={handleLeftArrowClick}>
                    <FontAwesomeIcon icon={faArrowLeft} size="2x" />
                </button>
                <button onClick={handleRightArrowClick}>
                    <FontAwesomeIcon icon={faArrowRight} size="2x" />
                </button>
            </div>
            <h1>Most Recent Employee</h1>
            <div>
                {employees.length > 0 && (
                    <EmployeeCard
                        handleImageError={handleImageError}
                        employee={employees[0]}
                        isLast={true}
                    />
                )}
            </div>
        </div>
    );
};


export default EmployeeCards;