import React, { useState, useEffect } from 'react'; // Import necessary React modules

import axios from 'axios'; // Import Axios for making HTTP requests

const InventoryStatsTable = () => { // Define a functional React component called InventoryStatsTable
    const [stats, setStats] = useState([]); // Initialize a state variable 'stats' as an empty array

    useEffect(() => { // Define an effect that runs after component render
        const fetchData = async () => { // Define an asynchronous function fetchData
            try {
                const response = await axios.get('http://localhost:8080/inventory-stats'); // Send a GET request to fetch data from the given URL
                setStats(response.data); // Update 'stats' state with the fetched data
            } catch (error) { // Handle errors, if any
                console.error("Error fetching data:", error); // Log the error to the console
            }
        };

        fetchData(); // Call the fetchData function when the component is mounted
    }, []); // Empty dependency array means this effect runs once after the initial render

    // Styling for the table
    const tableStyle = {
        width: 'calc(100% - 80px)', // Set the table width
        borderCollapse: 'collapse', // Collapse table borders
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', // Apply a box shadow
        margin: '20px 40px', // Set margin for the table
        textAlign: 'left', // Left-align table content
        backgroundColor: '#d4ebf2', // Set the background color
        borderRadius: '10px', // Apply rounded corners
    };

    // Styling for table headers
    const headerStyle = {
        backgroundColor: '#00008D', // Set header background color
        color: 'white', // Set header text color
        padding: '10px', // Set padding for headers
        borderBottom: '1px solid #ddd', // Add a border at the bottom
    };

    // Styling for table data cells
    const cellStyle = {
        padding: '10px', // Set padding for cells
        borderBottom: '1px solid #ddd', // Add a border at the bottom
        color: 'black', // Set text color for content
    };

    return (
        <table style={tableStyle}> {/* Render a table with the defined tableStyle */}
            <thead>
            <tr>
                <th style={headerStyle}>货品ID</th> {/* Render table header with the defined headerStyle */}
                <th style={headerStyle}>类别</th>
                <th style={headerStyle}>名称</th>
                <th style={headerStyle}>品牌</th>
                <th style={headerStyle}>规格</th>
                <th style={headerStyle}>单位</th>
                <th style={headerStyle}>库存量</th>
            </tr>
            </thead>
            <tbody>
            {stats.map((item, index) => ( // Map through 'stats' array and render table rows
                <tr key={index}>
                    <td style={cellStyle}>{item.itemId}</td> {/* Render table cell with data from 'stats' */}
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

export default InventoryStatsTable; // Export the InventoryStatsTable component for use in other parts of the application
