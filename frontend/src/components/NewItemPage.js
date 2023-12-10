import React from 'react'; // Import the React library

// Import the 'useNavigate' hook from 'react-router-dom' library
import { useNavigate } from 'react-router-dom';

// Import the 'ItemForm' component from the specified path
import ItemForm from './ItemForm'; // Ensure the path is correct

const NewItemPage = () => { // Define a functional component named 'NewItemPage'
    const navigate = useNavigate(); // Create a 'navigate' function using the 'useNavigate' hook

    // Define styles for the container of the page
    const containerStyle = {
        display: 'flex', // Set the display property to 'flex' for layout
        flexDirection: 'column', // Arrange elements in a column
        alignItems: 'center', // Center align elements horizontally
        padding: '20px 20px', // Apply padding of 20px on all sides
        backgroundColor: '#d4ebf2', // Set background color to light blue
        borderRadius: '10px', // Add rounded corners with 10px radius
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', // Add a subtle box shadow
        margin: '20px auto', // Center the container and apply margin
        maxWidth: '600px', // Set a maximum width for the container
        width: '100%', // Make the container full width
        boxSizing: 'border-box', // Include padding in the width calculation
    };

    // Define styles for the title
    const titleStyle = {
        marginBottom: '20px', // Add bottom margin to create space
        fontSize: '24px', // Set font size to 24px
        fontWeight: 'bold', // Apply bold font weight
        color: '#00008B', // Set text color to dark blue
        textAlign: 'center', // Center align the title
    };

    // Define styles for the back button
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
            <div style={titleStyle}>新建货品</div> {/* Render a title in Chinese */}
            {/* Include the 'ItemForm' component */}
            <ItemForm />
            {/* Render a back button to navigate to the previous page */}
            <button
                style={buttonStyle} // Apply the button style
                onMouseDown={handleMouseDown} // Handle mouse down event
                onMouseUp={handleMouseUp} // Handle mouse up event
                onClick={() => navigate(-1)} // Call 'navigate' function to go back
            >
                返回 {/* Display the text '返回' on the button */}
            </button>
        </div>
    );
};

export default NewItemPage; // Export the 'NewItemPage' component
