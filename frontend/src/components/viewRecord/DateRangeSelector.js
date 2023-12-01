import React, { useState } from 'react';

// Define a functional component called 'DateRangeSelector' that takes 'onSubmit' as a prop
const DateRangeSelector = ({ onSubmit }) => {
    // Initialize state variables for 'startDate' and 'endDate' using 'useState'
    const [startDate, setStartDate] = useState(''); // 'startDate' stores the selected start date
    const [endDate, setEndDate] = useState('');     // 'endDate' stores the selected end date

    // Define a function 'handleSubmit' to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        onSubmit(startDate, endDate); // Call the 'onSubmit' function with 'startDate' and 'endDate' as arguments
    };

    // Render the component with JSX
    return (
        <form onSubmit={handleSubmit}> {/* Define a form element with 'handleSubmit' as the submit handler */}
            <label>
                Start Date:
                <input
                    type="date"
                    value={startDate} // Bind the input value to the 'startDate' state
                    onChange={(e) => setStartDate(e.target.value)} // Update 'startDate' when input changes
                />
            </label>
            <label>
                End Date:
                <input
                    type="date"
                    value={endDate} // Bind the input value to the 'endDate' state
                    onChange={(e) => setEndDate(e.target.value)} // Update 'endDate' when input changes
                />
            </label>
            <button type="submit">Submit</button> {/* Create a submit button for the form */}
        </form>
    );
};

// Export the 'DateRangeSelector' component as the default export
export default DateRangeSelector;
