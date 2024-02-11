// Import React library and its useState hook for state management
import React, { useState } from 'react';

// Import DatePicker component from 'react-datepicker' library for selecting dates
import DatePicker from 'react-datepicker';

// Import default styling for the DatePicker component
import 'react-datepicker/dist/react-datepicker.css';

// Import axios for making HTTP requests
import axios from 'axios';

// Define the StockOutStatistics functional component
const StockOutStatistics = () => {
    // Initialize 'startDate' state with the current date
    const [startDate, setStartDate] = useState(new Date());

    // Initialize 'endDate' state with the current date
    const [endDate, setEndDate] = useState(new Date());

    // Initialize 'summarizedData' state as an empty array to store the data fetched from the server
    const [summarizedData, setSummarizedData] = useState([]);

    // Define an asynchronous function to handle data summarization
    const handleSummarize = async () => {
        try {
            // Perform an HTTP GET request to fetch summarized stock-out data
            const response = await axios.get('http://localhost:8080/summarize-stock-out', {
                params: {
                    startDate: startDate.toISOString().split('T')[0], // Format the startDate as YYYY-MM-DD
                    endDate: endDate.toISOString().split('T')[0]     // Format the endDate as YYYY-MM-DD
                }
            });
            // Update the 'summarizedData' state with the response data
            setSummarizedData(response.data);
        } catch (error) {
            // Log an error message to the console if the request fails
            console.error('Error fetching summary:', error);
        }
    };

    // Define styling for the DatePicker components
    const datePickerStyle = {
        padding: '10px',
        margin: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        height: '40px'
    };

    // Define styling for the first DatePicker, extending datePickerStyle
    const firstDatePickerStyle = {
        ...datePickerStyle, // Spread operator to include properties from datePickerStyle
        marginRight: '20px' // Additional right margin for the first DatePicker
    };

    // Define styling for the 'Summarize' button
    const buttonStyle = {
        ...datePickerStyle, // Include datePickerStyle properties for consistent design
        cursor: 'pointer',  // Change the cursor to indicate it's clickable
        backgroundColor: '#d4ebf2', // Light blue background color
        color: 'black',             // Text color
        fontWeight: 'bold'          // Bold font weight
    };

    // Define styling for the labels
    const labelStyle = {
        color: '#00008B', // Dark blue text color
        marginRight: '5px', // Right margin for spacing
        fontWeight: 'bold'  // Bold font weight for emphasis
    };

    // Define styling for the table
    const tableStyle = {
        width: 'calc(100% - 80px)', // Responsive width calculation
        margin: '20px 40px',        // Margins for spacing
        borderCollapse: 'collapse', // Collapses border for a clean look
        backgroundColor: '#d4ebf2', // Light blue background color for the table
        borderRadius: '10px',       // Rounded corners for aesthetics
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' // Box shadow for depth
    };

    // Define common cell styling for table cells
    const cellStyle = {
        padding: '10px',              // Padding inside cells
        borderBottom: '1px solid #ddd', // Bottom border for each cell
        color: 'black'                 // Text color
    };

    // Define header cell styling, extending cellStyle
    const headerStyle = {
        ...cellStyle,                  // Inherit cellStyle properties
        backgroundColor: '#00008B',    // Dark blue background color for headers
        color: 'white',                // White text color for contrast
        textAlign: 'left'              // Align text to the left
    };

    // JSX to render the component's UI
    return (
        <div>
            {/* Heading with center alignment and blue color */}
            <h1 style={{ textAlign: 'center', color: '#00008B' }}>出库统计</h1>
            {/* Container for date pickers and summarize button with flexbox styling */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* Start date label */}
                <label style={labelStyle}>开始日期</label>
                {/* DatePicker for selecting start date with styling */}
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} style={firstDatePickerStyle} />
                {/* Spacer div for layout */}
                <div style={{ width: '20px' }}></div>
                {/* End date label */}
                <label style={labelStyle}>结束日期</label>
                {/* DatePicker for selecting end date with styling */}
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} style={datePickerStyle} />
                {/* Button to trigger the data summarization process */}
                <button onClick={handleSummarize} style={buttonStyle}>确认</button>
            </div>

            {/* Table for displaying summarized data */}
            <table style={tableStyle}>
                {/* Table header */}
                <thead>
                <tr>
                    {/* Header cells with titles for each column */}
                    <th style={headerStyle}>货品名称</th>
                    <th style={headerStyle}>规格</th>
                    <th style={headerStyle}>单位</th>
                    <th style={headerStyle}>类别</th>
                    <th style={headerStyle}>品牌</th>
                    <th style={headerStyle}>总出库量</th>
                    <th style={headerStyle}>总价</th>
                </tr>
                </thead>
                {/* Table body */}
                <tbody>
                {/* Mapping each item in summarizedData to a table row */}
                {summarizedData.map((item, index) => (
                    <tr key={index}>
                        {/* Data cells for each property of the item */}
                        <td style={cellStyle}>{item.itemName}</td>
                        <td style={cellStyle}>{item.itemSize}</td>
                        <td style={cellStyle}>{item.unit}</td>
                        <td style={cellStyle}>{item.itemType}</td>
                        <td style={cellStyle}>{item.brand}</td>
                        <td style={cellStyle}>{item.sumStockOutAmount}</td>
                        <td style={cellStyle}>${item.sumSellPrice.toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

// Export the StockOutStatistics component for use in other parts of the application
export default StockOutStatistics;
