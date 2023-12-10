import React from 'react'; // Import the React library

// Import the 'useNavigate' hook from 'react-router-dom' library
import { useNavigate } from 'react-router-dom';

// Import the 'SearchFormOut' component from the specified path
import SearchFormOut from './SearchFormOut'; // Update this path as needed

const NewStockOutPage = () => { // Define a functional component named 'NewStockOutPage'
    const navigate = useNavigate(); // Create a 'navigate' function using the 'useNavigate' hook

    // Define styles for the container of the page, similar to NewStockInPage
    const containerStyle = {
        display: 'flex', // Set the display property to 'flex' for layout
        flexDirection: 'column', // Arrange elements in a column
        alignItems: 'center', // Center align elements horizontally
        padding: '20px', // Apply padding of 20px on all sides
        backgroundColor: '#ADD8E6', // Set background color to light blue
        borderRadius: '10px', // Add rounded corners with 10px radius
    };

    // Define styles for the title, similar to NewStockInPage
    const titleStyle = {
        marginBottom: '20px', // Add bottom margin to create space
        fontSize: '24px', // Set font size to 24px
        fontWeight: 'bold', // Apply bold font weight
        border: '3px solid #00008B',  // Add a dark blue border
        padding: '10px',  // Apply padding inside the border
        borderRadius: '0px',  // Use square corners
        width: "525px", // Set a fixed width of 525px
        textAlign: "center", // Center align the text
        color: '#00008B' // Set text color to dark blue
    };

    // Define styles for the button, similar to NewStockInPage
    const buttonStyle = {
        marginTop: '20px', // Add top margin to create space
        backgroundColor: '#00008B', // Set background color to dark blue
        color: 'white', // Set text color to white
        padding: '10px', // Apply padding to the button
        borderRadius: '5px', // Add rounded corners with 5px radius
        cursor: 'pointer', // Change cursor to a pointer on hover
        width: '250px', // Set a fixed width of 250px for the button
        transition: 'transform 0.1s ease-in-out' // Add a transform animation
    };

    // Function to handle button click down event
    const handleMouseDown = (e) => {
        e.currentTarget.style.transform = 'scale(0.95)'; // Scale down the button on click
    };

    // Function to handle button click up event
    const handleMouseUp = (e) => {
        e.currentTarget.style.transform = 'scale(1)'; // Restore the button size on release
    };

    return (
        <div style={containerStyle}> {/* Render a div with the container style */}
            {/* Title for the page, similar to NewStockInPage */}
            <div style={titleStyle}>
                新建出库记录 {/* Display the text '新建出库记录' */}
            </div>
            {/* Include the 'SearchFormOut' component */}
            <SearchFormOut />
            {/* Render a back button to navigate to the previous page */}
            <button
                style={buttonStyle} // Apply the updated button style
                onMouseDown={handleMouseDown} // Handle mouse down event
                onMouseUp={handleMouseUp} // Handle mouse up event
                onClick={() => navigate(-1)} // Call 'navigate' function to go back
            >
                返回 {/* Display the text '返回' on the button */}
            </button>
        </div>
    );
};

export default NewStockOutPage; // Export the 'NewStockOutPage' component
