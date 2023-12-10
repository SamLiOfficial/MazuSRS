import React from 'react'; // Import the React library

// Import the 'StockOutForm' component from the specified path
import StockOutForm from "./StockOutForm"; // Import StockOutForm component

const SearchTableOut = ({ items }) => { // Define a functional component named 'SearchTableOut' that takes 'items' as a prop
    // Styling for the container
    const divStyle = {
        display: 'flex', // Set the display property to 'flex' for layout
        flexDirection: 'column', // Arrange elements in a column
        alignItems: 'center', // Center align elements horizontally
        backgroundColor: '#d4ebf2',  // Light blue background
        padding: '20px', // Apply padding of 20px on all sides
        borderRadius: '10px', // Add rounded corners with 10px radius
        width: '530px',  // Fixed width set to 530px
        overflow: "hidden", // Prevent overflow
    };

    // Styling for the title
    const titleStyle = {
        marginBottom: '20px', // Add bottom margin to create space
        fontSize: '24px', // Set font size to 24px
        fontWeight: 'bold', // Apply bold font weight
        color: '#00008B', // Dark blue color
    };

    // Styling for the table
    const tableStyle = {
        width: '470px',  // Fixed width set to 470px
        borderCollapse: 'collapse', // Collapse table borders
        backgroundColor: '#d4ebf2', // Light blue background
        overflow: "hidden", // Prevent overflow
    };

    // Styling for table header cells (th)
    const thStyle = {
        padding: '10px', // Apply padding to table header cells
        border: '1px solid #00008B', // Dark blue border
        backgroundColor: '#00008B', // Dark blue background
        color: '#ffffff', // White text color
    };

    // Styling for table data cells (td)
    const tdStyle = {
        padding: '10px', // Apply padding to table data cells
        border: '1px solid #00008B', // Dark blue border
        textAlign: 'center', // Center align text in cells
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
        <div style={divStyle}> {/* Render a div with the container style */}
            {/* Title for the page */}
            <div style={titleStyle}>Search Results</div>
            {items.length === 0 ? ( // Conditional rendering: If no items, display a message
                <p>No results found</p>
            ) : (
                <table style={tableStyle}> {/* Render a table with the table style */}
                    <thead> {/* Table header */}
                    <tr> {/* Table row for header */}
                        <th style={{ ...thStyle, ...wideColumn }}>Item ID</th> {/* Table header cells */}
                        <th style={{ ...thStyle, ...wideColumn }}>Item Type</th>
                        <th style={{ ...thStyle, ...wideColumn }}>Item Name</th>
                        <th style={{ ...thStyle, ...wideColumn }}>Brand</th>
                        <th style={{ ...thStyle, ...wideColumn }}>Item Size</th>
                        <th style={{ ...thStyle, ...wideColumn }}>Unit</th>
                        <th style={{ ...thStyle, ...noteColumn }}>Note</th>
                    </tr>
                    </thead>
                    <tbody> {/* Table body */}
                    {items.map((item, index) => ( // Map items to table rows
                        <tr key={index}> {/* Table row with a unique key */}
                            <td style={{ ...tdStyle, ...wideColumn }}>{item.itemId}</td> {/* Table data cells */}
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

export default SearchTableOut; // Export the 'SearchTableOut' component
