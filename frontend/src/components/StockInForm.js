import React, { useState } from 'react';
import axios from 'axios';
import Modal from './popUps/Modal';

const StockInForm = ({ item }) => {
    const [stockInAmount, setStockInAmount] = useState("");
    const [unitPrice, setUnitPrice] = useState("");
    const [currencyUnit, setCurrencyUnit] = useState("CAD");
    const [note, setNote] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [showModal, setShowModal] = useState(false);

    const labelStyle = {
        backgroundColor: '#00008B',
        color: '#fff',
        padding: '5px 10px',
        borderRadius: '5px',
        marginBottom: '5px',
        width: '100px', // Set a fixed width for all labels
        display: 'inline-block',
        marginRight: '10px',
        textAlign: 'left', // Align text to the right for uniform appearance
        height: '25px',
    };

    const inputStyle = {
        width: '200px', // You might need to adjust this width to align with the box
        height: '10px',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '3px solid #00008B',
        backgroundColor: '#fff',
        color: '#000',
    };

    const selectStyle = {
        width: '226px', // Adjusted width to align with the text input fields
        height: '37px',
        padding: '8px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '3px solid #00008B',
        backgroundColor: '#fff',
        color: '#000',
    };

    const buttonStyle = {
        margin: '10px 0',
        padding: '10px',
        width: '100px',
        backgroundColor: '#00008B',
        color: 'white',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: '0.2s',
    };

    const rowContainerStyle = {

        flexDirection: 'row',
        alignItems: 'center',
        margin: '10px 0',
    };

    const saveRecord = async () => {

        if (!Number.isInteger(Number(stockInAmount))) {
            setResponseMessage("入库数量必须是整数");
            setShowModal(true);
            return;
        }

        if (isNaN(Number(unitPrice))) {
            setResponseMessage("价格必须是数字");
            setShowModal(true);
            return;
        }

        const record = {
            itemId: item.itemId,
            itemName: item.itemName,
            brand: item.brand,
            itemSize: item.itemSize,
            unit: item.unit,
            stockInAmount,
            unitPrice,
            currencyUnit,
            note,
            totalPrice: Number(stockInAmount) * Number(unitPrice)
        };

        try {
            const res = await axios.post('http://localhost:8080/stock-in-record', record);
            setResponseMessage(res.data);
            if (res.data.startsWith("Stock-in record and updated inventory stats saved!")) {
                setResponseMessage("记录保存成功!");
            } else {
                setResponseMessage("记录保存失败!");
            }
            setShowModal(true);
        } catch (error) {
            console.error("Error saving record:", error);
            setResponseMessage("运算出错，请联系工作人员");
            setShowModal(true);
        }
    };

    return (
        <div style={{ backgroundColor: '#d4ebf2', padding: '10px' }}>
            {/* Row 1 */}
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
            {/* Row 2 */}
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
            {/* Row 3 */}
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
            {/* Row 4 */}
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
            {showModal && <Modal onClose={() => setShowModal(false)} message={responseMessage} />}
        </div>
    );
};

export default StockInForm;
