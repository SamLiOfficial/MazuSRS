// Import necessary dependencies and components
import React, { useState, useEffect } from 'react'; // Import React, useState, and useEffect from 'react' library
import axios from 'axios'; // Import axios for making HTTP requests
import DatePicker from 'react-datepicker'; // Import DatePicker component
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker CSS

// Define the 'StockOutStatisticsOneItemPage' functional component
const StockOutStatisticsOneItemPage = () => {
    // Initialize state variables using 'useState'
    const [startDate, setStartDate] = useState(new Date()); // Initialize 'startDate' state with the current date
    const [endDate, setEndDate] = useState(new Date());     // Initialize 'endDate' state with the current date
    const [items, setItems] = useState([]);                  // Initialize 'items' state as an empty array
    const [inputValue, setInputValue] = useState('');        // Initialize 'inputValue' state as an empty string
    const [suggestions, setSuggestions] = useState([]);      // Initialize 'suggestions' state as an empty array
    const [selectedItemId, setSelectedItemId] = useState(''); // Initialize 'selectedItemId' state as an empty string
    const [summarizedData, setSummarizedData] = useState(null); // Initialize 'summarizedData' state as null
    const [showDropdown, setShowDropdown] = useState(false);  // Initialize 'showDropdown' state as false

    // Use 'useEffect' to fetch items data from an API when the component is mounted
    useEffect(() => {
        axios.get('http://localhost:8080/all-items') // Send a GET request to fetch all items
            .then(response => {
                // Sort and set the 'items' state with the response data
                setItems(response.data.sort((a, b) => a.formattedString.localeCompare(b.formattedString)));
            })
            .catch(error => {
                // Handle errors by logging them to the console
                console.error('Error fetching items:', error);
            });
    }, []); // The empty dependency array ensures this effect runs only once on component mount

    // Define a function to handle input changes
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);    // Update 'inputValue' state with the input value
        updateSuggestions(value); // Call 'updateSuggestions' function to update suggestion list
        setShowDropdown(true);   // Show the dropdown when input changes
    };

    // Define a function to handle arrow button click
    const handleArrowClick = () => {
        setShowDropdown(!showDropdown); // Toggle the 'showDropdown' state
        if (!showDropdown) {
            setSuggestions(items); // Set suggestions to all items when showing the dropdown
        }
    };

    // Define a function to update suggestions based on input value
    const updateSuggestions = (value) => {
        const filteredSuggestions = items.filter(item =>
            item.formattedString.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions); // Update 'suggestions' state with filtered suggestions
    };

    // Define a function to handle suggestion click
    const handleSuggestionClick = (itemId, formattedString) => {
        setInputValue(formattedString); // Set input value to the selected suggestion
        setSelectedItemId(itemId);     // Update 'selectedItemId' state
        setSuggestions([]);            // Clear suggestions
        setShowDropdown(false);        // Hide the dropdown
    };

    // Define a function to handle form submission
    const handleSubmit = () => {
        if (selectedItemId && startDate && endDate) {
            axios.get('http://localhost:8080/stock-out-summary-by-item', {
                params: {
                    startDate: startDate.toISOString().split('T')[0], // Format start date as YYYY-MM-DD
                    endDate: endDate.toISOString().split('T')[0],     // Format end date as YYYY-MM-DD
                    itemId: selectedItemId                            // Include selected item ID as a parameter
                }
            })
                .then(response => {
                    // Update 'summarizedData' state with the response data
                    setSummarizedData(response.data);
                })
                .catch(error => {
                    // Handle errors by logging them to the console
                    console.error('Error fetching summary:', error);
                });
        } else {
            // Display an alert if dates or item are not selected
            alert('Please select valid dates and an item.');
        }
    };

    // Render the component with JSX
    return (
        <div>
            {/* Display a heading for the Stock-Out Statistics page */}
            <h1>Stock-Out Statistics - One Item</h1>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                {/* Create DatePickers for selecting start and end dates */}
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} />

                <div style={{ position: 'relative' }}>
                    {/* Create an input field for searching items */}
                    <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Search for an item..." />

                    {/* Create a button for toggling the dropdown */}
                    <button onClick={handleArrowClick}>▼</button>

                    {/* Display the dropdown if 'showDropdown' is true */}
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

                {/* Create a button for submitting the form */}
                <button onClick={handleSubmit}>Submit</button>
            </div>

            {/* Display summarized data if 'summarizedData' is not null */}
            {summarizedData && (
                <div>
                    <h2>Summary for {summarizedData.itemName}</h2>
                    <p>From {startDate.toDateString()} to {endDate.toDateString()}</p>
                    <p>Total Stock-Out Amount: {summarizedData.sumStockOutAmount}</p>
                    <p>Total Sell Price: {summarizedData.sumSellPrice}</p>
                </div>
            )}
        </div>
    );
};

// Export the 'StockOutStatisticsOneItemPage' component as the default export
export default StockOutStatisticsOneItemPage;
