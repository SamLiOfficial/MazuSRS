// Import necessary modules from React and other libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker'; // Import DatePicker component
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker styles
import EditPopUpForStockIn from '/Users/samli/test/frontend/src/components/popUps/EditPopUpForStockIn.js'; // Adjust the import path as necessary
import ConfirmationModal from '/Users/samli/test/frontend/src/components/popUps/ConfirmationModal.js'; // Import ConfirmationModal component

// Define the ViewStockInOneItemPage functional component
const ViewStockInOneItemPage = () => {
    // Initialize state variables using the useState hook
    const [startDate, setStartDate] = useState(new Date()); // State for start date
    const [endDate, setEndDate] = useState(new Date()); // State for end date
    const [items, setItems] = useState([]); // State for items
    const [inputValue, setInputValue] = useState(''); // State for input value
    const [suggestions, setSuggestions] = useState([]); // State for suggestions
    const [selectedItemId, setSelectedItemId] = useState(''); // State for selected item ID
    const [relatedRecords, setRelatedRecords] = useState([]); // State for related records
    const [showDropdown, setShowDropdown] = useState(false); // State to show/hide dropdown
    const [showEditPopup, setShowEditPopup] = useState(false); // State to show/hide edit popup
    const [currentRecord, setCurrentRecord] = useState(null); // State for current record
    const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State to show/hide confirmation modal
    const [deleteCandidateId, setDeleteCandidateId] = useState(null); // State for delete candidate ID

    // useEffect hook to fetch items data from the API upon component mount
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/all-items`)
            .then(response => {
                setItems(response.data.sort((a, b) => a.formattedString.localeCompare(b.formattedString))); // Sort items alphabetically
            })
            .catch(error => console.error('Error fetching items:', error)); // Log error if fetching items fails
    }, []);

    // Function to handle input change in the search bar
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value); // Update input value state
        updateSuggestions(value); // Update suggestions based on input value
        setShowDropdown(true); // Show dropdown
    };

    // Function to handle arrow button click to toggle dropdown visibility
    const handleArrowClick = () => {
        setShowDropdown(!showDropdown); // Toggle dropdown visibility
        if (!showDropdown) {
            setSuggestions(items); // Show all items as suggestions
        }
    };

    // Function to update suggestions based on input value
    const updateSuggestions = (value) => {
        const filteredSuggestions = items.filter(item =>
            item.formattedString.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions); // Update suggestions based on filtered items
    };

    // Function to handle click on suggestion to select an item
    const handleSuggestionClick = (itemId, formattedString) => {
        setInputValue(formattedString); // Update input value with selected item
        setSelectedItemId(itemId); // Set selected item ID
        setSuggestions([]); // Clear suggestions
        setShowDropdown(false); // Hide dropdown
    };

    // Function to handle form submission
    const handleSubmit = () => {
        if (selectedItemId && startDate && endDate) {
            axios.get(`${process.env.REACT_APP_API_URL}/stock-in-record-by-item`, {
                params: {
                    startDate: startDate.toISOString().split('T')[0], // Format start date
                    endDate: endDate.toISOString().split('T')[0], // Format end date
                    itemId: selectedItemId // Pass selected item ID as parameter
                }
            })
                .then(response => {
                    setRelatedRecords(response.data); // Update related records with API response
                })
                .catch(error => console.error('Error fetching related records:', error)); // Log error if fetching related records fails
        } else {
            alert('Please select valid dates and an item.'); // Alert if dates or item are not selected
        }
    };

    // Function to handle edit button click
    const handleEdit = (record) => {
        setCurrentRecord(record); // Set current record for editing
        setShowEditPopup(true); // Show edit popup
    };

    // Function to handle saving edited record
    const handleSaveEdit = async (editedRecord) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/stock-in-record/${editedRecord.recordId}`, editedRecord); // Update record via API
            setRelatedRecords(relatedRecords.map(record => record.recordId === editedRecord.recordId ? editedRecord : record)); // Update related records
            setShowEditPopup(false); // Hide edit popup
            setCurrentRecord(null); // Reset current record
        } catch (error) {
            console.error('Error updating record:', error); // Log error if updating record fails
        }
    };

    // Function to request deletion (prepares and shows confirmation modal)
    const requestDelete = (recordId) => {
        setDeleteCandidateId(recordId); // Set record ID for deletion
        setShowConfirmationModal(true); // Show confirmation modal
    };

    // Function to handle deleting a record
    const handleDelete = async () => {
        if (deleteCandidateId) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/stock-in-record/${deleteCandidateId}`); // Delete record via API
                setRelatedRecords(relatedRecords.filter(record => record.recordId !== deleteCandidateId)); // Remove deleted record from related records
                setShowConfirmationModal(false); // Hide confirmation modal
                setDeleteCandidateId(null); // Reset delete candidate ID
            } catch (error) {
                console.error('Error deleting record:', error); // Log error if deleting record fails
            }
        }
    };

    // Styling for date picker, input, arrow button, and submit button
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

    // Return JSX for rendering the ViewStockInOneItemPage component
    return (
        <div>
            <h1 style={{ textAlign: 'center', color: '#00008B' }}>查询入库记录 - 单个货品</h1> {/* Display a heading for the Inventory Record Page with styling */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <label style={labelStyle}>开始日期</label> {/* Display label for start date */}
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} style={firstDatePickerStyle} /> {/* Display DatePicker for selecting start date */}
                <div style={{ width: '20px' }}></div> {/* Empty div for spacing */}
                <label style={labelStyle}>结束日期</label> {/* Display label for end date */}
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} style={datePickerStyle} /> {/* Display DatePicker for selecting end date */}
                <div style={{ width: '20px' }}></div> {/* Empty div for spacing */}
                <label style={labelStyle}>货品</label> {/* Display label for item search */}
                <div style={{ position: 'relative', width: '200px' }}>
                    {/* Wrapper div using flexbox to align items with no gap */}
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <input type="text" value={inputValue} onChange={handleInputChange} placeholder="搜索货品..." /> {/* Display input field for searching items */}
                        <button onClick={handleArrowClick}>▼</button> {/* Display arrow button to toggle dropdown visibility */}
                    </div>
                    {showDropdown && (
                        <div style={{ position: 'absolute', zIndex: 1, backgroundColor: 'white', border: '1px solid #ddd' }}>
                            {suggestions.map(item => (
                                <div key={item.itemId} onClick={() => handleSuggestionClick(item.itemId, item.formattedString)} style={cellStyle}>
                                    {item.formattedString}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <button onClick={handleSubmit} style={buttonStyle}>确认</button> {/* Display submit button */}
            </div>
            {relatedRecords.length > 0 && (
                <table style={tableStyle}>
                    <thead>
                    <tr>
                        <th style={headerStyle}>日期</th> {/* Display table header for date */}
                        <th style={headerStyle}>货品ID</th> {/* Display table header for item ID */}
                        <th style={headerStyle}>名称</th> {/* Display table header for item name */}
                        <th style={headerStyle}>入库数量</th> {/* Display table header for stock in quantity */}
                        <th style={headerStyle}>单价</th> {/* Display table header for unit price */}
                        <th style={headerStyle}>总价</th> {/* Display table header for total price */}
                        <th style={headerStyle}>操作</th> {/* Display table header for actions */}
                    </tr>
                    </thead>
                    <tbody>
                    {relatedRecords.map(record => (
                        <tr key={record.recordId}>
                            <td style={cellStyle}>{record.date}</td> {/* Display date record */}
                            <td style={cellStyle}>{record.itemId}</td> {/* Display item ID record */}
                            <td style={cellStyle}>{record.itemName}</td> {/* Display item name record */}
                            <td style={cellStyle}>{record.stockInAmount}</td> {/* Display stock in quantity record */}
                            <td style={cellStyle}>${record.unitPrice.toFixed(2)}</td> {/* Display unit price record */}
                            <td style={cellStyle}>${record.totalPrice.toFixed(2)}</td> {/* Display total price record */}
                            <td style={cellStyle}>
                                <button onClick={() => handleEdit(record)} style={buttonStyle}>修改</button> {/* Display edit button */}
                                <button onClick={() => requestDelete(record.recordId)} style={buttonStyle}>删除</button> {/* Display delete button */}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            {showEditPopup && (
                <EditPopUpForStockIn
                    record={currentRecord}
                    show={showEditPopup}
                    onSave={handleSaveEdit}
                    onClose={() => setShowEditPopup(false)}
                />
            )}
            {showConfirmationModal && <ConfirmationModal message="确定要删除这条记录吗？" onConfirm={handleDelete} onClose={() => setShowConfirmationModal(false)} />} {/* Display confirmation modal */}
        </div>
    );
};

// Export the ViewStockInOneItemPage component as default
export default ViewStockInOneItemPage;
