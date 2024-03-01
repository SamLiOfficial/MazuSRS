import React, { useState } from 'react'; // Importing React and useState hook from React
import axios from 'axios'; // Importing axios for making HTTP requests
import Modal from './popUps/Modal'; // Importing Modal component from './popUps/Modal' file

const StockInForm = ({ item }) => { // Declaring a functional component named StockInForm, taking item as props
    // State variables for various form fields and messages
    const [stockInAmount, setStockInAmount] = useState(""); // State variable for stock in amount
    const [unitPrice, setUnitPrice] = useState(""); // State variable for unit price
    const [currencyUnit, setCurrencyUnit] = useState("CAD"); // State variable for currency unit with default value 'CAD'
    const [note, setNote] = useState(""); // State variable for note
    const [responseMessage, setResponseMessage] = useState(""); // State variable for response message
    const [showModal, setShowModal] = useState(false); // State variable for modal visibility, initially false

    // Styles for various elements
    const labelStyle = { // Style object for labels
        backgroundColor: '#00008B', // Background color
        color: '#fff', // Text color
        padding: '5px 10px', // Padding
        borderRadius: '5px', // Border radius
        marginBottom: '5px', // Margin bottom
        width: '100px', // Fixed width
        display: 'inline-block', // Inline block display
        marginRight: '10px', // Margin right
        textAlign: 'left', // Text alignment
        height: '25px', // Height
    };

    const inputStyle = { // Style object for input fields
        width: '200px', // Width
        height: '10px', // Height
        padding: '10px', // Padding
        margin: '10px 0', // Margin
        borderRadius: '5px', // Border radius
        border: '3px solid #00008B', // Border
        backgroundColor: '#fff', // Background color
        color: '#000', // Text color
    };

    const selectStyle = { // Style object for select element
        width: '226px', // Width
        height: '37px', // Height
        padding: '8px', // Padding
        margin: '10px 0', // Margin
        borderRadius: '5px', // Border radius
        border: '3px solid #00008B', // Border
        backgroundColor: '#fff', // Background color
        color: '#000', // Text color
    };

    const buttonStyle = { // Style object for button
        margin: '10px 0', // Margin
        padding: '10px', // Padding
        width: '100px', // Width
        backgroundColor: '#00008B', // Background color
        color: 'white', // Text color
        borderRadius: '5px', // Border radius
        cursor: 'pointer', // Cursor pointer
        transition: '0.2s', // Transition effect
    };

    const rowContainerStyle = { // Style object for row container
        flexDirection: 'row', // Flex direction
        alignItems: 'center', // Align items
        margin: '10px 0', // Margin
    };

    // Function to save record
    const saveRecord = async () => {
        // Validation for stock in amount
        if (!Number.isInteger(Number(stockInAmount))) {
            setResponseMessage("入库数量必须是整数"); // Set response message
            setShowModal(true); // Show modal
            return; // Exit function
        }

        // Validation for unit price
        if (isNaN(Number(unitPrice))) {
            setResponseMessage("价格必须是数字"); // Set response message
            setShowModal(true); // Show modal
            return; // Exit function
        }

        // Create record object with form data
        const record = {
            itemId: item.itemId, // Item ID
            itemName: item.itemName, // Item name
            brand: item.brand, // Brand
            itemSize: item.itemSize, // Item size
            unit: item.unit, // Unit
            stockInAmount, // Stock in amount
            unitPrice, // Unit price
            currencyUnit, // Currency unit
            note, // Note
            totalPrice: Number(stockInAmount) * Number(unitPrice) // Total price
        };

        try {
            // Send POST request to save record
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/stock-in-record`, record);
            setResponseMessage(res.data); // Set response message from server
            // Check if record is successfully saved
            if (res.data.startsWith("Stock-in record and updated inventory stats saved!")) {
                setResponseMessage("记录保存成功!"); // Set success message
            } else {
                setResponseMessage("记录保存失败!"); // Set failure message
            }
            setShowModal(true); // Show modal
        } catch (error) {
            console.error("Error saving record:", error); // Log error
            setResponseMessage("运算出错，请联系工作人员" + error); // Set error message
            setShowModal(true); // Show modal
        }
    };

    // Return JSX for StockInForm component
    return (
        <div style={{ backgroundColor: '#d4ebf2', padding: '10px' }}> {/* Stock in form container */}
            {/* Row 1: Stock in amount input */}
            <div style={rowContainerStyle}>
                <label style={labelStyle}>入库数量</label>
                <input
                    style={inputStyle}
                    type="text"
                    placeholder="入库数量"
                    value={stockInAmount}
                    onChange={e => setStockInAmount(e.target.value)}
                />
            </div>
            {/* Row 2: Unit price input */}
            <div style={rowContainerStyle}>
                <label style={labelStyle}>价格/{item.unit}</label>
                <input
                    style={inputStyle}
                    type="text"
                    placeholder={`价格/${item.unit}`}
                    value={unitPrice}
                    onChange={e => setUnitPrice(e.target.value)}
                />
            </div>
            {/* Row 3: Currency unit select */}
            <div style={rowContainerStyle}>
                <label style={labelStyle}>货币单位</label>
                <select
                    style={selectStyle}
                    value={currencyUnit}
                    onChange={e => setCurrencyUnit(e.target.value)}
                >
                    <option value="CAD">CAD</option>
                    <option value="CNY">CNY</option>
                </select>
            </div>
            {/* Row 4: Note input */}
            <div style={rowContainerStyle}>
                <label style={labelStyle}>备注</label>
                <input
                    style={inputStyle}
                    type="text"
                    placeholder="备注"
                    value={note}
                    onChange={e => setNote(e.target.value)}
                />
            </div>
            {/* Submit Button */}
            <button style={buttonStyle} onClick={saveRecord}>确认</button>

            {/* Modal */}
            {showModal && <Modal onClose={() => setShowModal(false)} message={responseMessage} />} {/* Display modal if showModal is true */}
        </div> // Closing tag for Stock in form container
    );
};

export default StockInForm; // Exporting StockInForm component
