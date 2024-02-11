// Importing React library for building user interfaces
import React from 'react';

// Definition of the Modal component with props 'onClose' and 'message'
const Modal = ({ onClose, message }) => {
    // The return statement for the JSX to be rendered
    return (
        // React fragment to group multiple elements without adding extra nodes to the DOM
        <>
            {/* Overlay: a div covering the entire viewport, with a semi-transparent black background */}
            <div style={{
                position: 'fixed', // Makes the div stay in the same place even if the page is scrolled
                top: 0, // Aligns the top edge of the div with the top of the viewport
                left: 0, // Aligns the left edge of the div with the left of the viewport
                right: 0, // Aligns the right edge of the div with the right of the viewport
                bottom: 0, // Aligns the bottom edge of the div with the bottom of the viewport
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
                zIndex: 1 // Stack order, ensures this div is behind the modal but above other content
            }}></div>

            {/* Modal: a div for the modal content */}
            <div style={{
                position: 'fixed', // Keeps the modal in a fixed position
                top: '50%', // Positions the top edge of the modal in the middle of the viewport
                left: '50%', // Positions the left edge of the modal in the middle of the viewport
                transform: 'translate(-50%, -50%)', // Centers the modal both vertically and horizontally
                backgroundColor: '#ADD8E6', // Light blue background color
                padding: '20px', // Spacing inside the modal
                borderRadius: '10px', // Rounded corners for the modal
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Shadow effect for the modal
                zIndex: 2, // Stack order, ensures the modal is above the overlay
                animation: 'fadeIn 0.5s' // Fade-in animation for the modal appearance
            }}>
                {/* Text inside the modal */}
                <p style={{ color: '#00008B', textAlign: 'center', fontWeight: 'bold' }}>
                    {/* Space for an icon or additional content next to the message */}
                    <span style={{ marginRight: '10px' }}>️</span>
                    {/* Display the message passed as a prop */}
                    {message}
                </p>
                {/* Close button */}
                <button onClick={onClose} style={{
                    backgroundColor: '#00008B', // Dark blue background color for the button
                    color: '#fff', // White text color
                    padding: '12px 0', // Vertical padding for the button
                    borderRadius: '5px', // Rounded corners for the button
                    border: 'none', // No border for the button
                    cursor: 'pointer', // Cursor changes to a pointer to indicate it's clickable
                    marginTop: '15px', // Space above the button
                    width: '60%', // Width of the button relative to its container
                    display: 'block', // Display as a block element
                    marginLeft: 'auto', // Center align the button horizontally
                    marginRight: 'auto', // Center align the button horizontally
                    outline: 'none' // No outline when the button is focused
                }}
                        onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'} // Scales down the button when clicked
                        onMouseUp={(e) => e.target.style.transform = 'scale(1)'} // Returns the button to normal size when released
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'} // Returns the button to normal size when the cursor leaves
                >
                    关闭
                </button>
            </div>
        </>
    );
};

// Export the Modal component to be used in other parts of the application
export default Modal;
