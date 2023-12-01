import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const StockInStatistics = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [summarizedData, setSummarizedData] = useState([]);

    const handleSummarize = () => {
        axios.get('http://localhost:8080/summarize-stock-in', {
            params: {
                startDate: startDate.toISOString().split('T')[0],
                endDate: endDate.toISOString().split('T')[0],
            }
        })
            .then(response => {
                setSummarizedData(response.data);
            })
            .catch(error => {
                console.error('Error fetching summary:', error);
            });
    };

    // Common style for DatePicker and Button
    const inputStyle = {
        padding: '10px',
        margin: '5px',
        borderRadius: '5px',
        border: '1px solid #ddd',
    };

    // Style for the table
    const tableStyle = {
        width: 'calc(100% - 80px)', // Full width minus padding
        margin: '20px 40px', // 40px padding on both sides
        borderCollapse: 'collapse',
        backgroundColor: '#d4ebf2', // Light blue background
        borderRadius: '10px', // Rounded corners
    };

    // Style for the table headers
    const headerStyle = {
        color: '#00008D', // Dark blue text for headers
        padding: '10px',
    };

    // Style for the table data cells
    const cellStyle = {
        color: 'black', // Black text for content
        padding: '10px',
    };

    return (
        <div>
            <h1>Stock-In Statistics</h1>

            <div>
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} style={inputStyle} />
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} style={inputStyle} />
                <button onClick={handleSummarize} style={inputStyle}>Summarize</button>
            </div>

            {summarizedData.length > 0 && (
                <table style={tableStyle}>
                    <thead>
                    <tr>
                        <th style={headerStyle}>Item Name</th>
                        <th style={headerStyle}>Item Size</th>
                        <th style={headerStyle}>Unit</th>
                        <th style={headerStyle}>Item Type</th>
                        <th style={headerStyle}>Brand</th>
                        <th style={headerStyle}>Sum Stock In Amount</th>
                        <th style={headerStyle}>Sum Total Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {summarizedData.map((item, index) => (
                        <tr key={index}>
                            <td style={cellStyle}>{item.itemName}</td>
                            <td style={cellStyle}>{item.itemSize}</td>
                            <td style={cellStyle}>{item.unit}</td>
                            <td style={cellStyle}>{item.itemType}</td>
                            <td style={cellStyle}>{item.brand}</td>
                            <td style={cellStyle}>{item.sumStockInAmount}</td>
                            <td style={cellStyle}>{item.sumTotalPrice}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default StockInStatistics;
