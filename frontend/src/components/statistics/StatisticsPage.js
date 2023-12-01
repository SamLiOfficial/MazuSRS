// Import necessary dependencies and components
import React from 'react';
import { Link } from 'react-router-dom';

// Define the 'StatisticsPage' functional component
const StatisticsPage = () => {
    return (
        <div>
            {/* Display a heading for the Statistics Page */}
            <h1>Statistics</h1>

            {/* Create links to various statistics pages using 'Link' from 'react-router-dom' */}
            <div><Link to="/statistics/inventory-record">Inventory Record</Link></div>
            <div><Link to="/statistics/stock-in-statistics">Stock-in Statistics</Link></div>
            <div><Link to="/statistics/stock-out-statistics">Stock-out Statistics</Link></div>

            {/* Create new links for one-item statistics */}
            <div><Link to="/statistics/stock-in-statistics-one-item">Stock-in Statistics - One Item</Link></div> {/* New link */}
            <div><Link to="/statistics/stock-out-statistics-one-item">Stock-out Statistics - One Item</Link></div> {/* New link */}
        </div>
    );
};

// Export the 'StatisticsPage' component as the default export
export default StatisticsPage;
