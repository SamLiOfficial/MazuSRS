import React, { useState } from 'react';
import axios from 'axios';

const StockOutForm = ({ item, currentStock }) => {
    const [stockOutAmount, setStockOutAmount] = useState("");
    const [currencyUnit, setCurrencyUnit] = useState("CAD");
    const [note, setNote] = useState("");
    const [sellPrice, setSellPrice] = useState("");
    const [error, setError] = useState("");

    const inputStyle = {
        width: '200px',
        padding: '10px',
        margin: '10px',
        borderRadius: '5px',
        border: '3px solid #00008B',
        backgroundColor: '#fff',
        color: '#000'
    };

    const selectStyle = {
        width: '226px',
        padding: '10px',
        margin: '10px',
        borderRadius: '5px',
        border: '3px solid #00008B',
        backgroundColor: '#fff',
        color: '#000'
    };

    const buttonStyle = {
        margin: '10px',
        padding: '10px',
        width: '100px',
        backgroundColor: '#00008B',
        color: 'white',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: '0.2s'
    };

    const rowContainerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '10px 0',
    };

    const saveRecord = async () => {
        if (!Number.isInteger(Number(stockOutAmount)) || isNaN(Number(sellPrice))) {
            setError("Invalid Input");
            return;
        }
        if (Number(stockOutAmount) > currentStock) {
            setError("Stock out amount exceeds current stock");
            return;
        }

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
            const res = await axios.post('http://localhost:8080/stock-out-record', record);
            setError(`Stock-out record saved! Attributes: ${JSON.stringify(res.data)}`);
        } catch (error) {
            console.error("Error saving record:", error);
        }
    };

    return (
        <div>
            <div style={rowContainerStyle}>
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
            </div>
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
            <button style={buttonStyle} onClick={saveRecord}>Submit</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default StockOutForm;
