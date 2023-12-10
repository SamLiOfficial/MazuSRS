import React, { useState } from 'react';  // Import necessary modules
import axios from 'axios';

const StockInForm = ({ item }) => {
    // State variables to store form input values and response message
    const [stockInAmount, setStockInAmount] = useState("");  // Initialize stockInAmount as an empty string
    const [unitPrice, setUnitPrice] = useState("");  // Initialize unitPrice as an empty string
    const [currencyUnit, setCurrencyUnit] = useState("CAD");  // Initialize currencyUnit as "CAD"
    const [note, setNote] = useState("");  // Initialize note as an empty string
    const [responseMessage, setResponseMessage] = useState("");  // State to hold the response

    // Styling for form elements
    const inputStyle = {
        width: '200px',
        padding: '10px',
        margin: '10px',
        borderRadius: '5px',
        border: '3px solid #00008B',  // Thick Dark Blue Line
        backgroundColor: '#fff',  // White background
        color: '#000'  // Black text
    };

    const selectStyle = {
        width: '226px',
        padding: '10px',
        margin: '10px',
        borderRadius: '5px',
        border: '3px solid #00008B',  // Thick Dark Blue Line
        backgroundColor: '#fff',  // White background
        color: '#000'  // Black text
    };

    const buttonStyle = {
        margin: '10px',
        padding: '10px',
        width: '100px',
        backgroundColor: '#00008B',  // Dark Blue background
        alignItems: 'center',
        color: 'white',  // White text
        borderRadius: '5px',
        cursor: 'pointer',
        transition: '0.2s'
    };

    const rowContainerStyle = {
        display: 'flex',  // Use Flexbox
        justifyContent: 'space-between',  // Space items evenly
        alignItems: 'center',  // Align items vertically in the center
        margin: '10px 0',  // Vertical margin for each row
    };

    // Function to save the stock-in record
    const saveRecord = async () => {
        // Check for valid input
        if (!Number.isInteger(Number(stockInAmount)) || isNaN(Number(unitPrice))) {
            setResponseMessage("Invalid Input");  // Update the response message if input is invalid
            return;
        }

        // Create a record object to send to the server
        const record = {
            itemId: item.itemId,
            itemName: item.itemName,
            brand: item.brand,
            itemSize: item.itemSize,
            unit: item.unit,
            stockInAmount,
            unitPrice,
            currencyUnit,
            note,
            totalPrice: Number(stockInAmount) * Number(unitPrice)
        };

        try {
            // Send a POST request to the server to save the record
            const res = await axios.post('http://localhost:8080/stock-in-record', record);
            setResponseMessage(res.data);  // Update the response message with the server's response
        } catch (error) {
            console.error("Error saving record:", error);
            setResponseMessage("Error saving record");  // Update the response message in case of an error
        }
    };

    return (
        <div>
            {/* First row of input fields */}
            <div style={rowContainerStyle}>
                <input
                    style={inputStyle}
                    type="text"
                    placeholder={`Stock-in amount`}
                    value={stockInAmount}
                    onChange={e => setStockInAmount(e.target.value)}
                />
                <input
                    style={inputStyle}
                    type="text"
                    placeholder={`Price/${item.unit}`}
                    value={unitPrice}
                    onChange={e => setUnitPrice(e.target.value)}
                />
            </div>
            {/* Second row of input fields */}
            <div style={rowContainerStyle}>
                <select style={selectStyle} value={currencyUnit} onChange={e => setCurrencyUnit(e.target.value)}>
                    <option value="CAD">CAD</option>
                    <option value="CNY">CNY</option>
                </select>
                <input
                    style={inputStyle}
                    type="text"
                    placeholder="Note"
                    value={note}
                    onChange={e => setNote(e.target.value)}
                />
            </div>
            {/* Submit button */}
            <button style={buttonStyle} onClick={saveRecord}>Submit</button>
            {/* Display the response message here */}
        </div>
    );
};

export default StockInForm;
