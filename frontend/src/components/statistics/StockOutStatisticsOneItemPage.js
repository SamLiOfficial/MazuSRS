import React, { useState, useEffect } from 'react';  // Import React and necessary hooks.
import axios from 'axios';  // Import Axios for making HTTP requests.
import DatePicker from 'react-datepicker';  // Import a date picker component.
import 'react-datepicker/dist/react-datepicker.css';  // Import styles for the date picker.

const StockOutStatisticsOneItemPage = () => {  // Define a functional component.
    const [startDate, setStartDate] = useState(new Date());  // Initialize a state variable for start date.
    const [endDate, setEndDate] = useState(new Date());  // Initialize a state variable for end date.
    const [items, setItems] = useState([]);  // Initialize a state variable for items.
    const [inputValue, setInputValue] = useState('');  // Initialize a state variable for input value.
    const [suggestions, setSuggestions] = useState([]);  // Initialize a state variable for suggestions.
    const [selectedItemId, setSelectedItemId] = useState('');  // Initialize a state variable for selected item ID.
    const [summarizedData, setSummarizedData] = useState(null);  // Initialize a state variable for summarized data.
    const [showDropdown, setShowDropdown] = useState(false);  // Initialize a state variable for dropdown visibility.

    useEffect(() => {
        axios.get('http://localhost:8080/all-items')  // Make a GET request to fetch all items.
            .then(response => {
                setItems(response.data.sort((a, b) => a.formattedString.localeCompare(b.formattedString)));  // Set the items state with sorted data.
            })
            .catch(error => console.error('Error fetching items:', error));  // Handle errors if any.
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;  // Get the input value from the event.
        setInputValue(value);  // Update the input value state.
        updateSuggestions(value);  // Call a function to update suggestions based on the input value.
        setShowDropdown(true);  // Show the dropdown.
    };

    const handleArrowClick = () => {
        setShowDropdown(!showDropdown);  // Toggle the dropdown visibility.
        if (!showDropdown) {
            setSuggestions(items);  // Set suggestions to all items when opening the dropdown.
        }
    };

    const updateSuggestions = (value) => {
        const filteredSuggestions = items.filter(item =>
            item.formattedString.toLowerCase().includes(value.toLowerCase())
        );  // Filter items based on the input value.
        setSuggestions(filteredSuggestions);  // Update the suggestions state.
    };

    const handleSuggestionClick = (itemId, formattedString) => {
        setInputValue(formattedString);  // Set the input value to the clicked suggestion.
        setSelectedItemId(itemId);  // Set the selected item ID.
        setSuggestions([]);  // Clear suggestions.
        setShowDropdown(false);  // Hide the dropdown.
    };

    const handleSubmit = () => {
        if (selectedItemId && startDate && endDate) {
            axios.get('http://localhost:8080/stock-out-summary-by-item', {
                params: {
                    startDate: startDate.toISOString().split('T')[0],  // Format the start date.
                    endDate: endDate.toISOString().split('T')[0],  // Format the end date.
                    itemId: selectedItemId  // Include the selected item ID.
                }
            })
                .then(response => {
                    setSummarizedData(response.data);  // Set summarized data based on the response.
                })
                .catch(error => console.error('Error fetching summary:', error));  // Handle errors if any.
        } else {
            alert('Please select valid dates and an item.');  // Show an alert if required fields are missing.
        }
    };

    // Styling
    const pageStyle = {  // Define styles for the page.
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        maxWidth: '100vw',
        boxSizing: 'border-box'
    };

    const formStyle = {  // Define styles for the form.
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        margin: '20px 0'
    };

    const datePickerStyle = {  // Define styles for date pickers.
        padding: '10px',
        margin: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        height: '40px'
    };

    const firstDatePickerStyle = {
        ...datePickerStyle,
        marginRight: '20px'
    };

    const dropdownStyle = {  // Define styles for the dropdown.
        position: 'absolute',
        zIndex: 1,
        backgroundColor: 'white',
        border: '1px solid #ddd',
        width: 'calc(100% - 22px)',  // Adjusted for padding and border.
        boxSizing: 'border-box',
        maxHeight: '200px',
        overflowY: 'auto',
        marginTop: '2px',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
    };

    const buttonStyle = {
        ...datePickerStyle,
        cursor: 'pointer',
        backgroundColor: '#d4ebf2',
        color: 'black',
        fontWeight: 'bold'
    };

    const labelStyle = {
        color: '#00008B',
        marginRight: '5px',
        fontWeight: 'bold'
    };

    const summaryStyle = {  // Define styles for the summary.
        padding: '20px',
        margin: '20px 0',
        borderRadius: '5px',
        border: '1px solid #d4ebf2',
        backgroundColor: '#f7f7f7',
        width: '100%',
        maxWidth: '600px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        boxSizing: 'border-box'
    };

    const summaryTitleStyle = {
        fontSize: '24px',
        color: '#333',
        margin: '0 0 10px 0',
        textAlign: 'center'
    };

    const summaryDetailStyle = {
        fontSize: '16px',
        color: '#000',
        margin: '5px 0',
        textAlign: 'center'
    };

    const suggestionItemStyle = {  // Define styles for suggestion items.
        padding: '10px',
        borderBottom: '1px solid #ddd',
        cursor: 'pointer',
        backgroundColor: '#fff',
        ':hover': {
            backgroundColor: '#f2f2f2'
        }
    };

    return (
        <div style={pageStyle}>
            {/* Display a heading for the Stock-Out Statistics page with styling */}
            <h1 style={{ textAlign: 'center', color: '#00008B' }}>出库统计 - 单个货品</h1>
            <div style={formStyle}>
                <label style={labelStyle}>开始日期</label>
                {/* Create a date picker for selecting the start date */}
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} style={firstDatePickerStyle} />
                <div style={{ width: '20px' }}></div>
                <label style={labelStyle}>结束日期</label>
                {/* Create a date picker for selecting the end date */}
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} style={datePickerStyle} />
                <div style={{ width: '20px' }}></div>
                <label style={labelStyle}>货品</label>
                <div style={{ position: 'relative', width: '200px' }}>
                    {/* Create an input field for searching items */}
                    <input type="text" value={inputValue} onChange={handleInputChange} placeholder="搜索货品..." />
                    {/* Create a button to toggle the item dropdown */}
                    <button onClick={handleArrowClick} >▼</button>
                    {/* Display item suggestions when the dropdown is shown */}
                    {showDropdown && (
                        <div style={dropdownStyle}>
                            {/* Map and display item suggestions */}
                            {suggestions.map(item => (
                                <div
                                    key={item.itemId}
                                    onClick={() => handleSuggestionClick(item.itemId, item.formattedString)}
                                    style={suggestionItemStyle}
                                >
                                    {item.formattedString}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {/* Create a button to submit the form */}
                <button onClick={handleSubmit} style={buttonStyle}>确认</button>
            </div>
            {/* Display summarized data when available */}
            {summarizedData && (
                <div style={summaryStyle}>
                    {/* Display the item name in the summary */}
                    <h2 style={summaryTitleStyle}>{summarizedData.itemName} 统计报告</h2>
                    {/* Display the selected date range */}
                    <p style={summaryDetailStyle}>从 {startDate.toISOString().split('T')[0]} 到 {endDate.toISOString().split('T')[0]}</p>
                    {/* Display the total stock-out amount */}
                    <p style={summaryDetailStyle}>总出库量: {summarizedData.sumStockOutAmount}</p>
                    {/* Display the total sell price */}
                    <p style={summaryDetailStyle}>总价: ${summarizedData.sumSellPrice.toFixed(2)} CAD</p>
                </div>
            )}
        </div>
    );
};

export default StockOutStatisticsOneItemPage;
