import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InventoryStatsTable = () => {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/inventory-stats');
                setStats(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Styling for the table
    const tableStyle = {
        width: 'calc(100% - 80px)', // Full width minus padding on both sides
        borderCollapse: 'collapse',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        margin: '20px 40px', // 40px horizontal margin (padding effect)
        textAlign: 'left',
        backgroundColor: '#d4ebf2', // Light blue background for the table
        borderRadius: '10px', // Rounded corners for the table
    };

    // Styling for table headers
    const headerStyle = {
        backgroundColor: '#00008D', // Dark blue background for headers
        color: 'white', // White text for headers
        padding: '10px',
        borderBottom: '1px solid #ddd',
    };

    // Styling for table data cells
    const cellStyle = {
        padding: '10px',
        borderBottom: '1px solid #ddd',
        color: 'black', // Black text for content
    };

    return (
        <table style={tableStyle}>
            <thead>
            <tr>
                <th style={headerStyle}>货品序号</th>
                <th style={headerStyle}>类别</th>
                <th style={headerStyle}>名称</th>
                <th style={headerStyle}>品牌</th>
                <th style={headerStyle}>规格</th>
                <th style={headerStyle}>单位</th>
                <th style={headerStyle}>库存量</th>
            </tr>
            </thead>
            <tbody>
            {stats.map((item, index) => (
                <tr key={index}>
                    <td style={cellStyle}>{item.itemId}</td>
                    <td style={cellStyle}>{item.itemType}</td>
                    <td style={cellStyle}>{item.itemName}</td>
                    <td style={cellStyle}>{item.brand}</td>
                    <td style={cellStyle}>{item.itemSize}</td>
                    <td style={cellStyle}>{item.unit}</td>
                    <td style={cellStyle}>{item.stockAmount}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default InventoryStatsTable;
