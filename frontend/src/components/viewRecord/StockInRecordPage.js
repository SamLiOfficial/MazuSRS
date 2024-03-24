// Import necessary modules from React and other libraries
import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; // Import DatePicker component from react-datepicker library
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS for DatePicker component
import axios from 'axios'; // Import axios library for making HTTP requests
import EditPopUpForStockIn from '/Users/samli/test/frontend/src/components/popUps/EditPopUpForStockIn.js'; // Import EditPopUpForStockIn component
import ConfirmationModal from '/Users/samli/test/frontend/src/components/popUps/ConfirmationModal.js'; // Import ConfirmationModal component and ensure the path is correct

// Define functional component StockInRecordPage
const StockInRecordPage = () => {
    // Define state variables using useState hook
    const [startDate, setStartDate] = useState(new Date()); // Initialize startDate state with current date
    const [endDate, setEndDate] = useState(new Date()); // Initialize endDate state with current date
    const [records, setRecords] = useState([]); // Initialize records state as an empty array
    const [showEditPopup, setShowEditPopup] = useState(false); // Initialize showEditPopup state as false
    const [currentRecord, setCurrentRecord] = useState(null); // Initialize currentRecord state as null
    const [showConfirmationModal, setShowConfirmationModal] = useState(false); // Initialize showConfirmationModal state as false
    const [deleteCandidateId, setDeleteCandidateId] = useState(null); // Initialize deleteCandidateId state as null

    // Define function to handle form submission
    const handleSubmit = async () => {
        try {
            // Send GET request to API endpoint to fetch records within specified date range
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/stock-in-statistics`, {
                // Provide parameters for the request including start and end dates
                params: {
                    startDate: startDate.toISOString().split('T')[0], // Convert startDate to ISO string format
                    endDate: endDate.toISOString().split('T')[0] // Convert endDate to ISO string format
                }
            });
            setRecords(response.data); // Set records state with response data
        } catch (error) {
            console.error('Error fetching records:', error); // Log error if request fails
        }
    };

    // Define function to initiate delete operation for a record
    const requestDelete = (recordId) => {
        setDeleteCandidateId(recordId); // Set deleteCandidateId state with recordId
        setShowConfirmationModal(true); // Set showConfirmationModal state to true to display confirmation modal
    };

    // Define function to handle deletion of a record
    const handleDelete = async () => {
        if (deleteCandidateId) {
            try {
                // Send DELETE request to API endpoint to delete record with specified ID
                await axios.delete(`${process.env.REACT_APP_API_URL}/stock-in-record/${deleteCandidateId}`);
                // Filter out deleted record from records array and update records state
                setRecords(records.filter(record => record.recordId !== deleteCandidateId));
                setShowConfirmationModal(false); // Hide confirmation modal
                setDeleteCandidateId(null); // Reset deleteCandidateId state
            } catch (error) {
                console.error('Error deleting record:', error); // Log error if deletion fails
            }
        }
    };

    // Define function to handle editing of a record
    const handleEdit = (record) => {
        setCurrentRecord(record); // Set currentRecord state with the selected record
        setShowEditPopup(true); // Set showEditPopup state to true to display edit popup
    };

    // Define function to handle saving edited record
    const handleSaveEdit = async (editedRecord) => {
        try {
            // Send PUT request to API endpoint to update record with edited data
            await axios.put(`${process.env.REACT_APP_API_URL}/stock-in-record/${editedRecord.recordId}`, editedRecord);
            // Update records state with the edited record
            setRecords(records.map(record => record.recordId === editedRecord.recordId ? editedRecord : record));
            setShowEditPopup(false); // Hide edit popup
            setCurrentRecord(null); // Reset currentRecord state
        } catch (error) {
            console.error('Error updating record:', error); // Log error if update fails
        }
    };

    // Define styles for date picker, buttons, labels, table, cells, and headers
    const datePickerStyle = {
        padding: '10px', // Add padding around the date picker
        margin: '10px', // Add margin around the date picker
        borderRadius: '5px', // Add border radius to the date picker
        border: '1px solid #ccc', // Add border to the date picker
        height: '40px' // Set height of the date picker
    };
    const firstDatePickerStyle = { ...datePickerStyle, marginRight: '20px' }; // Style for first date picker with additional margin
    const buttonStyle = { ...datePickerStyle, cursor: 'pointer', backgroundColor: '#d4ebf2', color: 'black', fontWeight: 'bold' }; // Style for buttons
    const labelStyle = { color: '#00008B', marginRight: '5px', fontWeight: 'bold' }; // Style for labels
    const tableStyle = { width: 'calc(100% - 80px)', margin: '20px 40px', borderCollapse: 'collapse', backgroundColor: '#d4ebf2', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }; // Style for table
    const cellStyle = { padding: '10px', borderBottom: '1px solid #ddd', color: 'black' }; // Style for table cells
    const headerStyle = { ...cellStyle, backgroundColor: '#00008B', color: 'white', textAlign: 'left' }; // Style for table headers

    // Render JSX for the StockInRecordPage component
    return (
        <div>
            {/* Display a heading for the Inventory Record Page with styling */}
            <h1 style={{ textAlign: 'center', color: '#00008B' }}>入库记录表</h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* Display labels and date pickers for selecting date range */}
                <label style={labelStyle}>开始日期</label>
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} style={firstDatePickerStyle} />
                <div style={{ width: '20px' }}></div>
                <label style={labelStyle}>结束日期</label>
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} style={datePickerStyle} />
                {/* Button to submit date range for fetching records */}
                <button onClick={handleSubmit} style={buttonStyle}>确认</button>
            </div>
            {/* Display table with stock in records if there are records */}
            {records.length > 0 && (
                <table style={tableStyle}>
                    <thead>
                    <tr>
                        {/* Display table headers */}
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
                    {/* Map through records array to display each record */}
                    {records.map(record => (
                        <tr key={record.recordId}>
                            {/* Display record details in table cells */}
                            <td style={cellStyle}>{record.date}</td>
                            <td style={cellStyle}>{record.itemId}</td>
                            <td style={cellStyle}>{record.itemName}</td>
                            <td style={cellStyle}>{record.stockInAmount}</td>
                            <td style={cellStyle}>${record.unitPrice.toFixed(2)}</td>
                            <td style={cellStyle}>${record.totalPrice.toFixed(2)}</td>
                            {/* Buttons to edit and delete each record */}
                            <td style={cellStyle}>
                                <button onClick={() => handleEdit(record)} style={buttonStyle}>修改</button>
                                <button onClick={() => requestDelete(record.recordId)} style={buttonStyle}>删除</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            {/* Display EditPopUpForStockIn component if showEditPopup state is true */}
            {showEditPopup && <EditPopUpForStockIn record={currentRecord} show={showEditPopup} onSave={handleSaveEdit} onClose={() => setShowEditPopup(false)} />}
            {/* Display ConfirmationModal component if showConfirmationModal state is true */}
            {showConfirmationModal && <ConfirmationModal message="确定要删除这条记录吗？" onConfirm={handleDelete} onClose={() => setShowConfirmationModal(false)} />}
        </div>
    );
};

// Export StockInRecordPage component as default
export default StockInRecordPage;
