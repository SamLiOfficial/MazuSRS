// src/components/ViewStockOutOneItemPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ViewStockOutOneItemPage = () => {
    // State variables to manage selected dates, items, input value, suggestions, selected item ID,
    // related records, and whether to show the dropdown
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState('');
    const [relatedRecords, setRelatedRecords] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        // Fetch all items from the server and set them in the 'items' state variable
        axios.get('http://localhost:8080/all-items')
            .then(response => {
                setItems(response.data.sort((a, b) => a.formattedString.localeCompare(b.formattedString)));
            })
            .catch(error => console.error('Error fetching items:', error));
    }, []);

    const handleInputChange = (e) => {
        // Handle changes in the input field and update suggestions accordingly
        const value = e.target.value;
        setInputValue(value);
        updateSuggestions(value);
        setShowDropdown(true); // Show dropdown when user types
    };

    const handleArrowClick = () => {
        // Toggle the display of the dropdown when the arrow button is clicked
        setShowDropdown(!showDropdown);
        if (!showDropdown) {
            setSuggestions(items); // Show all items when arrow button is clicked
        }
    };

    const updateSuggestions = (value) => {
        // Filter the items based on the input value and update suggestions
        const filteredSuggestions = items.filter(item =>
            item.formattedString.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    };

    const handleSuggestionClick = (itemId, formattedString) => {
        // Handle item suggestion selection, set the selected item, and clear the suggestions
        setInputValue(formattedString);
        setSelectedItemId(itemId);
        setSuggestions([]);
        setShowDropdown(false);
    };

    const handleSubmit = () => {
        // Handle form submission and fetch related records based on selected item and dates
        if (selectedItemId && startDate && endDate) {
            axios.get('http://localhost:8080/stock-out-record-by-item', {
                params: {
                    startDate: startDate.toISOString().split('T')[0],
                    endDate: endDate.toISOString().split('T')[0],
                    itemId: selectedItemId
                }
            })
                .then(response => {
                    setRelatedRecords(response.data);
                })
                .catch(error => console.error('Error fetching related records:', error));
        } else {
            // Display an alert if the selected dates or item are not valid
            alert('Please select valid dates and an item.');
        }
    };

    return (
        <div>
            <h1>View Stock Out Record - One Item</h1>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
                <div style={{ position: 'relative' }}>
                    <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Search for an item..." />
                    <button onClick={handleArrowClick}>▼</button>
                    {showDropdown && (
                        <div style={{ position: 'absolute', zIndex: 1, backgroundColor: 'white', border: '1px solid #ddd' }}>
                            {suggestions.map(item => (
                                <div key={item.itemId} onClick={() => handleSuggestionClick(item.itemId, item.formattedString)}>
                                    {item.formattedString}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Item ID</th>
                    <th>Item Name</th>
                    <th>Brand</th>
                    <th>Item Size</th>
                    <th>Unit</th>
                    <th>Stock Out Amount</th>
                    <th>Sell Price</th>
                    <th>Currency Unit</th>
                    <th>Note</th>
                </tr>
                </thead>
                <tbody>
                {relatedRecords.map(record => (
                    <tr key={record.recordId}>
                        <td>{record.date}</td>
                        <td>{record.itemId}</td>
                        <td>{record.itemName}</td>
                        <td>{record.brand}</td>
                        <td>{record.itemSize}</td>
                        <td>{record.unit}</td>
                        <td>{record.stockOutAmount}</td>
                        <td>${record.sellPrice.toFixed(2)}</td>
                        <td>{record.currencyUnit}</td>
                        <td>{record.note}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewStockOutOneItemPage; // Export the component as the default export
