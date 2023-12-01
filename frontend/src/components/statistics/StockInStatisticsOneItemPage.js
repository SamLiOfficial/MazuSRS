// Import necessary dependencies and components
import React, { useState, useEffect } from 'react'; // Import React, useState, and useEffect from 'react' library
import axios from 'axios'; // Import axios for making HTTP requests
import DatePicker from 'react-datepicker'; // Import DatePicker component
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker CSS

// Define the 'StockInStatisticsOneItemPage' functional component
const StockInStatisticsOneItemPage = () => {
    // Initialize state variables using 'useState'
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState('');
    const [summarizedData, setSummarizedData] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    // Use 'useEffect' to fetch items data when the component is mounted
    useEffect(() => {
        axios.get('http://localhost:8080/all-items')
            .then(response => {
                // Set the 'items' state with sorted item data
                setItems(response.data.sort((a, b) => a.formattedString.localeCompare(b.formattedString)));
            })
            .catch(error => console.error('Error fetching items:', error));
    }, []);

    // Handle input change for item search
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        updateSuggestions(value);
        setShowDropdown(true);
    };

    // Handle arrow click to show/hide dropdown
    const handleArrowClick = () => {
        setShowDropdown(!showDropdown);
        if (!showDropdown) {
            setSuggestions(items);
        }
    };

    // Update item suggestions based on input value
    const updateSuggestions = (value) => {
        const filteredSuggestions = items.filter(item =>
            item.formattedString.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    };

    // Handle suggestion click to select an item
    const handleSuggestionClick = (itemId, formattedString) => {
        setInputValue(formattedString);
        setSelectedItemId(itemId);
        setSuggestions([]);
        setShowDropdown(false);
    };

    // Handle form submission to fetch summarized data
    const handleSubmit = () => {
        if (selectedItemId && startDate && endDate) {
            axios.get('http://localhost:8080/stock-in-summary-by-item', {
                params: {
                    startDate: startDate.toISOString().split('T')[0], // Format start date as YYYY-MM-DD
                    endDate: endDate.toISOString().split('T')[0],     // Format end date as YYYY-MM-DD
                    itemId: selectedItemId
                }
            })
                .then(response => {
                    // Set the 'summarizedData' state with the response data
                    setSummarizedData(response.data);
                })
                .catch(error => console.error('Error fetching summary:', error));
        } else {
            alert('Please select valid dates and an item.');
        }
    };

    // Render the component with JSX
    return (
        <div>
            {/* Display a heading for the Stock-In Statistics - One Item page */}
            <h1>Stock-In Statistics - One Item</h1>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                {/* DatePickers for selecting start and end dates */}
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} />

                {/* Input field for item search */}
                <div style={{ position: 'relative' }}>
                    <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Search for an item..." />
                    <button onClick={handleArrowClick}>▼</button>
                    {showDropdown && (
                        <div style={{ position: 'absolute', zIndex: 1, backgroundColor: 'white', border: '1px solid #ddd' }}>
                            {/* Display item suggestions in a dropdown */}
                            {suggestions.map(item => (
                                <div key={item.itemId} onClick={() => handleSuggestionClick(item.itemId, item.formattedString)}>
                                    {item.formattedString}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Button to submit the form */}
                <button onClick={handleSubmit}>Submit</button>
            </div>

            {/* Display summarized data if available */}
            {summarizedData && (
                <div>
                    <h2>Summary for {summarizedData.itemName}</h2>
                    <p>From {startDate.toDateString()} to {endDate.toDateString()}</p>
                    <p>Total Stock-In Amount: {summarizedData.sumStockInAmount}</p>
                    <p>Total Price: {summarizedData.sumTotalPrice}</p>
                </div>
            )}
        </div>
    );
};

// Export the 'StockInStatisticsOneItemPage' component as the default export
export default StockInStatisticsOneItemPage;
