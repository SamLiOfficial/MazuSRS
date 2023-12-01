import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockOutForm = ({ item, currentStock }) => {
    // State variables to store form input values and error messages
    const [stockOutAmount, setStockOutAmount] = useState("");
    const [currencyUnit, setCurrencyUnit] = useState("CAD");
    const [note, setNote] = useState("");
    const [sellPrice, setSellPrice] = useState("");
    const [error, setError] = useState("");

    // Styling for form elements, similar to StockInForm
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

    // Function to save the stock-out record
    const saveRecord = async () => {
        // Check for valid input (integer for stock-out amount, number for sell price)
        if (!Number.isInteger(Number(stockOutAmount)) || isNaN(Number(sellPrice))) {
            setError("Invalid Input"); // Update error message
            return;
        }
        // Check if stock-out amount exceeds current stock
        if (Number(stockOutAmount) > currentStock) {
            setError("Stock out amount exceeds current stock"); // Update error message
            return;
        }

        // Create a record object to send to the server
        const record = {
            itemId: item.itemId,
            itemName: item.itemName,
            brand: item.brand,
            itemSize: item.itemSize,
            unit: item.unit,
            stockOutAmount: Number(stockOutAmount),
            currencyUnit,
            note,
            sellPrice: sellPrice === "" ? 0 : Number(sellPrice)
        };

        try {
            // Send a POST request to the server to save the stock-out record
            const res = await axios.post('http://localhost:8080/stock-out-record', record);
            setError(`Stock-out record saved! Attributes: ${JSON.stringify(res.data)}`); // Update error message with server's response
        } catch (error) {
            console.error("Error saving record:", error);
        }
    };

    return (
        <div>
            {/* Input fields for stock-out form */}
            <input
                style={inputStyle}
                type="text"
                placeholder="Stock-out amount"
                value={stockOutAmount}
                onChange={e => setStockOutAmount(e.target.value)}
            />
            <input
                style={inputStyle}
                type="text"
                placeholder={`Sell Price/${item.unit}`}
                value={sellPrice}
                onChange={e => setSellPrice(e.target.value)}
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
            {/* Display error message if there is an error */}
            {error && <p>{error}</p>}
        </div>
    );
};

export default StockOutForm;
