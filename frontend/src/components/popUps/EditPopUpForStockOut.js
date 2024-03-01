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
        // Update displayTotalPrice state by multiplying editedRecord's sellPrice with stockOutAmount
        setDisplayTotalPrice(editedRecord.sellPrice * editedRecord.stockOutAmount);
    }, [editedRecord.sellPrice, editedRecord.stockOutAmount]);

    // Define handleChange function to handle input change events
    const handleChange = (e) => {
        // Destructure name and value from the event target
        const { name, value } = e.target;
        // Update editedRecord state with the new value, parse value to float
        setEditedRecord({ ...editedRecord, [name]: parseFloat(value) });
    };

    // If show is false, return null, else return the edit form
    if (!show) {
        return null;
    }

    // Return the edit form JSX
    return (
        <div style={{ position: 'fixed', top: '20%', left: '30%', backgroundColor: 'white', padding: '20px', zIndex: 100 }}>
            {/* Display a heading for the Edit Record section */}
            <h2>Edit Record</h2>
            {/* Form for editing the record */}
            <form onSubmit={(e) => {
                // Prevent default form submission behavior
                e.preventDefault();
                // Call onSave function with editedRecord as argument
                onSave(editedRecord);
            }}>
                {/* Input field for stockOutAmount */}
                <div>
                    {/* Label for stockOutAmount input */}
                    <label>数量: </label>
                    {/* Input field for stockOutAmount */}
                    <input
                        type="number"
                        name="stockOutAmount"
                        value={editedRecord.stockOutAmount}
                        onChange={handleChange}
                    />
                </div>
                {/* Input field for sellPrice */}
                <div>
                    {/* Label for sellPrice input */}
                    <label>售价: </label>
                    {/* Input field for sellPrice */}
                    <input
                        type="number"
                        step="0.01"
                        name="sellPrice"
                        value={editedRecord.sellPrice}
                        onChange={handleChange}
                    />
                </div>
                {/* Display field for totalPrice (not editable) */}
                <div>
                    {/* Label for totalPrice display */}
                    <label>总价: </label>
                    {/* Display totalPrice with fixed decimal precision */}
                    <span>{displayTotalPrice.toFixed(2)}</span>
                </div>
                {/* Button to submit the form */}
                <button type="submit">Save</button>
                {/* Button to cancel the edit */}
                <button onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

// Export the EditPopUpForStockOut component as default
export default EditPopUpForStockOut;
