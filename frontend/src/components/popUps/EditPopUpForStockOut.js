// Import necessary modules from React
import React, { useState, useEffect } from 'react';

// Define a functional component called EditPopUpForStockOut, which takes props: record, show, onSave, onClose
const EditPopUpForStockOut = ({ record, show, onSave, onClose }) => {
    // Initialize state variable editedRecord using useState hook, set it to the value of prop record
    const [editedRecord, setEditedRecord] = useState({ ...record });

    // Initialize state variable displayTotalPrice using useState hook, set it to the product of sellPrice and stockOutAmount
    const [displayTotalPrice, setDisplayTotalPrice] = useState(record.sellPrice * record.stockOutAmount);

    // Use useEffect hook to update displayTotalPrice whenever sellPrice or stockOutAmount changes
    useEffect(() => {
        setDisplayTotalPrice(editedRecord.sellPrice * editedRecord.stockOutAmount);
    }, [editedRecord.sellPrice, editedRecord.stockOutAmount]);

    // Define handleChange function to handle input change events
    const handleChange = (e) => {
        // Destructure name and value from the event target
        const { name, value } = e.target;
        // Update editedRecord with the new value, converting value to a float
        setEditedRecord({ ...editedRecord, [name]: parseFloat(value) });
    };

    // If show is false, return null, else return the edit form
    if (!show) {
        // If show is false, return null
        return null;
    }

    // If show is true, return the edit form
    return (
        <>
            {/* Overlay for modal */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 100 // Ensure overlay is below the form but above other content
            }}></div>

            {/* Form container */}
            <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#ADD8E6', // Use the same light blue background color as in the previous component
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                zIndex: 101 // Ensure form is above the overlay
            }}>
                {/* Heading */}
                <h2 style={{ color: '#00008B', textAlign: 'center' }}>修改记录</h2>
                {/* Edit form */}
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSave(editedRecord);
                }}>
                    {/* Input for stockOutAmount */}
                    <div>
                        <label>数量: </label>
                        <input
                            type="number"
                            name="stockOutAmount"
                            value={editedRecord.stockOutAmount}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Input for sellPrice */}
                    <div>
                        <label>售价: </label>
                        <input
                            type="number"
                            step="0.01"
                            name="sellPrice"
                            value={editedRecord.sellPrice}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Display total price */}
                    <div>
                        <label>总价: </label>
                        <span>{displayTotalPrice.toFixed(2)}</span>
                    </div>
                    {/* Buttons container to center buttons */}
                    <div style={{
                        textAlign: 'center', // Center align the container
                        marginTop: '10px' // Spacing above the buttons container
                    }}>
                        {/* Confirm button */}
                        <button type="submit" style={{
                            backgroundColor: '#00008B',
                            color: '#fff',
                            padding: '10px 10px', // Adjust padding for visual balance
                            borderRadius: '5px',
                            border: 'none',
                            cursor: 'pointer',
                            margin: '0 1px', // Space between buttons
                        }}>确认</button>
                        {/* Cancel button */}
                        <button onClick={onClose} style={{
                            backgroundColor: '#00008B',
                            color: '#fff',
                            padding: '10px 10px', // Adjust padding for visual balance
                            borderRadius: '5px',
                            border: 'none',
                            cursor: 'pointer',
                            margin: '0 2px', // Space between buttons
                        }}>取消</button>
                    </div>
                </form>
            </div>
        </>
    );
};

// Export the EditPopUpForStockOut component as default
export default EditPopUpForStockOut;
