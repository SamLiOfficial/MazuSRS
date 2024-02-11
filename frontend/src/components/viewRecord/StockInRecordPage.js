import React, { useState } from 'react'; // Import React and useState from 'react' library
import DatePicker from 'react-datepicker'; // Import DatePicker component
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker CSS
import axios from 'axios'; // Import axios for making HTTP requests

const StockInRecordPage = () => {
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

    const handleDelete = async (recordId) => {
        try {
            await axios.delete(`http://localhost:8080/stock-in-record/${recordId}`);
            setRecords(records.filter(record => record.recordId !== recordId));
        } catch (error) {
            console.error('Error deleting record:', error);
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

    // Style for the first date picker to add space before the "End date" label
    const firstDatePickerStyle = {
        ...datePickerStyle,
        marginRight: '20px' // Additional right margin for spacing
    };

    const buttonStyle = {
        ...datePickerStyle, // Apply date picker styles
        cursor: 'pointer',
        backgroundColor: '#d4ebf2',
        color: 'black',
        fontWeight: 'bold'
    };

    // Style for labels
    const labelStyle = {
        color: '#00008B', // Dark blue color
        marginRight: '5px', // Space before date picker
        fontWeight: 'bold' // Make label text bold
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
        color: 'white', // White text for headers
        textAlign: 'left'
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center', color: '#00008B' }}>入库记录表</h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <label style={labelStyle}>开始日期</label> {/* Label for start date */}
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} style={firstDatePickerStyle} />
                <div style={{ width: '20px' }}></div> {/* Space between the first date picker and the "End date" label */}
                <label style={labelStyle}>结束日期</label> {/* Label for end date */}
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} style={datePickerStyle} />
                <button onClick={handleSubmit} style={buttonStyle}>确认</button>
            </div>
            <table style={tableStyle}>
                <thead>
                <tr>
                    <th style={headerStyle}>日期</th>
                    <th style={headerStyle}>货品ID</th>
                    <th style={headerStyle}>名称</th>
                    <th style={headerStyle}>数量</th>
                    <th style={headerStyle}>单价</th>
                    <th style={headerStyle}>总价</th>
                    <th style={headerStyle}>修改</th>
                </tr>
                </thead>
                <tbody>
                {records.map(record => (
                    <tr key={record.recordId}>
                        <td style={cellStyle}>{record.date}</td>
                        <td style={cellStyle}>{record.itemId}</td>
                        <td style={cellStyle}>{record.itemName}</td>
                        <td style={cellStyle}>{record.stockInAmount}</td>
                        <td style={cellStyle}>${record.unitPrice.toFixed(2)}</td>
                        <td style={cellStyle}>${record.totalPrice.toFixed(2)}</td>
                        <td style={cellStyle}>
                            <button onClick={() => handleDelete(record.recordId)} style={buttonStyle}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default StockInRecordPage;
