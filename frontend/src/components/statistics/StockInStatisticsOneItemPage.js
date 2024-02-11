// Import React, useState, and useEffect hooks from the 'react' library
import React, { useState, useEffect } from 'react';

// Import axios, a library for making HTTP requests
import axios from 'axios';

// Import DatePicker component for date selection
import DatePicker from 'react-datepicker';

// Import CSS for DatePicker component for default styling
import 'react-datepicker/dist/react-datepicker.css';

// Define the StockInStatisticsOneItemPage functional component
const StockInStatisticsOneItemPage = () => {
    // useState hooks for managing component states
    const [startDate, setStartDate] = useState(new Date()); // State for start date
    const [endDate, setEndDate] = useState(new Date()); // State for end date
    const [items, setItems] = useState([]); // State for storing items fetched from server
    const [inputValue, setInputValue] = useState(''); // State for input value in the search box
    const [suggestions, setSuggestions] = useState([]); // State for search suggestions
    const [selectedItemId, setSelectedItemId] = useState(''); // State for storing selected item ID
    const [summarizedData, setSummarizedData] = useState(null); // State for storing summarized data
    const [showDropdown, setShowDropdown] = useState(false); // State to toggle visibility of dropdown

    // useEffect hook to fetch items from the server when the component mounts
    useEffect(() => {
        axios.get('http://localhost:8080/all-items') // HTTP GET request to fetch all items
            .then(response => {
                // Sorting the fetched items and updating the items state
                setItems(response.data.sort((a, b) => a.formattedString.localeCompare(b.formattedString)));
            })
            .catch(error => console.error('Error fetching items:', error)); // Logging error to console if request fails
    }, []);

    // Function to handle changes in the search input field
    const handleInputChange = (e) => {
        const value = e.target.value; // Getting the current value of the input field
        setInputValue(value); // Updating the inputValue state
        updateSuggestions(value); // Calling function to update suggestions based on the input value
        setShowDropdown(true); // Showing the suggestions dropdown
    };

    // Function to handle clicks on the arrow button to toggle the dropdown
    const handleArrowClick = () => {
        setShowDropdown(!showDropdown); // Toggling the visibility of the dropdown
        if (!showDropdown) {
            setSuggestions(items); // Setting suggestions to all items if dropdown is being opened
        }
    };

    // Function to update suggestions based on input value
    const updateSuggestions = (value) => {
        const filteredSuggestions = items.filter(item =>
            item.formattedString.toLowerCase().includes(value.toLowerCase()) // Filtering items based on the input value
        );
        setSuggestions(filteredSuggestions); // Updating the suggestions state
    };

    // Function to handle clicks on a suggestion item
    const handleSuggestionClick = (itemId, formattedString) => {
        setInputValue(formattedString); // Setting the input value to the selected item's formatted string
        setSelectedItemId(itemId); // Updating the selectedItemId state
        setSuggestions([]); // Clearing the suggestions
        setShowDropdown(false); // Hiding the dropdown
    };

    // Function to handle the submission of the form
    const handleSubmit = () => {
        if (selectedItemId && startDate && endDate) { // Checking if an item is selected and dates are valid
            axios.get('http://localhost:8080/stock-in-summary-by-item', { // HTTP GET request with parameters
                params: {
                    startDate: startDate.toISOString().split('T')[0], // Formatting startDate to YYYY-MM-DD
                    endDate: endDate.toISOString().split('T')[0], // Formatting endDate to YYYY-MM-DD
                    itemId: selectedItemId // Adding selected item ID as a parameter
                }
            })
                .then(response => {
                    setSummarizedData(response.data); // Updating summarizedData state with response data
                })
                .catch(error => console.error('Error fetching summary:', error)); // Logging error to console if request fails
        } else {
            alert('Please select valid dates and an item.'); // Alerting if dates or item are not valid
        }
    };

    // Styling objects for various elements of the component
    const pageStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        maxWidth: '100vw',
        boxSizing: 'border-box'
    };

    const formStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        margin: '20px 0'
    };

    const datePickerStyle = {
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

    const dropdownStyle = {
        position: 'absolute',
        zIndex: 1,
        backgroundColor: 'white',
        border: '1px solid #ddd',
        width: 'calc(100% - 22px)',
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

    const summaryStyle = {
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

    const suggestionItemStyle = {
        padding: '10px',
        borderBottom: '1px solid #ddd',
        cursor: 'pointer',
        backgroundColor: '#fff',
        ':hover': {
            backgroundColor: '#f2f2f2'
        }
    };

    // JSX to render the component UI
    return (
        <div style={pageStyle}>
            {/* Display a heading for the page with styling */}
            <h1 style={{ textAlign: 'center', color: '#00008B' }}>入库统计 - 单个货品</h1>
            <div style={formStyle}>
                {/* Label and DatePicker for selecting start date */}
                <label style={labelStyle}>开始日期</label>
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} style={firstDatePickerStyle} />
                <div style={{ width: '20px' }}></div>
                {/* Label and DatePicker for selecting end date */}
                <label style={labelStyle}>结束日期</label>
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} style={datePickerStyle} />
                <div style={{ width: '20px' }}></div>
                {/* Label for item input */}
                <label style={labelStyle}>货品</label>
                {/* Input field for item search */}
                <div style={{ position: 'relative', width: '200px' }}>
                    <input type="text" value={inputValue} onChange={handleInputChange} placeholder="搜索货品..."  />
                    <button onClick={handleArrowClick} >▼</button>
                    {/* Dropdown for suggestions */}
                    {showDropdown && (
                        <div style={dropdownStyle}>
                            {/* Mapping suggestions to dropdown items */}
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
                {/* Button to submit the form */}
                <button onClick={handleSubmit} style={buttonStyle}>确认</button>
            </div>
            {/* Conditional rendering of summary details */}
            {summarizedData && (
                <div style={summaryStyle}>
                    {/* Title and details of the summary */}
                    <h2 style={summaryTitleStyle}>{summarizedData.itemName} 统计报告</h2>
                    <p style={summaryDetailStyle}>从 {startDate.toISOString().split('T')[0]} 到 {endDate.toISOString().split('T')[0]}</p>
                    <p style={summaryDetailStyle}>总入库数量: {summarizedData.sumStockInAmount}</p>
                    <p style={summaryDetailStyle}>总价: ${summarizedData.sumTotalPrice.toFixed(2)} CAD</p>
                </div>
            )}
        </div>
    );
};

// Export the StockInStatisticsOneItemPage component for use in other parts of the application
export default StockInStatisticsOneItemPage;
