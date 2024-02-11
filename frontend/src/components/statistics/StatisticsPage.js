// Importing the React library to use React features in the component
import React from 'react';

// Importing the Link component from the react-router-dom library for navigation
import { Link } from 'react-router-dom';

// Declaring a functional component named StatisticsPage
const StatisticsPage = () => {
    // Defining a constant for styling the main menu of the statistics page
    // It's a JavaScript object containing CSS properties for layout and color
    const statisticsMenuStyle = {
        display: 'flex',              // Using Flexbox for layout
        flexDirection: 'column',      // Items are stacked vertically
        alignItems: 'center',         // Centers items horizontally
        justifyContent: 'center',     // Centers items vertically
        height: '100vh',              // Full viewport height
        backgroundColor: '#ADD8E6'    // Light blue background color
    };

    // Defining a constant for styling the buttons on the page
    // It's a JavaScript object containing CSS properties for size, color, and interactivity
    const buttonStyle = {
        width: '250px',                  // Fixed width for buttons
        margin: '10px',                  // Space around buttons
        padding: '15px 30px',            // Internal space in buttons
        fontSize: '18px',                // Font size for button text
        borderRadius: '5px',             // Rounded corners
        backgroundColor: '#00008B',      // Dark blue background color
        color: 'white',                  // Text color
        cursor: 'pointer',               // Cursor changes to pointer on hover
        textDecoration: 'none',          // No underline for text
        textAlign: 'center',             // Center align text
        transition: 'transform 0.1s ease-in-out' // Smooth transformation on interaction
    };

    // Defining a constant for styling the title of the page
    // It's a JavaScript object containing CSS properties for font size and color
    const titleStyle = {
        fontSize: '36px',           // Large font size for the title
        fontWeight: 'bold',         // Bold font weight for emphasis
        marginBottom: '30px',       // Space below the title
        color: '#00008B'            // Dark blue color for the title text
    };

    // Function to handle the MouseDown event on buttons
    // It changes the scale of the button to give a pressed effect
    const handleMouseDown = (e) => {
        e.currentTarget.style.transform = 'scale(0.95)'; // Scales down to 95%
    };

    // Function to handle the MouseUp event on buttons
    // It resets the scale of the button back to normal
    const handleMouseUp = (e) => {
        e.currentTarget.style.transform = 'scale(1)'; // Resets scale to 100%
    };

    // The return statement renders the JSX for the component
    return (
        // A div container for the entire Statistics menu
        <div style={statisticsMenuStyle}>
            <div style={titleStyle}>统计</div>
            <Link to="/statistics/inventory-record" style={buttonStyle} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>库存报表</Link>
            <Link to="/statistics/stock-in-statistics" style={buttonStyle} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>入库统计</Link>
            <Link to="/statistics/stock-out-statistics" style={buttonStyle} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>出库统计</Link>
            <Link to="/statistics/stock-in-statistics-one-item" style={buttonStyle} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>入库统计 - 单个货品</Link>
            <Link to="/statistics/stock-out-statistics-one-item" style={buttonStyle} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>出库统计 - 单个货品</Link>
        </div>
    );
};

// Exporting the StatisticsPage component for use in other parts of the application
export default StatisticsPage;
