import React from 'react';

const StockInModal = ({ onClose, message }) => (
    <>
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1
        }}></div>

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
                width: '60%',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                outline: 'none'
            }}>
                Close
            </button>
        </div>
    </>
);

export default StockInModal;
