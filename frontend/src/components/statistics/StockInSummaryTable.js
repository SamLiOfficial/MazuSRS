// Import necessary dependencies and components
import React, { useState, useEffect } from 'react'; // Import React, useState, and useEffect from 'react' library
import axios from 'axios'; // Import axios for making HTTP requests

// Define the 'StockInSummaryTable' functional component
const StockInSummaryTable = () => {
    // Initialize state variable 'summaryData' using 'useState'
    const [summaryData, setSummaryData] = useState([]);

    // Use 'useEffect' to make an API request when the component is mounted
    useEffect(() => {
        // Make an API request to fetch the summary stock-in statistics data
        axios.get('http://localhost:8080/stock-in-summary')
            .then((response) => {
                // Update the 'summaryData' state with the response data
                setSummaryData(response.data);
            })
            .catch((error) => {
                // Handle errors by logging them to the console
                console.error('Error fetching stock-in summary data:', error);
            });
    }, []);

    // Render the component with JSX
    return (
        <div>
            {/* Display a heading for the Summary Stock-In Statistics */}
            <h2>Summary Stock-In Statistics</h2>
            <table>
                <thead>
                <tr>
                    <th>Item ID</th>
                    <th>Total Stock-In Amount</th>
                </tr>
                </thead>
                <tbody>
                {/* Map over 'summaryData' and generate table rows */}
                {summaryData.map((item) => (
                    <tr key={item.itemId}>
                        <td>{item.itemId}</td>
                        <td>{item.totalStockInAmount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

// Export the 'StockInSummaryTable' component as the default export
export default StockInSummaryTable;
