// Importing React library and necessary hooks for using React components and state management
import React, { useState, useEffect } from 'react';

// Functional component for an edit popup form for stock in records
const EditPopUpForStockIn = ({ record, show, onSave, onClose }) => {
    // State hook to manage the edited record
    const [editedRecord, setEditedRecord] = useState({ ...record });

    // Effect hook to recalculate total price when stock in amount or unit price changes
    useEffect(() => {
        setEditedRecord(current => {
            // Calculating total price by multiplying stock in amount and unit price
            const recalculatedTotalPrice = current.stockInAmount * current.unitPrice;
            return { ...current, totalPrice: recalculatedTotalPrice };
        });
    }, [editedRecord.stockInAmount, editedRecord.unitPrice]);

    // Function to handle changes in input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Parsing value to float for unit price field
        const updatedValue = name === 'unitPrice' ? parseFloat(value) : value;
        // Updating edited record state with changed value
        setEditedRecord({ ...editedRecord, [name]: updatedValue });
    };

    // Rendering null if show prop is false
    if (!show) {
        return null;
    }

    // Rendering the edit popup form
    return (
        <>
            {/* Overlay for the popup */}
            <div style={{
                position: 'fixed', // Fixing the position of the overlay
                top: 0, left: 0, right: 0, bottom: 0, // Positioning the overlay to cover the entire screen
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
                zIndex: 100 // Setting the stacking order to make sure it's on top of other elements
            }}></div>

            {/* Popup content */}
            <div style={{
                position: 'fixed', // Fixing the position of the popup content
                top: '50%', left: '50%', // Positioning the popup content at the center horizontally and vertically
                transform: 'translate(-50%, -50%)', // Adjusting position to center the popup content
                backgroundColor: '#ADD8E6', // Light blue background color
                padding: '20px', // Adding padding to the popup content
                borderRadius: '10px', // Adding rounded corners to the popup content
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Adding shadow to the popup content
                zIndex: 101 // Setting the stacking order to make sure it's on top of the overlay
            }}>
                {/* Heading for the popup */}
                <h2 style={{ color: '#00008B', textAlign: 'center' }}>修改记录</h2>
                {/* Form for editing stock in record */}
                <form onSubmit={(e) => {
                    e.preventDefault(); // Preventing default form submission behavior
                    onSave(editedRecord); // Calling onSave function with edited record
                }}>
                    {/* Input field for stock in amount */}
                    <div>
                        <label>数量: </label>
                        <input
                            type="number" // Setting input type to number
                            name="stockInAmount" // Setting input name to stockInAmount
                            value={editedRecord.stockInAmount} // Setting input value to edited stock in amount
                            onChange={handleChange} // Setting onChange handler to handleChange function
                        />
                    </div>
                    {/* Input field for unit price */}
                    <div>
                        <label>单价: </label>
                        <input
                            type="number" // Setting input type to number
                            step="0.01" // Setting step to allow decimal values
                            name="unitPrice" // Setting input name to unitPrice
                            value={editedRecord.unitPrice} // Setting input value to edited unit price
                            onChange={handleChange} // Setting onChange handler to handleChange function
                        />
                    </div>
                    {/* Displaying total price */}
                    <div>
                        <label>总价: </label>
                        <span>{editedRecord.totalPrice.toFixed(2)}</span>
                    </div>
                    {/* Buttons container to center buttons */}
                    <div style={{
                        textAlign: 'center', // Center align the container
                        marginTop: '10px' // Spacing above the buttons container
                    }}>
                        {/* Submit button */}
                        <button type="submit" style={{
                            backgroundColor: '#00008B', // Setting background color to dark blue
                            color: '#fff', // Setting text color to white
                            padding: '10px', // Adding padding to the button
                            borderRadius: '5px', // Adding rounded corners to the button
                            border: 'none', // Removing border
                            cursor: 'pointer', // Changing cursor to pointer on hover
                            marginRight: '3px' // Spacing between buttons
                        }}>确认</button>
                        {/* Cancel button */}
                        <button onClick={onClose} style={{
                            backgroundColor: '#00008B', // Setting background color to dark blue
                            color: '#fff', // Setting text color to white
                            padding: '10px', // Adding padding to the button
                            borderRadius: '5px', // Adding rounded corners to the button
                            border: 'none', // Removing border
                            cursor: 'pointer' // Changing cursor to pointer on hover
                        }}>取消</button>
                    </div>
                </form>
            </div>
        </>
    );
};

// Exporting the EditPopUpForStockIn component as default
export default EditPopUpForStockIn;
