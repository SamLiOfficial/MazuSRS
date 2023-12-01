import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

// Define a functional component called 'StockOutRecordPage'
const StockOutRecordPage = () => {
    // Initialize state variables for 'startDate', 'endDate', and 'records' using 'useState'
    const [startDate, setStartDate] = useState(new Date()); // 'startDate' stores the selected start date
    const [endDate, setEndDate] = useState(new Date());     // 'endDate' stores the selected end date
    const [records, setRecords] = useState([]);             // 'records' stores the fetched stock-out records

    // Define a function 'handleSubmit' to handle form submission
    const handleSubmit = async () => {
        try {
            // Make an asynchronous API request to fetch stock-out statistics data
            const response = await axios.get('http://localhost:8080/stock-out-statistics', {
                params: {
                    startDate: startDate.toISOString().split('T')[0], // Format 'startDate' for the request
                    endDate: endDate.toISOString().split('T')[0]       // Format 'endDate' for the request
                }
            });
            setRecords(response.data); // Set 'records' state with the fetched data
        } catch (error) {
            console.error('Error fetching records:', error); // Log an error message if the request fails
        }
    };

    // Render the component with JSX
    return (
        <div>
            <h1>View Stock-Out Records</h1>
            <DatePicker selected={startDate} onChange={date => setStartDate(date)} /> {/* Date picker for 'startDate' */}
            <DatePicker selected={endDate} onChange={date => setEndDate(date)} />     {/* Date picker for 'endDate' */}
            <button onClick={handleSubmit}>Submit</button> {/* Button to trigger data submission */}
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Item ID</th>
                    <th>Item Name</th>
                    <th>Amount</th>
                    <th>Sell Price</th>
                </tr>
                </thead>
                <tbody>
                {records.map(record => (
                    // Map over 'records' and display each record as a table row
                    <tr key={record.recordId}>
                        <td>{record.date}</td>
                        <td>{record.itemId}</td>
                        <td>{record.itemName}</td>
                        <td>{record.stockOutAmount}</td>
                        <td>{record.sellPrice}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

// Export the 'StockOutRecordPage' component as the default export
export default StockOutRecordPage;
