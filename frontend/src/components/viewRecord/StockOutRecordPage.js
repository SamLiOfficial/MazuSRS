import React, { useState } from 'react'; // Import React and useState hook from React library
import DatePicker from 'react-datepicker'; // Import DatePicker component from react-datepicker library
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS styles for react-datepicker component
import axios from 'axios'; // Import axios library for making HTTP requests
import EditPopUpForStockOut from '/Users/samli/test/frontend/src/components/popUps/EditPopUpForStockOut.js'; // Adjust the import path as necessary for EditPopUpForStockOut component
import ConfirmationModal from '/Users/samli/test/frontend/src/components/popUps/ConfirmationModal.js'; // Adjust the import path as necessary for ConfirmationModal component

const StockOutRecordPage = () => { // Define functional component StockOutRecordPage
    const [startDate, setStartDate] = useState(new Date()); // Declare state variable startDate and function to update it using useState hook, initialized with current date
    const [endDate, setEndDate] = useState(new Date()); // Declare state variable endDate and function to update it using useState hook, initialized with current date
    const [records, setRecords] = useState([]); // Declare state variable records to store stock-out records and function to update it using useState hook, initialized as empty array
    const [showEditPopup, setShowEditPopup] = useState(false); // Declare state variable showEditPopup to manage visibility of edit popup and function to update it using useState hook, initialized as false
    const [currentRecord, setCurrentRecord] = useState(null); // Declare state variable currentRecord to store currently selected record and function to update it using useState hook, initialized as null
    const [showConfirmationModal, setShowConfirmationModal] = useState(false); // Declare state variable showConfirmationModal to manage visibility of confirmation modal and function to update it using useState hook, initialized as false
    const [deleteCandidateId, setDeleteCandidateId] = useState(null); // Declare state variable deleteCandidateId to store ID of record to be deleted and function to update it using useState hook, initialized as null

    const handleSubmit = async () => { // Define asynchronous function handleSubmit to handle form submission
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/stock-out-statistics`, { // Send GET request to server to fetch stock-out statistics
                params: {
                    startDate: startDate.toISOString().split('T')[0], // Convert start date to ISO string format and extract date part
                    endDate: endDate.toISOString().split('T')[0] // Convert end date to ISO string format and extract date part
                }
            });
            setRecords(response.data); // Update records state with data received from server response
        } catch (error) {
            console.error('Error fetching records:', error); // Log error if fetching records fails
        }
    };

    const requestDelete = (recordId) => { // Define function requestDelete to set deleteCandidateId and showConfirmationModal
        setDeleteCandidateId(recordId); // Set deleteCandidateId to ID of record to be deleted
        setShowConfirmationModal(true); // Set showConfirmationModal to true to show confirmation modal
    };

    const handleDeleteConfirmed = async () => { // Define asynchronous function handleDeleteConfirmed to handle deletion confirmation
        if (deleteCandidateId) { // Check if deleteCandidateId is not null
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/stock-out-record/${deleteCandidateId}`); // Send DELETE request to server to delete record
                setRecords(records.filter(record => record.recordId !== deleteCandidateId)); // Update records state by filtering out deleted record
                setShowConfirmationModal(false); // Hide confirmation modal
                setDeleteCandidateId(null); // Reset deleteCandidateId to null
            } catch (error) {
                console.error('Error deleting record:', error); // Log error if deleting record fails
            }
        }
    };

    const handleEdit = (record) => { // Define function handleEdit to set currentRecord and showEditPopup
        setCurrentRecord(record); // Set currentRecord to the record being edited
        setShowEditPopup(true); // Set showEditPopup to true to show edit popup
    };

    const handleSaveEdit = async (editedRecord) => { // Define asynchronous function handleSaveEdit to handle saving edited record
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/stock-out-record/${editedRecord.recordId}`, editedRecord); // Send PUT request to server to update record
            setRecords(records.map(record => record.recordId === editedRecord.recordId ? editedRecord : record)); // Update records state by replacing edited record
            setShowEditPopup(false); // Hide edit popup
            setCurrentRecord(null); // Reset currentRecord to null
        } catch (error) {
            console.error('Error updating record:', error); // Log error if updating record fails
        }
    };

    const datePickerStyle = { // Define styles for date picker
        padding: '10px', // Add padding
        margin: '10px', // Add margin
        borderRadius: '5px', // Add border radius
        border: '1px solid #ccc', // Add border
        height: '40px' // Set height
    };
    const firstDatePickerStyle = { ...datePickerStyle, marginRight: '20px' }; // Define styles for first date picker with additional right margin
    const buttonStyle = { // Define styles for buttons
        ...datePickerStyle, // Include date picker styles
        cursor: 'pointer', // Set cursor to pointer
        backgroundColor: '#d4ebf2', // Set background color
        color: 'black', // Set text color
        fontWeight: 'bold' // Set font weight
    };
    const labelStyle = { // Define styles for labels
        color: '#00008B', // Set text color
        marginRight: '5px', // Add right margin
        fontWeight: 'bold' // Set font weight
    };
    const tableStyle = { // Define styles for table
        width: 'calc(100% - 80px)', // Set table width
        margin: '20px 40px', // Add margin
        borderCollapse: 'collapse', // Collapse table borders
        backgroundColor: '#d4ebf2', // Set background color
        borderRadius: '10px', // Add border radius
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' // Add box shadow
    };
    const cellStyle = { // Define styles for table cells
        padding: '10px', // Add padding
        borderBottom: '1px solid #ddd', // Add bottom border
        color: 'black' // Set text color
    };
    const headerStyle = { // Define styles for table headers
        ...cellStyle, // Include cell styles
        backgroundColor: '#00008B', // Set background color
        color: 'white', // Set text color
        textAlign: 'left' // Set text alignment to left
    };

    return ( // Return JSX for component rendering
        <div>
            <h1 style={{ textAlign: 'center', color: '#00008B' }}>出库记录表</h1> {/* Display a heading for the Stock Out Record Page with styling */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> {/* Set styles for flex container */}
                <label style={labelStyle}>开始日期</label> {/* Display label for start date */}
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} style={firstDatePickerStyle} /> {/* Render DatePicker for selecting start date */}
                <div style={{ width: '20px' }}></div> {/* Create a spacer */}
                <label style={labelStyle}>结束日期</label> {/* Display label for end date */}
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} style={datePickerStyle} /> {/* Render DatePicker for selecting end date */}
                <button onClick={handleSubmit} style={buttonStyle}>确认</button> {/* Render button for form submission */}
            </div>
            {records.length > 0 && ( // Check if records array is not empty
                <table style={tableStyle}> {/* Render table for displaying records */}
                    <thead> {/* Table header */}
                    <tr> {/* Table row for header */}
                        <th style={headerStyle}>日期</th> {/* Table header for date */}
                        <th style={headerStyle}>货品ID</th> {/* Table header for item ID */}
                        <th style={headerStyle}>名称</th> {/* Table header for item name */}
                        <th style={headerStyle}>数量</th> {/* Table header for stock-out amount */}
                        <th style={headerStyle}>售价</th> {/* Table header for sell price */}
                        <th style={headerStyle}>总价</th> {/* Table header for total price */}
                        <th style={headerStyle}>操作</th> {/* Table header for actions */}
                    </tr>
                    </thead>
                    <tbody> {/* Table body */}
                    {records.map(record => ( // Map through records array to render table rows for each record
                        <tr key={record.recordId}> {/* Table row for each record */}
                            <td style={cellStyle}>{record.date}</td> {/* Table cell for date */}
                            <td style={cellStyle}>{record.itemId}</td> {/* Table cell for item ID */}
                            <td style={cellStyle}>{record.itemName}</td> {/* Table cell for item name */}
                            <td style={cellStyle}>{record.stockOutAmount}</td> {/* Table cell for stock-out amount */}
                            <td style={cellStyle}>${record.sellPrice.toFixed(2)}</td> {/* Table cell for sell price */}
                            <td style={cellStyle}>${(record.sellPrice * record.stockOutAmount).toFixed(2)}</td> {/* Table cell for total price */}
                            <td style={cellStyle}> {/* Table cell for actions */}
                                <button onClick={() => handleEdit(record)} style={buttonStyle}>修改</button> {/* Button to edit record */}
                                <button onClick={() => requestDelete(record.recordId)} style={buttonStyle}>删除</button> {/* Button to delete record */}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            {showEditPopup && ( // Check if showEditPopup is true
                <EditPopUpForStockOut // Render EditPopUpForStockOut component
                    record={currentRecord} // Pass currentRecord as prop
                    show={showEditPopup} // Pass showEditPopup as prop
                    onSave={handleSaveEdit} // Pass handleSaveEdit function as prop
                    onClose={() => setShowEditPopup(false)} // Pass function to close popup as prop
                />
            )}
            {showConfirmationModal && ( // Check if showConfirmationModal is true
                <ConfirmationModal // Render ConfirmationModal component
                    message="确定要删除这条记录吗？" // Pass deletion confirmation message as prop
                    onConfirm={handleDeleteConfirmed} // Pass function to handle deletion confirmation as prop
                    onClose={() => setShowConfirmationModal(false)} // Pass function to close modal as prop
                />
            )}
        </div> // Close main div element
    );
};

export default StockOutRecordPage; // Export StockOutRecordPage component as default
