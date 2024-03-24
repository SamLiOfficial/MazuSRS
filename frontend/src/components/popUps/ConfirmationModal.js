// Importing React library for using React components
import React from 'react';

// Functional component for a confirmation modal
const ConfirmationModal = ({ onClose, onConfirm, message }) => {
    return (
        <>
            {/* Overlay for the modal */}
            <div style={{
                position: 'fixed', // Fixing the position of the overlay
                top: 0, left: 0, right: 0, bottom: 0, // Positioning the overlay to cover the entire screen
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
                zIndex: 1, // Setting the stacking order to make sure it's on top of other elements
            }}></div>

            {/* Modal Content */}
            <div style={{
                position: 'fixed', // Fixing the position of the modal content
                top: '50%', left: '50%', // Positioning the modal content at the center horizontally and vertically
                transform: 'translate(-50%, -50%)', // Adjusting position to center the modal content
                backgroundColor: '#ADD8E6', // Light blue background color
                padding: '20px', // Adding padding to the modal content
                borderRadius: '10px', // Adding rounded corners to the modal content
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Adding shadow to the modal content
                zIndex: 2, // Setting the stacking order to make sure it's on top of the overlay
                animation: 'fadeIn 0.5s', // Applying fade-in animation
            }}>
                {/* Message displayed in the modal */}
                <p style={{ color: '#00008B', textAlign: 'center', fontWeight: 'bold' }}>
                    {message} {/* Displaying the message passed as a prop */}
                </p>

                {/* Buttons for confirmation and cancellation */}
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                    {/* Confirm Button */}
                    <button onClick={onConfirm} style={{
                        backgroundColor: '#00008B', // Setting background color to dark blue
                        color: '#fff', // Setting text color to white
                        padding: '10px 15px', // Adding padding to the button
                        borderRadius: '5px', // Adding rounded corners to the button
                        border: 'none', // Removing border
                        cursor: 'pointer', // Changing cursor to pointer on hover
                        outline: 'none' // Removing outline
                    }}
                            onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'} // Scaling down button on mouse down
                            onMouseUp={(e) => e.target.style.transform = 'scale(1)'} // Restoring button scale on mouse up
                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'} // Restoring button scale on mouse leave
                    >
                        确认 {/* Displaying 'Confirm' in Chinese */}
                    </button>

                    {/* Cancel Button */}
                    <button onClick={onClose} style={{
                        backgroundColor: '#00008B', // Setting background color to dark blue
                        color: '#fff', // Setting text color to white
                        padding: '10px 15px', // Adding padding to the button
                        borderRadius: '5px', // Adding rounded corners to the button
                        border: 'none', // Removing border
                        cursor: 'pointer', // Changing cursor to pointer on hover
                        outline: 'none' // Removing outline
                    }}
                            onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'} // Scaling down button on mouse down
                            onMouseUp={(e) => e.target.style.transform = 'scale(1)'} // Restoring button scale on mouse up
                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'} // Restoring button scale on mouse leave
                    >
                        取消 {/* Displaying 'Cancel' in Chinese */}
                    </button>
                </div>
            </div>
        </>
    );
};

// Exporting the ConfirmationModal component as default
export default ConfirmationModal;
