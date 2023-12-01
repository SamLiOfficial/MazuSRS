import React from 'react';
import { Link } from 'react-router-dom';

// Define a functional component called 'ViewRecordPage'
const ViewRecordPage = () => {
    return (
        <div>
            <h1>View Record</h1> {/* Heading for the page */}
            <div><Link to="/view-record/stock-in">View Stock-In Record</Link></div>
            {/* Create links using 'Link' from react-router-dom to navigate to different record views */}
            <div><Link to="/view-record/stock-in-one-item">View Stock-In Record - One Item</Link></div>
            <div><Link to="/view-record/stock-out">View Stock-Out Record</Link></div>
            <div><Link to="/view-record/stock-out-one-item">View Stock-Out Record - One Item</Link></div>
        </div>
    );
};

export default ViewRecordPage; // Export the 'ViewRecordPage' component as the default export
