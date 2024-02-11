import React from 'react';
import { Link } from 'react-router-dom';

const ViewRecordPage = () => {
    // Styling for the main menu
    const viewRecordStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#ADD8E6'
    };

    // Styling for buttons
    const buttonStyle = {
        width: '250px',
        margin: '10px',
        padding: '15px 30px',
        fontSize: '18px',
        borderRadius: '5px',
        backgroundColor: '#00008B',
        color: 'white',
        cursor: 'pointer',
        textDecoration: 'none',
        textAlign: 'center',
        transition: 'transform 0.1s ease-in-out'
    };

    // Styling for the title
    const titleStyle = {
        fontSize: '36px',
        fontWeight: 'bold',
        marginBottom: '30px',
        color: '#00008B'
    };

    // Handle MouseDown event
    const handleMouseDown = (e) => {
        e.currentTarget.style.transform = 'scale(0.95)';
    };

    // Handle MouseUp event
    const handleMouseUp = (e) => {
        e.currentTarget.style.transform = 'scale(1)';
    };

    return (
        <div style={viewRecordStyle}>
            <div style={titleStyle}>查询记录</div>
            <Link to="/view-record/stock-in" style={buttonStyle} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>查询入库记录</Link>
            <Link to="/view-record/stock-out" style={buttonStyle} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>查询出库记录</Link>
            <Link to="/view-record/stock-in-one-item" style={buttonStyle} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>查询入库记录 - 单个货品</Link>
            <Link to="/view-record/stock-out-one-item" style={buttonStyle} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>查询出库记录 - 单个货品</Link>
        </div>
    );
};

export default ViewRecordPage;
