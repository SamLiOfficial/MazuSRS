import React from 'react';
import StockOutForm from "./StockOutForm"; // Import StockOutForm component

const SearchTableOut = ({ items }) => {
    // Styling for the container
    const divStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#d4ebf2',  // Light blue background
        padding: '20px',
        borderRadius: '10px',
        width: '530px',  // Fixed width set to 530px
        overflow: "hidden", // Prevent overflow
    };

    // Styling for the title
    const titleStyle = {
        marginBottom: '20px',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#00008B', // Dark blue color
    };

    // Styling for the table
    const tableStyle = {
        width: '470px',  // Fixed width set to 470px
        borderCollapse: 'collapse',
        backgroundColor: '#d4ebf2', // Light blue background
        overflow: "hidden", // Prevent overflow
    };

    // Styling for table header cells (th)
    const thStyle = {
        padding: '10px',
        border: '1px solid #00008B', // Dark blue border
        backgroundColor: '#00008B', // Dark blue background
        color: '#ffffff', // White color for text
    };

    // Styling for table data cells (td)
    const tdStyle = {
        padding: '10px',
        border: '1px solid #00008B', // Dark blue border
        textAlign: 'center',
        color: '#00008B', // Dark blue color
    };

    // Styling for wide columns in the table
    const wideColumn = {
        width: '200px', // Width as wide as 40 characters approximately
    };

    // Styling for the note column, which is wider
    const noteColumn = {
        width: '600px', // 3 times wider than other columns
    };

    return (
        <div style={divStyle}>
            <div style={titleStyle}>Search Results</div>
            {items.length === 0 ? (
                <p>No results found</p>
            ) : (
                <table style={tableStyle}>
                    <thead>
                    <tr>
                        <th style={{ ...thStyle, ...wideColumn }}>Item ID</th>
                        <th style={{ ...thStyle, ...wideColumn }}>Item Type</th>
                        <th style={{ ...thStyle, ...wideColumn }}>Item Name</th>
                        <th style={{ ...thStyle, ...wideColumn }}>Brand</th>
                        <th style={{ ...thStyle, ...wideColumn }}>Item Size</th>
                        <th style={{ ...thStyle, ...wideColumn }}>Unit</th>
                        <th style={{ ...thStyle, ...noteColumn }}>Note</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td style={{ ...tdStyle, ...wideColumn }}>{item.itemId}</td>
                            <td style={{ ...tdStyle, ...wideColumn }}>{item.itemType}</td>
                            <td style={{ ...tdStyle, ...wideColumn }}>{item.itemName}</td>
                            <td style={{ ...tdStyle, ...wideColumn }}>{item.brand}</td>
                            <td style={{ ...tdStyle, ...wideColumn }}>{item.itemSize}</td>
                            <td style={{ ...tdStyle, ...wideColumn }}>{item.unit}</td>
                            <td style={{ ...tdStyle, ...noteColumn }}>{item.note}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {items.length > 0 && <StockOutForm item={items[0]} />} {/* Render StockOutForm if there are items */}
        </div>
    );
};

export default SearchTableOut;
