import React, { useState } from 'react'; // Import React and useState from 'react' library
import DatePicker from 'react-datepicker'; // Import DatePicker component
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker CSS
import axios from 'axios'; // Import axios for making HTTP requests

const StockInRecordPage = () => {
    // Initialize state variables using 'useState'
    const [startDate, setStartDate] = useState(new Date()); // Initialize start date state
    const [endDate, setEndDate] = useState(new Date()); // Initialize end date state
    const [records, setRecords] = useState([]); // Initialize records state

    const handleSubmit = async () => {
        try {
            const response = await axios.get('http://localhost:8080/stock-in-statistics', {
                params: {
                    startDate: startDate.toISOString().split('T')[0], // Format start date as YYYY-MM-DD
                    endDate: endDate.toISOString().split('T')[0]     // Format end date as YYYY-MM-DD
                }
            });
            setRecords(response.data); // Set the 'records' state with the response data
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };

    // Styling for date picker and submit button
    const datePickerStyle = {
        padding: '10px',
        margin: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        height: '40px' // Increased height for better usability
    };

    const buttonStyle = {
        ...datePickerStyle, // Apply date picker styles
        cursor: 'pointer',
        backgroundColor: '#d4ebf2',
        color: 'black',
        fontWeight: 'bold'
    };

    // Styling for the table
    const tableStyle = {
        width: 'calc(100% - 80px)', // Full width minus padding on both sides
        margin: '20px 40px', // 40px horizontal margin (padding effect)
        borderCollapse: 'collapse',
        backgroundColor: '#d4ebf2', // Light blue background for the table
        borderRadius: '10px', // Rounded corners for the table
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' // Box shadow for a subtle 3D effect
    };

    // Styling for table cells
    const cellStyle = {
        padding: '10px',
        borderBottom: '1px solid #ddd',
        color: 'black' // Black text for content
    };

    // Styling for table headers
    const headerStyle = {
        ...cellStyle, // Apply cell style
        backgroundColor: '#00008B', // Dark blue background for headers
        color: 'white' // White text for headers
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center', color: '#00008B' }}>入库记录表</h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} style={datePickerStyle} />
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} style={datePickerStyle} />
                <button onClick={handleSubmit} style={buttonStyle}>Submit</button>
            </div>
            <table style={tableStyle}>
                <thead>
                <tr>
                    <th style={headerStyle}>日期</th>
                    <th style={headerStyle}>货品序号</th>
                    <th style={headerStyle}>名称</th>
                    <th style={headerStyle}>数量</th>
                    <th style={headerStyle}>单价</th>
                    <th style={headerStyle}>总价</th>
                </tr>
                </thead>
                <tbody>
                {records.map(record => (
                    <tr key={record.recordId}>
                        <td style={cellStyle}>{record.date}</td>
                        <td style={cellStyle}>{record.itemId}</td>
                        <td style={cellStyle}>{record.itemName}</td>
                        <td style={cellStyle}>{record.stockInAmount}</td>
                        <td style={cellStyle}>{record.unitPrice}</td>
                        <td style={cellStyle}>{record.totalPrice}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default StockInRecordPage;
