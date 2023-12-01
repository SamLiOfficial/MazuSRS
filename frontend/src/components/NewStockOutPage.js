import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchFormOut from './SearchFormOut'; // Update this path as needed

const NewStockOutPage = () => {
    const navigate = useNavigate();

    // Styling for the container of the page, similar to NewStockInPage
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#ADD8E6', // Light blue background
        borderRadius: '10px',
    };

    // Styling for the title, similar to NewStockInPage
    const titleStyle = {
        marginBottom: '20px',
        fontSize: '24px',
        fontWeight: 'bold',
        border: '3px solid #00008B',  // Dark blue border
        padding: '10px',  // Padding inside the border
        borderRadius: '0px',  // Square corners
        width: "525px", // Set a fixed width
        textAlign: "center",
        color: '#00008B' // Dark blue text
    };

    // Styling for the button, similar to NewStockInPage
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
            {/* Title for the page, similar to NewStockInPage */}
            <div style={titleStyle}>
                新建出库记录
            </div>
            {/* Include the SearchFormOut component */}
            <SearchFormOut />
            {/* Back button to navigate to the previous page */}
            <button
                style={buttonStyle} // Updated button style
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onClick={() => navigate(-1)}
            >
                返回
            </button>
        </div>
    );
};

export default NewStockOutPage;
