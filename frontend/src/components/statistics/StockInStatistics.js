// Import React and useState hook from the 'react' library for component and state management
import React, { useState } from 'react';

// Import DatePicker component from 'react-datepicker' library for a date picking interface
import DatePicker from 'react-datepicker';

// Import default CSS for the DatePicker component for styling
import 'react-datepicker/dist/react-datepicker.css';

// Import axios, a promise-based HTTP client, for making requests to servers
import axios from 'axios';

// Define the StockInStatistics functional component
const StockInStatistics = () => {
    // useState hook to manage startDate state, initialized with the current date
    const [startDate, setStartDate] = useState(new Date());

    // useState hook to manage endDate state, initialized with the current date
    const [endDate, setEndDate] = useState(new Date());

    // useState hook to manage the summarizedData state, initialized as an empty array
    const [summarizedData, setSummarizedData] = useState([]);

    // Async function handleSummarize to fetch data based on selected dates
    const handleSummarize = async () => {
        try {
            // Making a GET request using axios to the specified URL with startDate and endDate as parameters
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/summarize-stock-in`, {
                params: {
                    startDate: startDate.toISOString().split('T')[0], // Formatting startDate to YYYY-MM-DD
                    endDate: endDate.toISOString().split('T')[0]     // Formatting endDate to YYYY-MM-DD
                }
            });
            setSummarizedData(response.data); // Updating the summarizedData state with the fetched data
        } catch (error) {
            // Logging any errors to the console
            console.error('Error fetching summary:', error);
        }
    };

    // Styling for the DatePicker components
    const datePickerStyle = {
        padding: '10px',
        margin: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        height: '40px'
    };

    // Additional styling for the first DatePicker, extending datePickerStyle
    const firstDatePickerStyle = {
        ...datePickerStyle,
        marginRight: '20px'
    };

    // Styling for the summarize button
    const buttonStyle = {
        ...datePickerStyle,
        cursor: 'pointer', // Changing cursor to pointer to indicate it's clickable
        backgroundColor: '#d4ebf2', // Light blue background color
        color: 'black', // Text color
        fontWeight: 'bold' // Bold text
    };

    // Styling for labels (start date and end date)
    const labelStyle = {
        color: '#00008B', // Dark blue text color
        marginRight: '5px', // Right margin for spacing
        fontWeight: 'bold' // Bold text
    };

    // Styling for the data table
    const tableStyle = {
        width: 'calc(100% - 80px)', // Table width calculation for responsive design
        margin: '20px 40px', // Margins for spacing
        borderCollapse: 'collapse', // Collapsing borders for a clean table look
        backgroundColor: '#d4ebf2', // Light blue background color
        borderRadius: '10px', // Rounded corners
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' // Box shadow for aesthetics
    };

    // Common cell styling for the table
    const cellStyle = {
        padding: '10px', // Padding for cell content
        borderBottom: '1px solid #ddd', // Bottom border for each cell
        color: 'black' // Text color
    };

    // Header cell styling, extending the common cellStyle
    const headerStyle = {
        ...cellStyle, // Inheriting common cell styling
        backgroundColor: '#00008B', // Dark blue background color for headers
        color: 'white', // White text color for contrast
        textAlign: 'left' // Aligning text to the left
    };

    // JSX to render the component UI
    return (
        <div>
            {/* Display a heading for the Inventory Record Page with styling */}
            <h1 style={{ textAlign: 'center', color: '#00008B' }}>入库统计</h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* Label for start date with styling */}
                <label style={labelStyle}>开始日期</label>
                {/* DatePicker for selecting start date with styling */}
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} style={firstDatePickerStyle} />
                {/* Spacer div for layout */}
                <div style={{ width: '20px' }}></div>
                {/* Label for end date with styling */}
                <label style={labelStyle}>结束日期</label>
                {/* DatePicker for selecting end date with styling */}
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} style={datePickerStyle} />
                {/* Button to trigger data summarization with styling */}
                <button onClick={handleSummarize} style={buttonStyle}>确认</button>
            </div>

            {/* Table to display the summarized data */}
            {summarizedData.length > 0 && (
                <table style={tableStyle}>
                    <thead>
                    <tr>
                        <th style={headerStyle}>货品名称</th>
                        <th style={headerStyle}>规格</th>
                        <th style={headerStyle}>单位</th>
                        <th style={headerStyle}>类别</th>
                        <th style={headerStyle}>品牌</th>
                        <th style={headerStyle}>总入库量</th>
                        <th style={headerStyle}>总价</th>
                    </tr>
                    </thead>
                    <tbody>
                    {summarizedData.map((item, index) => (
                        <tr key={index}>
                            <td style={cellStyle}>{item.itemName}</td>
                            <td style={cellStyle}>{item.itemSize}</td>
                            <td style={cellStyle}>{item.unit}</td>
                            <td style={cellStyle}>{item.itemType}</td>
                            <td style={cellStyle}>{item.brand}</td>
                            <td style={cellStyle}>{item.sumStockInAmount}</td>
                            <td style={cellStyle}>${item.sumTotalPrice.toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

// Exporting the StockInStatistics component for use in other parts of the application
export default StockInStatistics;
