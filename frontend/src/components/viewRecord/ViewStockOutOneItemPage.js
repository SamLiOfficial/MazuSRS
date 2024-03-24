// Import necessary modules and components from React, axios, and external libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import EditPopUpForStockOut from '/Users/samli/test/frontend/src/components/popUps/EditPopUpForStockOut.js'; // Import for EditPopUpForStockOut component
import ConfirmationModal from '/Users/samli/test/frontend/src/components/popUps/ConfirmationModal.js'; // Import for ConfirmationModal component

// Define the ViewStockOutOneItemPage functional component
const ViewStockOutOneItemPage = () => {
    // Declare state variables using useState hooks
    const [startDate, setStartDate] = useState(new Date()); // State for start date
    const [endDate, setEndDate] = useState(new Date()); // State for end date
    const [items, setItems] = useState([]); // State for items
    const [inputValue, setInputValue] = useState(''); // State for input value
    const [suggestions, setSuggestions] = useState([]); // State for suggestions
    const [selectedItemId, setSelectedItemId] = useState(''); // State for selected item ID
    const [relatedRecords, setRelatedRecords] = useState([]); // State for related records
    const [showDropdown, setShowDropdown] = useState(false); // State for showing dropdown
    const [showEditPopup, setShowEditPopup] = useState(false); // State for showing edit popup
    const [currentRecord, setCurrentRecord] = useState(null); // State for current record
    const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State for showing confirmation modal
    const [deleteCandidateId, setDeleteCandidateId] = useState(null); // State for tracking ID of record to delete

    // Effect hook to fetch items data when component mounts
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/all-items`)
            .then(response => {
                setItems(response.data.sort((a, b) => a.formattedString.localeCompare(b.formattedString))); // Set sorted items data
            })
            .catch(error => console.error('Error fetching items:', error)); // Log error if fetching items fails
    }, []);

    // Function to handle input change event
    const handleInputChange = (e) => {
        const value = e.target.value; // Get input value
        setInputValue(value); // Update input value state
        updateSuggestions(value); // Call function to update suggestions based on input value
        setShowDropdown(true); // Show dropdown
    };

    // Function to handle arrow click event
    const handleArrowClick = () => {
        setShowDropdown(!showDropdown); // Toggle dropdown visibility
        if (!showDropdown) {
            setSuggestions(items); // Set suggestions to items if dropdown is not shown
        }
    };

    // Function to update suggestions based on input value
    const updateSuggestions = (value) => {
        const filteredSuggestions = items.filter(item =>
            item.formattedString.toLowerCase().includes(value.toLowerCase())
        ); // Filter items based on input value
        setSuggestions(filteredSuggestions); // Set filtered suggestions
    };

    // Function to handle suggestion click event
    const handleSuggestionClick = (itemId, formattedString) => {
        setInputValue(formattedString); // Update input value with selected suggestion
        setSelectedItemId(itemId); // Set selected item ID
        setShowDropdown(false); // Hide dropdown
    };

    // Function to handle form submission
    const handleSubmit = () => {
        if (selectedItemId && startDate && endDate) {
            axios.get(`${process.env.REACT_APP_API_URL}/stock-out-record-by-item`, {
                params: {
                    startDate: startDate.toISOString().split('T')[0], // Format start date
                    endDate: endDate.toISOString().split('T')[0], // Format end date
                    itemId: selectedItemId // Pass selected item ID
                }
            })
                .then(response => {
                    setRelatedRecords(response.data); // Set related records data
                })
                .catch(error => console.error('Error fetching related records:', error)); // Log error if fetching related records fails
        } else {
            alert('Please select valid dates and an item.'); // Alert user if dates or item are not selected
        }
    };

    // Function to handle edit button click event
    const handleEdit = (record) => {
        setCurrentRecord(record); // Set current record to edit
        setShowEditPopup(true); // Show edit popup
    };

    // Function to handle save edit event
    const handleSaveEdit = async (editedRecord) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/stock-out-record/${editedRecord.recordId}`, editedRecord); // Update record on the server
            setRelatedRecords(relatedRecords.map(record => record.recordId === editedRecord.recordId ? editedRecord : record)); // Update related records state with edited record
            setShowEditPopup(false); // Hide edit popup
            setCurrentRecord(null); // Reset current record
        } catch (error) {
            console.error('Error updating record:', error); // Log error if updating record fails
        }
    };

    // Function to request delete operation
    const requestDelete = (recordId) => {
        setDeleteCandidateId(recordId); // Set record ID to delete
        setShowConfirmationModal(true); // Show confirmation modal
    };

    // Function to handle confirmed deletion
    const handleDelete = async () => {
        if (deleteCandidateId) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/stock-out-record/${deleteCandidateId}`); // Delete record on the server
                setRelatedRecords(relatedRecords.filter(record => record.recordId !== deleteCandidateId)); // Remove deleted record from related records
                setShowConfirmationModal(false); // Hide confirmation modal
                setDeleteCandidateId(null); // Reset delete candidate ID
            } catch (error) {
                console.error('Error deleting record:', error); // Log error if deleting record fails
            }
        }
    };

    // Styling variables for date picker, input, button, table, and cells (unchanged)
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

    return (
        <div>
            {/* Display a heading for the ViewStockOutOneItemPage component */}
            <h1 style={{ textAlign: 'center', color: '#00008B' }}>查询出库记录 - 单个货品</h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* Label and date picker for start date */}
                <label style={labelStyle}>开始日期</label>
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} style={firstDatePickerStyle} />
                <div style={{ width: '20px' }}></div>
                {/* Label and date picker for end date */}
                <label style={labelStyle}>结束日期</label>
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} style={datePickerStyle} />
                {/* Label, input, dropdown, and submit button for item selection */}
                <div style={{ width: '20px' }}></div>
                <label style={labelStyle}>货品</label>
                <div style={{ position: 'relative', width: '200px' }}>
                    <input type="text" value={inputValue} onChange={handleInputChange} placeholder="搜索货品..." />
                    <button onClick={handleArrowClick}>▼</button>
                    {showDropdown && (
                        <div style={{ position: 'absolute', zIndex: 1, backgroundColor: 'white', border: '1px solid #ddd' }}>
                            {/* Display suggestions based on input value */}
                            {suggestions.map(item => (
                                <div key={item.itemId} onClick={() => handleSuggestionClick(item.itemId, item.formattedString)} style={cellStyle}>
                                    {item.formattedString}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <button onClick={handleSubmit} style={buttonStyle}>确认</button>
            </div>

            {/* Table to display related records */}
            {relatedRecords.length > 0 && (
                <table style={tableStyle}>
                    <thead>
                    <tr>
                        <th style={headerStyle}>日期</th> {/* Display a table header for the date */}
                        <th style={headerStyle}>货品ID</th> {/* Display a table header for the product ID */}
                        <th style={headerStyle}>名称</th> {/* Display a table header for the name */}
                        <th style={headerStyle}>品牌</th> {/* Display a table header for the brand */}
                        <th style={headerStyle}>规格</th> {/* Display a table header for the specifications */}
                        <th style={headerStyle}>单位</th> {/* Display a table header for the unit */}
                        <th style={headerStyle}>出货数量</th> {/* Display a table header for the quantity sold */}
                        <th style={headerStyle}>售价</th> {/* Display a table header for the selling price */}
                        <th style={headerStyle}>总价</th> {/* Display a table header for the total price */}
                        <th style={headerStyle}>货币</th> {/* Display a table header for the currency */}
                        <th style={headerStyle}>备注</th> {/* Display a table header for the notes */}
                        <th style={headerStyle}>操作</th> {/* Display a table header for the actions */}
                    </tr>
                    </thead>
                    <tbody>
                    {relatedRecords.map(record => (
                        <tr key={record.recordId}>
                            <td style={cellStyle}>{record.date}</td> {/* Display the date of the inventory record */}
                            <td style={cellStyle}>{record.itemId}</td> {/* Display the item ID of the inventory record */}
                            <td style={cellStyle}>{record.itemName}</td> {/* Display the item name of the inventory record */}
                            <td style={cellStyle}>{record.brand}</td> {/* Display the brand of the inventory record */}
                            <td style={cellStyle}>{record.itemSize}</td> {/* Display the size of the item in the inventory record */}
                            <td style={cellStyle}>{record.unit}</td> {/* Display the unit of measurement for the item */}
                            <td style={cellStyle}>{record.stockOutAmount}</td> {/* Display the amount of stock sold */}
                            <td style={cellStyle}>${record.sellPrice.toFixed(2)}</td> {/* Display the selling price of the item with 2 decimal places */}
                            <td style={cellStyle}>${(record.sellPrice * record.stockOutAmount).toFixed(2)}</td> {/* Calculate and display the total price of the sold items with 2 decimal places */}
                            <td style={cellStyle}>{record.currencyUnit}</td> {/* Display the currency unit used */}
                            <td style={cellStyle}>{record.note}</td> {/* Display any notes associated with the inventory record */}
                            <td style={cellStyle}>
                                <button onClick={() => handleEdit(record)} style={buttonStyle}>修改</button>
                                <button onClick={() => requestDelete(record.recordId)} style={buttonStyle}>删除</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {/* Display edit popup if showEditPopup state is true */}
            {showEditPopup && (
                <EditPopUpForStockOut
                    record={currentRecord}
                    show={showEditPopup}
                    onSave={handleSaveEdit}
                    onClose={() => setShowEditPopup(false)}
                />
            )}
            {/* Display confirmation modal if showConfirmationModal state is true */}
            {showConfirmationModal && (
                <ConfirmationModal
                    message="确定要删除这条记录吗？"
                    onConfirm={handleDelete}
                    onClose={() => setShowConfirmationModal(false)}
                />
            )}
        </div>
    );

};

// Export the ViewStockOutOneItemPage component as default
export default ViewStockOutOneItemPage;
