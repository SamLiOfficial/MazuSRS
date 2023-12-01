// Import necessary dependencies and components
import React, { useState } from 'react'; // Import React and useState from 'react' library
import axios from 'axios'; // Import axios for making HTTP requests
import DatePicker from 'react-datepicker'; // Import DatePicker component
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker CSS

// Define the 'StockOutStatistics' functional component
const StockOutStatistics = () => {
    // Initialize state variables using 'useState'
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [summarizedData, setSummarizedData] = useState([]);

    // Define a function to handle the "Summarize" button click
    const handleSummarize = () => {
        // Send a GET request to the specified URL with parameters 'startDate' and 'endDate'
        axios.get('http://localhost:8080/summarize-stock-out', {
            params: {
                startDate: startDate.toISOString().split('T')[0], // Format start date as YYYY-MM-DD
                endDate: endDate.toISOString().split('T')[0],     // Format end date as YYYY-MM-DD
            }
        })
            .then(response => {
                // Update 'summarizedData' state with the response data
                setSummarizedData(response.data);
            })
            .catch(error => {
                // Handle errors by logging them to the console
                console.error('Error fetching summary:', error);
            });
    };

    // Render the component with JSX
    return (
        <div>
            {/* Display a heading for the Stock-Out Statistics page */}
            <h1>Stock-Out Statistics</h1>

            <div>
                {/* Create DatePickers for selecting start and end dates */}
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} />

                {/* Create a button with an 'onClick' event handler */}
                <button onClick={handleSummarize}>Summarize</button>
            </div>

            {/* Check if 'summarizedData' has data and render a table if true */}
            {summarizedData.length > 0 && (
                <table>
                    <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Item Size</th>
                        <th>Unit</th>
                        <th>Item Type</th>
                        <th>Brand</th>
                        <th>Sum Stock Out Amount</th>
                        <th>Sum Sell Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Map over 'summarizedData' and generate table rows */}
                    {summarizedData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.itemName}</td>
                            <td>{item.itemSize}</td>
                            <td>{item.unit}</td>
                            <td>{item.itemType}</td>
                            <td>{item.brand}</td>
                            <td>{item.sumStockOutAmount}</td>
                            <td>{item.sumSellPrice}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

// Export the 'StockOutStatistics' component as the default export
export default StockOutStatistics;
