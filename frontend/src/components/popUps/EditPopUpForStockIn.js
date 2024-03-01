// Import necessary modules from React
import React, { useState, useEffect } from 'react';

// Define a functional component called EditPopUpForStockIn, which takes props: record, show, onSave, onClose
const EditPopUpForStockIn = ({ record, show, onSave, onClose }) => {
    // Initialize state variable editedRecord using useState hook, set it to the value of prop record
    const [editedRecord, setEditedRecord] = useState({ ...record });

    // Use useEffect hook to recalculate totalPrice whenever stockInAmount or unitPrice changes
    useEffect(() => {
        // Update editedRecord state using setEditedRecord function and a callback
        setEditedRecord(current => {
            // Calculate recalculatedTotalPrice by multiplying stockInAmount with unitPrice
            const recalculatedTotalPrice = current.stockInAmount * current.unitPrice;
            // Return a new object with updated totalPrice along with other properties
            return { ...current, totalPrice: recalculatedTotalPrice };
        });
    }, [editedRecord.stockInAmount, editedRecord.unitPrice]);

    // Define handleChange function to handle input change events
    const handleChange = (e) => {
        // Destructure name and value from the event target
        const { name, value } = e.target;
        // Parse value to float if name is 'unitPrice', else keep it as it is
        const updatedValue = name === 'unitPrice' ? parseFloat(value) : value;
        // Update editedRecord state with the new value
        setEditedRecord({ ...editedRecord, [name]: updatedValue });
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
                {/* Input field for stockInAmount */}
                <div>
                    {/* Label for stockInAmount input */}
                    <label>数量: </label>
                    {/* Input field for stockInAmount */}
                    <input
                        type="number"
                        name="stockInAmount"
                        value={editedRecord.stockInAmount}
                        onChange={handleChange}
                    />
                </div>
                {/* Input field for unitPrice */}
                <div>
                    {/* Label for unitPrice input */}
                    <label>单价: </label>
                    {/* Input field for unitPrice */}
                    <input
                        type="number"
                        step="0.01"
                        name="unitPrice"
                        value={editedRecord.unitPrice}
                        onChange={handleChange}
                    />
                </div>
                {/* Display field for totalPrice (not editable) */}
                <div>
                    {/* Label for totalPrice display */}
                    <label>总价: </label>
                    {/* Display totalPrice with fixed decimal precision */}
                    <span>{editedRecord.totalPrice.toFixed(2)}</span>
                </div>
                {/* Button to submit the form */}
                <button type="submit">Save</button>
                {/* Button to cancel the edit */}
                <button onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

// Export the EditPopUpForStockIn component as default
export default EditPopUpForStockIn;
