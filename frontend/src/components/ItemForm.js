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
    const handleChange = (e) => {
        setItem({
            ...item,
            [e.target.name]: e.target.value
        });
    };

    const saveItem = async () => {
        try {
            const res = await axios.post('http://localhost:8080/item', item);
            setResponse(res.data);
        } catch (error) {
            console.error("Error saving item:", error);
        }
    };

    return (
        <div style={formContainerStyle}>
            <div style={formStyle}>
                {/* 类别 */}
                <label style={labelStyle}>类别</label>
                <input
                    style={inputStyle}
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

            <p>{response}</p>
        </div>
    );
};

export default ItemForm;
