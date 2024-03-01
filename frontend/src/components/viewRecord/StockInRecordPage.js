// Import necessary modules from React and other libraries
import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; // Import DatePicker component from 'react-datepicker' library
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS for DatePicker component
import axios from 'axios'; // Import axios for making HTTP requests
import EditPopUpForStockIn from '/Users/samli/test/frontend/src/components/popUps/EditPopUpForStockIn.js'; // Adjust the import path as necessary

// Define the StockInRecordPage functional component
const StockInRecordPage = () => {
    // Define state variables using the useState hook
    const [startDate, setStartDate] = useState(new Date()); // State for start date
    const [endDate, setEndDate] = useState(new Date()); // State for end date
    const [records, setRecords] = useState([]); // State for stock in records
    const [showEditPopup, setShowEditPopup] = useState(false); // State for controlling the visibility of the edit popup
    const [currentRecord, setCurrentRecord] = useState(null); // State for the currently selected record for editing

    // Define function to handle form submission
    const handleSubmit = async () => {
        try {
            // Send GET request to fetch stock in statistics based on start and end dates
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/stock-in-statistics`, {
                params: {
                    startDate: startDate.toISOString().split('T')[0], // Format start date as ISO string
                    endDate: endDate.toISOString().split('T')[0] // Format end date as ISO string
                }
            });
            // Update records state with fetched data
            setRecords(response.data);
        } catch (error) {
            console.error('Error fetching records:', error); // Log error if fetching records fails
        }
    };

    // Define function to handle deletion of a record
    const handleDelete = async (recordId) => {
        try {
            // Send DELETE request to delete stock in record by record ID
            await axios.delete(`${process.env.REACT_APP_API_URL}/stock-in-record/${recordId}`);
            // Update records state by filtering out the deleted record
            setRecords(records.filter(record => record.recordId !== recordId));
        } catch (error) {
            console.error('Error deleting record:', error); // Log error if deletion fails
        }
    };

    // Define function to handle editing of a record
    const handleEdit = (record) => {
        // Set currentRecord state to the selected record for editing
        setCurrentRecord(record);
        // Show the edit popup
        setShowEditPopup(true);
    };

    // Define function to handle saving edited record
    const handleSaveEdit = async (editedRecord) => {
        try {
            // Send PUT request to update stock in record with edited data
            await axios.put(`${process.env.REACT_APP_API_URL}/stock-in-record/${editedRecord.recordId}`, editedRecord);
            // Update records state by replacing the edited record
            setRecords(records.map(record => record.recordId === editedRecord.recordId ? editedRecord : record));
            // Hide the edit popup
            setShowEditPopup(false);
            // Reset currentRecord state to null
            setCurrentRecord(null);
        } catch (error) {
            console.error('Error updating record:', error); // Log error if update fails
        }
    };

    // Define styles for various elements
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
    const tableStyle = {
        width: 'calc(100% - 80px)',
        margin: '20px 40px',
        borderCollapse: 'collapse',
        backgroundColor: '#d4ebf2',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
    };
    const cellStyle = {
        padding: '10px',
        borderBottom: '1px solid #ddd',
        color: 'black'
    };
    const headerStyle = {
        ...cellStyle,
        backgroundColor: '#00008B',
        color: 'white',
        textAlign: 'left'
    };

    // Return JSX for rendering the StockInRecordPage component
    return (
        <div>
            {/* Heading for the StockInRecordPage */}
            <h1 style={{ textAlign: 'center', color: '#00008B' }}>入库记录表</h1>
            {/* Form for selecting date range */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <label style={labelStyle}>开始日期</label>
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} style={firstDatePickerStyle} />
                <div style={{ width: '20px' }}></div>
                <label style={labelStyle}>结束日期</label>
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} style={datePickerStyle} />
                <button onClick={handleSubmit} style={buttonStyle}>确认</button>
            </div>
            {/* Table for displaying stock in records */}
            <table style={tableStyle}>
                <thead>
                <tr>
                    <th style={headerStyle}>日期</th>
                    <th style={headerStyle}>货品ID</th>
                    <th style={headerStyle}>名称</th>
                    <th style={headerStyle}>数量</th>
                    <th style={headerStyle}>单价</th>
                    <th style={headerStyle}>总价</th>
                    <th style={headerStyle}>操作</th>
                </tr>
                </thead>
                <tbody>
                {/* Mapping over records to render table rows */}
                {records.map(record => (
                    <tr key={record.recordId}>
                        <td style={cellStyle}>{record.date}</td>
                        <td style={cellStyle}>{record.itemId}</td>
                        <td style={cellStyle}>{record.itemName}</td>
                        <td style={cellStyle}>{record.stockInAmount}</td>
                        <td style={cellStyle}>${record.unitPrice.toFixed(2)}</td>
                        <td style={cellStyle}>${record.totalPrice.toFixed(2)}</td>
                        <td style={cellStyle}>
                            {/* Buttons for editing and deleting records */}
                            <button onClick={() => handleEdit(record)} style={buttonStyle}>Edit</button>
                            <button onClick={() => handleDelete(record.recordId)} style={buttonStyle}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {/* Edit popup for editing records */}
            {showEditPopup && (
                <EditPopUpForStockIn
                    record={currentRecord}
                    show={showEditPopup}
                    onSave={handleSaveEdit}
                    onClose={() => setShowEditPopup(false)}
                />
            )}
        </div>
    );
};

// Export the StockInRecordPage component as default
export default StockInRecordPage;
