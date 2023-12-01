import React from 'react';
import { useNavigate } from 'react-router-dom';
import ItemForm from './ItemForm'; // Ensure the path is correct

const NewItemPage = () => {
    const navigate = useNavigate();

    // Updated styling for the container of the page
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 20px', // Reduced horizontal padding to 20px
        backgroundColor: '#d4ebf2',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        margin: '20px auto', // Center the container
        maxWidth: '600px', // Adjust the maximum width as needed
        width: '100%', // Full width
        boxSizing: 'border-box', // Include padding in the width
    };

    // Updated styling for the title
    const titleStyle = {
        marginBottom: '20px',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#00008B', // Dark blue color for the title
        textAlign: 'center', // Center align the title
    };

    // Updated styling for the back button
    const buttonStyle = {
        marginTop: '20px',
        backgroundColor: '#00008B', // Dark blue background
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '250px', // Set width to 250px
        transition: 'transform 0.1s ease-in-out' // Add transition effect
    };

    // Function to handle button click down event
    const handleMouseDown = (e) => {
        e.currentTarget.style.transform = 'scale(0.95)';
    };

    // Function to handle button click up event
    const handleMouseUp = (e) => {
        e.currentTarget.style.transform = 'scale(1)';
    };

    return (
        <div style={containerStyle}>
            <div style={titleStyle}>新建货品</div> {/* Title in Chinese */}
            {/* Include the ItemForm component */}
            <ItemForm />
            {/* Back button to navigate to the previous page */}
            <button
                style={buttonStyle}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onClick={() => navigate(-1)}
            >
                返回
            </button>
        </div>
    );
};

export default NewItemPage;
