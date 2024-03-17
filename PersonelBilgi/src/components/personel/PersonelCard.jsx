import React from "react";
import { getPersonelCardLastMonth, getResourcePhoto } from "../../api/Personel.jsx";

const FALLBACK_IMAGE_URL = 'fallback/image/url';

// Add CSS for card styling
const cardStyles = {
    card: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '10px',
        margin: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        display: 'inline-block',
        position: 'relative',
        width: '250px', // Set a fixed width for the cards
        textAlign: 'center',
    },
    image: {
        borderRadius: '50%',
        width: '100px',
        height: '100px',
    },
    name: {
        color: '#E53935', // Color can be adjusted to match the theme
    },
    date: {
        fontSize: '0.85rem',
    },
    lastCard: {
        border: '2px solid #E53935', // Highlight for the last registered card
    },
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

const EmployeeCards = () => {
    const [employees, setEmployees] = React.useState([]);
    const [maxStartDate, setMaxStartDate] = React.useState(null);

    const handleImageError = (e) => {
        e.target.src = FALLBACK_IMAGE_URL;
    };

    const fetchPhoto = async (photoId) => {
        const response = await getResourcePhoto(photoId);
        return URL.createObjectURL(response.data);
    };

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getPersonelCardLastMonth();
                if (!response.data?.length) throw new Error();

                const updatedEmployees = await Promise.all(
                    response.data.map(async (employee) => ({
                        ...employee,
                        photoURL: await fetchPhoto(employee.photoId)
                    }))
                );
                setEmployees(updatedEmployees);

                const lastRegisteredEmployee = updatedEmployees.reduce((latest, emp) =>
                        (new Date(emp.startDateOfEmployment) > latest)
                            ? new Date(emp.startDateOfEmployment)
                            : latest
                    , new Date(updatedEmployees[0].startDateOfEmployment));
                setMaxStartDate(lastRegisteredEmployee);
            } catch (error) {
                console.error('Error occurred while fetching data', error);
            }
        };
        fetchData();
    }, []);

    const lastRegisteredEmployee = employees.find(emp =>
        new Date(emp.startDateOfEmployment).getTime() === new Date(maxStartDate).getTime()
    );

    if (!employees) return <ErrorMessage />;

    return (
        <div>
            <h1>New Employees of the Last Month</h1>
            <div>
                {employees.map(employee => (
                    <EmployeeCard
                        handleImageError={handleImageError}
                        key={employee.id}
                        employee={employee}
                        isLast={false}
                    />
                ))}
            </div>
            {lastRegisteredEmployee &&
                <div>
                    <h1>Last Registered Employee</h1>
                    <EmployeeCard
                        handleImageError={handleImageError}
                        employee={lastRegisteredEmployee}
                        isLast={true}
                    />
                </div>
            }
        </div>
    );
};

export default EmployeeCards;



