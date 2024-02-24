// src/components/ViewStockInOneItemPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import EditPopUpForStockIn from '/Users/samli/test/frontend/src/components/popUps/EditPopUpForStockIn.js'; // Adjust the import path as necessary

const ViewStockInOneItemPage = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState('');
    const [relatedRecords, setRelatedRecords] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/all-items`)
            .then(response => {
                setItems(response.data.sort((a, b) => a.formattedString.localeCompare(b.formattedString)));
            })
            .catch(error => console.error('Error fetching items:', error));
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        updateSuggestions(value);
        setShowDropdown(true);
    };

    const handleArrowClick = () => {
        setShowDropdown(!showDropdown);
        if (!showDropdown) {
            setSuggestions(items);
        }
    };

    const updateSuggestions = (value) => {
        const filteredSuggestions = items.filter(item =>
            item.formattedString.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    };

    const handleSuggestionClick = (itemId, formattedString) => {
        setInputValue(formattedString);
        setSelectedItemId(itemId);
        setSuggestions([]);
        setShowDropdown(false);
    };

    const handleSubmit = () => {
        if (selectedItemId && startDate && endDate) {
            axios.get(`${process.env.REACT_APP_API_URL}/stock-in-record-by-item`, {
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

    const handleEdit = (record) => {
        setCurrentRecord(record);
        setShowEditPopup(true);
    };

    const handleSaveEdit = async (editedRecord) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/stock-in-record/${editedRecord.recordId}`, editedRecord);
            setRelatedRecords(relatedRecords.map(record => record.recordId === editedRecord.recordId ? editedRecord : record));
            setShowEditPopup(false);
            setCurrentRecord(null);
        } catch (error) {
            console.error('Error updating record:', error);
        }
    };

    const handleDelete = async (recordId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/stock-in-record/${recordId}`);
            setRelatedRecords(relatedRecords.filter(record => record.recordId !== recordId));
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
            <h1 style={{ textAlign: 'center', color: '#00008B' }}>查询入库记录 - 单个货品</h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <label style={labelStyle}>开始日期</label>
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} style={firstDatePickerStyle} />
                <div style={{ width: '20px' }}></div>
                <label style={labelStyle}>结束日期</label>
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} style={datePickerStyle} />
                <div style={{ width: '20px' }}></div>
                <label style={labelStyle}>货品</label>
                <div style={{ position: 'relative' }}>
                    <input type="text" value={inputValue} onChange={handleInputChange} placeholder="搜索货品..." />
                    <button onClick={handleArrowClick} style={buttonStyle}>▼</button>
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
                <button onClick={handleSubmit} style={buttonStyle}>确认</button>
            </div>

            <table style={tableStyle}>
                <thead>
                <tr>
                    <th style={headerStyle}>日期</th>
                    <th style={headerStyle}>货品ID</th>
                    <th style={headerStyle}>名称</th>
                    <th style={headerStyle}>入库数量</th>
                    <th style={headerStyle}>单价</th>
                    <th style={headerStyle}>总价</th>
                    <th style={headerStyle}>操作</th>
                </tr>
                </thead>
                <tbody>
                {relatedRecords.map(record => (
                    <tr key={record.recordId}>
                        <td style={cellStyle}>{record.date}</td>
                        <td style={cellStyle}>{record.itemId}</td>
                        <td style={cellStyle}>{record.itemName}</td>
                        <td style={cellStyle}>{record.stockInAmount}</td>
                        <td style={cellStyle}>${record.unitPrice.toFixed(2)}</td>
                        <td style={cellStyle}>${record.totalPrice.toFixed(2)}</td>
                        <td style={cellStyle}>
                            <button onClick={() => handleEdit(record)} style={buttonStyle}>Edit</button>
                            <button onClick={() => handleDelete(record.recordId)} style={buttonStyle}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
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

export default ViewStockInOneItemPage;
