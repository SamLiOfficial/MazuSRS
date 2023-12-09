import React, { useState } from 'react';
import axios from 'axios';

const ItemForm = () => {
    const [item, setItem] = useState({
        itemType: '',
        itemName: '',
        brand: '',
        itemSize: '',
        unit: '',
        note: ''
    });

    const [response, setResponse] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});



    // Styling for the form and components
    const formContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#d4ebf2', // Light blue background
        padding: '20px',
        borderRadius: '10px',
    };

    const formStyle = {
        display: 'grid',
        gridTemplateColumns: '160px 300px', // Two columns layout
        gap: '10px',
        alignItems: 'start',
        gridTemplateRows: 'repeat(5, auto) 1fr', // Define rows with 1fr for the textarea row
    };

    const labelStyle = {
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#00008B', // Dark blue background
        borderRadius: '5px',
        padding: '5px 10px',
        textAlign: 'left',
    };

    const inputStyle = {
        width: '100%',
        padding: '8px',
        borderRadius: '5px',
        border: '1px solid #ccc', // Light gray border
    };

    // Add style for invalid input
    const invalidInputStyle = {
        ...inputStyle,
        border: '1px solid red', // Red border for invalid input
        animation: 'flashRed 0.5s' // Flash animation for invalid input
    };

    // Add style for warning message
    const warningMessageStyle = {
        color: 'red',
        textAlign: 'center',
        visibility: Object.keys(validationErrors).length ? 'visible' : 'hidden', // Only visible when there are errors
        marginBottom: '10px'
    };


    const textAreaStyle = {
        ...inputStyle,
        height: '100px',
        gridRowStart: '6', // Position the textarea in the 6th row
        gridColumn: '1 / -1', // Span across all columns
    };

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
    const Modal = ({ onClose, message }) => (
        <>
            {/* Overlay */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1
            }}></div>

            {/* Modal */}
            <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#ADD8E6',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                zIndex: 2,
                animation: 'fadeIn 0.5s'
            }}>
                <p style={{ color: '#00008B', textAlign: 'center', fontWeight: 'bold' }}>
                    <span style={{ marginRight: '10px' }}>️</span>
                    {message}
                </p>
                <button onClick={onClose} style={{
                    backgroundColor: '#00008B',
                    color: '#fff',
                    padding: '12px 0',
                    borderRadius: '5px',
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: '15px',
                    width: '60%', // Wider button
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    outline: 'none'
                }}
                        onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
                        onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                    Close
                </button>
            </div>
        </>
    );

// Add this to your CSS
    /*
    @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
        to { opacity: 1; transform: translate(-50%, -50%) scale(1.0); }
    }
    */


    const handleChange = (e) => {
        setItem({
            ...item,
            [e.target.name]: e.target.value
        });
        // Reset validation error for the changed field
        setValidationErrors({
            ...validationErrors,
            [e.target.name]: false
        });
    };
    const saveItem = async () => {
        // Check for empty fields
        const newValidationErrors = {};
        Object.keys(item).forEach(key => {
            if (item[key] === '' && key !== 'note') { // Exclude 'note' field from validation
                newValidationErrors[key] = true;
            }
        });

        if (Object.keys(newValidationErrors).length) {
            setValidationErrors(newValidationErrors);
            return; // Do not proceed if there are validation errors
        }
        try {
            const res = await axios.post('http://localhost:8080/item', item);
            // Check the response and set the message accordingly
            const message = res.data.startsWith("Item and initial")
                ? "Item saved successfully!"
                : "Item already exist in database";
            setResponse(message);
            setShowModal(true); // Show the modal with the appropriate message
        } catch (error) {
            console.error("Error saving item:", error);
            // Handle error case (optional)
        }
    };

    return (
        <div style={formContainerStyle}>

            <div style={{ ...warningMessageStyle }}>所有字段必须填写</div> {/* Warning message */}

            <div style={formStyle}>
                {/* 类别 */}
                <label style={labelStyle}>类别</label>
                <input
                    style={validationErrors.itemType ? invalidInputStyle : inputStyle}
                    name="itemType"
                    placeholder="输入类别"
                    value={item.itemType}
                    onChange={handleChange}
                />

                {/* 名称 */}
                <label style={labelStyle}>名称</label>
                <input
                    style={inputStyle}
                    name="itemName"
                    placeholder="输入名称"
                    value={item.itemName}
                    onChange={handleChange}
                />

                {/* 品牌 */}
                <label style={labelStyle}>品牌</label>
                <input
                    style={inputStyle}
                    name="brand"
                    placeholder="输入品牌"
                    value={item.brand}
                    onChange={handleChange}
                />

                {/* 规格 */}
                <label style={labelStyle}>规格</label>
                <input
                    style={inputStyle}
                    name="itemSize"
                    placeholder="输入规格"
                    value={item.itemSize}
                    onChange={handleChange}
                />

                {/* 单位 */}
                <label style={labelStyle}>单位</label>
                <input
                    style={inputStyle}
                    name="unit"
                    placeholder="输入单位"
                    value={item.unit}
                    onChange={handleChange}
                />

                {/* 备注 */}
                <textarea
                    style={textAreaStyle}
                    name="note"
                    placeholder="输入备注"
                    value={item.note}
                    onChange={handleChange}
                ></textarea>
            </div>

            {/* Save Button */}
            <button style={buttonStyle} onClick={saveItem}>保存新建货品</button>


            {/* Modal */}
            {showModal && <Modal onClose={() => setShowModal(false)} message={response} />}


        </div>
    );
};

export default ItemForm;