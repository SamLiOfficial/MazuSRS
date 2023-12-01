import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const StockInRecordPage = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [records, setRecords] = useState([]);

    const handleSubmit = async () => {
        try {
            const response = await axios.get('http://localhost:8080/stock-in-statistics', {
                params: {
                    startDate: startDate.toISOString().split('T')[0],
                    endDate: endDate.toISOString().split('T')[0]
                }
            });
            setRecords(response.data);
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };

    // Styling for date picker and submit button
    // Updated styling for date picker and submit button
    const datePickerStyle = {
        padding: '10px',
        margin: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        height: '40px' // Increased height
    };

    const buttonStyle = {
        ...datePickerStyle,
        cursor: 'pointer',
        backgroundColor: '#d4ebf2',
        color: 'black',
        fontWeight: 'bold'
    };

    // Styling for the table
    const tableStyle = {
        width: 'calc(100% - 80px)',
        margin: '20px 40px',
        borderCollapse: 'collapse',
        backgroundColor: '#d4ebf2',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
    };

    // Styling for table cells
    const cellStyle = {
        padding: '10px',
        borderBottom: '1px solid #ddd',
        color: 'black'
    };

    // Styling for table headers
    const headerStyle = {
        ...cellStyle,
        backgroundColor: '#00008B',
        color: 'white'
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
