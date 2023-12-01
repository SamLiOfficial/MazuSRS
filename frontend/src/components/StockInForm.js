import React, { useState } from 'react';
import axios from 'axios';

const StockInForm = ({ item }) => {
    // State variables to store form input values and response message
    const [stockInAmount, setStockInAmount] = useState("");
    const [unitPrice, setUnitPrice] = useState("");
    const [currencyUnit, setCurrencyUnit] = useState("CAD");
    const [note, setNote] = useState("");
    const [responseMessage, setResponseMessage] = useState("");  // State to hold the response

    // Styling for form elements
    const inputStyle = {
        width: '200px',
        padding: '10px',
        margin: '10px',
        borderRadius: '5px',
        border: '3px solid #000',  // Thick Black Line
        backgroundColor: '#fff',  // White background
        color: '#000'  // Black text
    };

    const selectStyle = {
        width: '226px',
        padding: '10px',
        margin: '10px',
        borderRadius: '5px',
        border: '3px solid #000',  // Thick Black Line
        backgroundColor: '#fff',  // White background
        color: '#000'  // Black text
    };

    const buttonStyle = {
        margin: '10px',
        padding: '10px',
        width: '100px',
        backgroundColor: '#000',  // Black background
        color: 'white',  // White text
        borderRadius: '5px',
        cursor: 'pointer',
        transition: '0.2s'
    };

    const inputContainerStyle = {
        display: 'block',  // Make sure each input takes its own line
        margin: '10px 0',  // Add some vertical margin
    };

    // Function to save the stock-in record
    const saveRecord = async () => {
        // Check for valid input
        if (!Number.isInteger(Number(stockInAmount)) || isNaN(Number(unitPrice))) {
            setResponseMessage("Invalid Input");  // Update the response message
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
            {/* Input fields for stock-in form */}
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
            {/* Submit button */}
            <button style={buttonStyle} onClick={saveRecord}>Submit</button>
            {/* Display the response message here */}
            <p>{responseMessage}</p>
        </div>
    );
};

export default StockInForm;
