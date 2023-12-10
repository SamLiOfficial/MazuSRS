import React, { useState } from 'react'; // Import necessary React modules

import axios from 'axios'; // Import Axios for making HTTP requests
import DatePicker from 'react-datepicker'; // Import DatePicker component
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker styles

const StockInStatistics = () => { // Define a functional React component called StockInStatistics
    const [startDate, setStartDate] = useState(new Date()); // Initialize state for start date
    const [endDate, setEndDate] = useState(new Date()); // Initialize state for end date
    const [summarizedData, setSummarizedData] = useState([]); // Initialize state for summarized data

    const handleSummarize = () => { // Define a function to handle data summarization
        axios.get('http://localhost:8080/summarize-stock-in', { // Send a GET request to summarize data
            params: {
                startDate: startDate.toISOString().split('T')[0], // Convert start date to ISO format
                endDate: endDate.toISOString().split('T')[0], // Convert end date to ISO format
            }
        })
            .then(response => { // Handle successful response
                setSummarizedData(response.data); // Update state with summarized data
            })
            .catch(error => { // Handle errors, if any
                console.error('Error fetching summary:', error); // Log the error to the console
            });
    };

    // Common style for DatePicker and Button
    const inputStyle = {
        padding: '10px', // Set padding for input elements
        margin: '5px', // Set margin for input elements
        borderRadius: '5px', // Apply rounded corners to input elements
        border: '1px solid #ddd', // Apply a border to input elements
    };

    // Style for the table
    const tableStyle = {
        width: 'calc(100% - 80px)', // Set table width with padding
        margin: '20px 40px', // Set margin with padding on both sides
        borderCollapse: 'collapse', // Collapse table borders
        backgroundColor: '#d4ebf2', // Set background color for the table
        borderRadius: '10px', // Apply rounded corners to the table
    };

    // Style for the table headers
    const headerStyle = {
        color: '#00008D', // Set text color for headers
        padding: '10px', // Set padding for headers
    };

    // Style for the table data cells
    const cellStyle = {
        color: 'black', // Set text color for content
        padding: '10px', // Set padding for cells
    };

    return (
        <div>
            <h1>Stock-In Statistics</h1> {/* Render a heading for the page */}

            <div>
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} style={inputStyle} /> {/* Render DatePicker for start date selection */}
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} style={inputStyle} /> {/* Render DatePicker for end date selection */}
                <button onClick={handleSummarize} style={inputStyle}>Summarize</button> {/* Render a button to trigger data summarization */}
            </div>

            {summarizedData.length > 0 && ( // Conditional rendering of the table if data is available
                <table style={tableStyle}>
                    <thead>
                    <tr>
                        <th style={headerStyle}>Item Name</th> {/* Render table header with the defined headerStyle */}
                        <th style={headerStyle}>Item Size</th>
                        <th style={headerStyle}>Unit</th>
                        <th style={headerStyle}>Item Type</th>
                        <th style={headerStyle}>Brand</th>
                        <th style={headerStyle}>Sum Stock In Amount</th>
                        <th style={headerStyle}>Sum Total Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {summarizedData.map((item, index) => ( // Map through 'summarizedData' array and render table rows
                        <tr key={index}>
                            <td style={cellStyle}>{item.itemName}</td> {/* Render table cell with data from 'summarizedData' */}
                            <td style={cellStyle}>{item.itemSize}</td>
                            <td style={cellStyle}>{item.unit}</td>
                            <td style={cellStyle}>{item.itemType}</td>
                            <td style={cellStyle}>{item.brand}</td>
                            <td style={cellStyle}>{item.sumStockInAmount}</td>
                            <td style={cellStyle}>{item.sumTotalPrice}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default StockInStatistics; // Export the StockInStatistics component for use in other parts of the application
