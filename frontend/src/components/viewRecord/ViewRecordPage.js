// Import necessary modules from React and react-router-dom library
import React from 'react';
import { Link } from 'react-router-dom';

// Define the ViewRecordPage functional component
const ViewRecordPage = () => {
    // Styling for the main menu
    const viewRecordStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#ADD8E6' // Set background color to light blue
    };

    // Styling for buttons
    const buttonStyle = {
        width: '250px',
        margin: '10px',
        padding: '15px 30px',
        fontSize: '18px',
        borderRadius: '5px',
        backgroundColor: '#00008B', // Set background color to dark blue
        color: 'white', // Set text color to white
        cursor: 'pointer', // Set cursor to pointer
        textDecoration: 'none', // Remove default text decoration
        textAlign: 'center', // Center align text
        transition: 'transform 0.1s ease-in-out' // Add smooth transition effect for transform property
    };

    // Styling for the title
    const titleStyle = {
        fontSize: '36px', // Set font size
        fontWeight: 'bold', // Set font weight to bold
        marginBottom: '30px', // Set bottom margin
        color: '#00008B' // Set text color to dark blue
    };

    // Handle MouseDown event to scale down the button
    const handleMouseDown = (e) => {
        e.currentTarget.style.transform = 'scale(0.95)'; // Reduce button size when mouse is pressed
    };

    // Handle MouseUp event to scale up the button
    const handleMouseUp = (e) => {
        e.currentTarget.style.transform = 'scale(1)'; // Restore button size when mouse is released
    };

    // Return JSX for rendering the ViewRecordPage component
    return (
        <div style={viewRecordStyle}>
            {/* Display title */}
            <div style={titleStyle}>查询记录</div>
            {/* Links to different record views */}
            <Link to="/view-record/stock-in" style={buttonStyle} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>查询入库记录</Link>
            <Link to="/view-record/stock-out" style={buttonStyle} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>查询出库记录</Link>
            <Link to="/view-record/stock-in-one-item" style={buttonStyle} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>查询入库记录 - 单个货品</Link>
            <Link to="/view-record/stock-out-one-item" style={buttonStyle} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>查询出库记录 - 单个货品</Link>
        </div>
    );
};

// Export the ViewRecordPage component as default
export default ViewRecordPage;
