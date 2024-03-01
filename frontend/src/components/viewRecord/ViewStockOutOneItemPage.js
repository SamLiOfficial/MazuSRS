// Import necessary modules from React and axios library
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import EditPopUpForStockOut from '/Users/samli/test/frontend/src/components/popUps/EditPopUpForStockOut.js'; // Adjust the import path as necessary

// Define the ViewStockOutOneItemPage functional component
const ViewStockOutOneItemPage = () => {
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

    // useEffect hook to fetch items data from the API upon component mount
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/all-items`)
            .then(response => {
                setItems(response.data.sort((a, b) => a.formattedString.localeCompare(b.formattedString)));
            })
            .catch(error => console.error('Error fetching items:', error));
    }, []);

    // Function to handle input change in the search bar
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        updateSuggestions(value);
        setShowDropdown(true);
    };

    // Function to handle arrow button click to toggle dropdown visibility
    const handleArrowClick = () => {
        setShowDropdown(!showDropdown);
        if (!showDropdown) {
            setSuggestions(items);
        }
    };

    // Function to update suggestions based on input value
    const updateSuggestions = (value) => {
        const filteredSuggestions = items.filter(item =>
            item.formattedString.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    };

    // Function to handle click on suggestion to select an item
    const handleSuggestionClick = (itemId, formattedString) => {
        setInputValue(formattedString);
        setSelectedItemId(itemId);
        setSuggestions([]);
        setShowDropdown(false);
    };

    // Function to handle form submission
    const handleSubmit = () => {
        if (selectedItemId && startDate && endDate) {
            axios.get(`${process.env.REACT_APP_API_URL}/stock-out-record-by-item`, {
                params: {
                    startDate: startDate.toISOString().split('T')[0],
                    endDate: endDate.toISOString().split('T')[0],
                    itemId: selectedItemId
                }
            })
                .then(response => {
                    setRelatedRecords(response.data);
                })
                .catch(error => console.error('Error fetching related records:', error));
        } else {
            alert('Please select valid dates and an item.');
        }
    };

    // Function to handle edit button click
    const handleEdit = (record) => {
        setCurrentRecord(record);
        setShowEditPopup(true);
    };

    // Function to handle saving edited record
    const handleSaveEdit = async (editedRecord) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/stock-out-record/${editedRecord.recordId}`, editedRecord);
            setRelatedRecords(relatedRecords.map(record => record.recordId === editedRecord.recordId ? editedRecord : record));
            setShowEditPopup(false);
            setCurrentRecord(null);
        } catch (error) {
            console.error('Error updating record:', error);
        }
    };

    // Function to handle deleting a record
    const handleDelete = async (recordId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/stock-out-record/${recordId}`);
            setRelatedRecords(relatedRecords.filter(record => record.recordId !== recordId));
        } catch (error) {
            console.error('Error deleting record:', error);
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

    // Return JSX for rendering the ViewStockOutOneItemPage component
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
                <div style={{ width: '20px' }}></div>
                {/* Label, input, dropdown, and submit button for item selection */}
                <label style={labelStyle}>货品</label>
                <div style={{ position: 'relative' }}>
                    <input type="text" value={inputValue} onChange={handleInputChange} placeholder="搜索货品..." />
                    <button onClick={handleArrowClick} style={buttonStyle}>▼</button>
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
                {/* Submit button */}
                <button onClick={handleSubmit} style={buttonStyle}>确认</button>
            </div>

            {/* Table to display related records */}
            <table style={tableStyle}>
                <thead>
                <tr>
                    {/* Table headers */}
                    <th style={headerStyle}>日期</th>
                    <th style={headerStyle}>货品ID</th>
                    <th style={headerStyle}>名称</th>
                    <th style={headerStyle}>品牌</th>
                    <th style={headerStyle}>规格</th>
                    <th style={headerStyle}>单位</th>
                    <th style={headerStyle}>出货数量</th>
                    <th style={headerStyle}>售价</th>
                    <th style={headerStyle}>总价</th>
                    <th style={headerStyle}>货币</th>
                    <th style={headerStyle}>备注</th>
                    <th style={headerStyle}>操作</th> {/* Added column for actions */}
                </tr>
                </thead>
                <tbody>
                {/* Render related records */}
                {relatedRecords.map(record => (
                    <tr key={record.recordId}>
                        {/* Display record details */}
                        <td style={cellStyle}>{record.date}</td>
                        <td style={cellStyle}>{record.itemId}</td>
                        <td style={cellStyle}>{record.itemName}</td>
                        <td style={cellStyle}>{record.brand}</td>
                        <td style={cellStyle}>{record.itemSize}</td>
                        <td style={cellStyle}>{record.unit}</td>
                        <td style={cellStyle}>{record.stockOutAmount}</td>
                        <td style={cellStyle}>${record.sellPrice.toFixed(2)}</td>
                        <td style={cellStyle}>${(record.sellPrice * record.stockOutAmount).toFixed(2)}</td>
                        <td style={cellStyle}>{record.currencyUnit}</td>
                        <td style={cellStyle}>{record.note}</td>
                        {/* Edit and delete buttons */}
                        <td style={cellStyle}>
                            <button onClick={() => handleEdit(record)} style={buttonStyle}>Edit</button>
                            <button onClick={() => handleDelete(record.recordId)} style={buttonStyle}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Render edit popup if showEditPopup is true */}
            {showEditPopup && (
                <EditPopUpForStockOut
                    record={currentRecord}
                    show={showEditPopup}
                    onSave={handleSaveEdit}
                    onClose={() => setShowEditPopup(false)}
                />
            )}
        </div>
    );
};

// Export the ViewStockOutOneItemPage component as default
export default ViewStockOutOneItemPage;
