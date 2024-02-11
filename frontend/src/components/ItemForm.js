// Importing necessary modules and components
import React, { useState } from 'react'; // Import React and useState hook from React library
import axios from 'axios'; // Import axios for making HTTP requests
import Modal from './popUps/Modal'; // Import the Modal component from a local file

// Define the ItemForm functional component
const ItemForm = () => {
    // State hooks for managing form data
    const [item, setItem] = useState({
        itemType: '', // State for item type
        itemName: '', // State for item name
        brand: '', // State for brand
        itemSize: '', // State for item size
        unit: '', // State for unit
        note: '' // State for additional notes
    });

    // State hook for response message from server
    const [response, setResponse] = useState('');

    // State hook for modal visibility control
    const [showModal, setShowModal] = useState(false);

    // State hook for managing form validation errors
    const [validationErrors, setValidationErrors] = useState({});

    // CSS styles for the form container
    const formContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#d4ebf2', // Light blue background
        padding: '20px',
        borderRadius: '10px',
    };

    // CSS styles for the form layout
    const formStyle = {
        display: 'grid',
        gridTemplateColumns: '160px 300px', // Two columns layout
        gap: '10px',
        alignItems: 'start',
        gridTemplateRows: 'repeat(5, auto) 1fr', // Define rows with 1fr for the textarea row
    };

    // CSS styles for labels
    const labelStyle = {
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#00008B', // Dark blue background
        borderRadius: '5px',
        padding: '5px 10px',
        textAlign: 'left',
    };

    // CSS styles for input fields
    const inputStyle = {
        width: '100%',
        padding: '8px',
        borderRadius: '5px',
        border: '1px solid #ccc', // Light gray border
    };

    // CSS styles for invalid input fields
    const invalidInputStyle = {
        ...inputStyle,
        border: '1px solid red', // Red border for invalid input
        animation: 'flashRed 0.5s' // Flash animation for invalid input
    };

    // CSS styles for warning messages
    const warningMessageStyle = {
        color: 'red',
        textAlign: 'center',
        visibility: Object.keys(validationErrors).length ? 'visible' : 'hidden', // Only visible when there are errors
        marginBottom: '10px'
    };

    // CSS styles for the textarea
    const textAreaStyle = {
        ...inputStyle,
        height: '100px',
        gridRowStart: '6', // Position the textarea in the 6th row
        gridColumn: '1 / -1', // Span across all columns
    };

    // CSS styles for the save button
    const buttonStyle = {
        backgroundColor: '#00008B', // Dark blue background
        color: '#fff',
        padding: '10px 0', // Padding top and bottom
        borderRadius: '5px',
        cursor: 'pointer',
        textAlign: 'center',
        width: '480px', // Wider button
        justifySelf: 'end', // Align the button to the end of the grid cell
        marginLeft: '20px', // Move the button to the right
        marginTop: '20px', // Margin top for spacing
    };

    // Function to handle changes in input fields
    const handleChange = (e) => {
        setItem({
            ...item,
            [e.target.name]: e.target.value // Update state for the changed field
        });
        // Reset validation error for the changed field
        setValidationErrors({
            ...validationErrors,
            [e.target.name]: false
        });
    };

    // Function to handle item data submission
    const saveItem = async () => {
        // Validate fields and generate errors for empty ones
        const newValidationErrors = {};
        Object.keys(item).forEach(key => {
            if (item[key] === '' && key !== 'note') { // Exclude 'note' field from validation
                newValidationErrors[key] = true;
            }
        });

        // Halt submission if there are validation errors
        if (Object.keys(newValidationErrors).length) {
            setValidationErrors(newValidationErrors);
            return; // Exit the function early
        }

        try {
            // Attempt to send a POST request to save the item
            const res = await axios.post('http://localhost:8080/item', item);
            // Determine response message based on server response
            const message = res.data.startsWith("Item and initial")
                ? "货品保存成功!"
                : "货品已存在，无法保存!";
            setResponse(message); // Set the response message state
            setShowModal(true); // Display the modal with the response message
        } catch (error) {
            console.error("错误:", error);
            // Optional error handling can be implemented here
        }
    };

    // JSX for rendering the component
    return (
        <div style={formContainerStyle}>
            {/* Warning message for validation errors */}
            <div style={{ ...warningMessageStyle }}>所有字段必须填写</div>

            <div style={formStyle}>
                {/* Input field for item type with label */}
                <label style={labelStyle}>类别</label>
                <input
                    style={validationErrors.itemType ? invalidInputStyle : inputStyle}
                    name="itemType"
                    placeholder="输入类别"
                    value={item.itemType}
                    onChange={handleChange}
                />

                {/* Input field for item name with label */}
                <label style={labelStyle}>名称</label>
                <input
                    style={inputStyle}
                    name="itemName"
                    placeholder="输入名称"
                    value={item.itemName}
                    onChange={handleChange}
                />

                {/* Input field for brand with label */}
                <label style={labelStyle}>品牌</label>
                <input
                    style={inputStyle}
                    name="brand"
                    placeholder="输入品牌"
                    value={item.brand}
                    onChange={handleChange}
                />

                {/* Input field for item size with label */}
                <label style={labelStyle}>规格</label>
                <input
                    style={inputStyle}
                    name="itemSize"
                    placeholder="输入规格"
                    value={item.itemSize}
                    onChange={handleChange}
                />

                {/* Input field for unit with label */}
                <label style={labelStyle}>单位</label>
                <input
                    style={inputStyle}
                    name="unit"
                    placeholder="输入单位"
                    value={item.unit}
                    onChange={handleChange}
                />

                {/* Textarea for additional notes */}
                <textarea
                    style={textAreaStyle}
                    name="note"
                    placeholder="输入备注"
                    value={item.note}
                    onChange={handleChange}
                ></textarea>
            </div>

            {/* Save button */}
            <button style={buttonStyle} onClick={saveItem}>保存新建货品</button>

            {/* Modal component that shows up based on the showModal state */}
            {showModal && <Modal onClose={() => setShowModal(false)} message={response} />}
        </div>
    );
};

// Export the ItemForm component for use in other files
export default ItemForm;
