import React, { useState, useEffect } from 'react';

const EditPopUpForStockOut = ({ record, show, onSave, onClose }) => {
    const [editedRecord, setEditedRecord] = useState({ ...record });

    // Recalculate display-only total price whenever sellPrice or stockOutAmount changes
    const [displayTotalPrice, setDisplayTotalPrice] = useState(record.sellPrice * record.stockOutAmount);

    useEffect(() => {
        setDisplayTotalPrice(editedRecord.sellPrice * editedRecord.stockOutAmount);
    }, [editedRecord.sellPrice, editedRecord.stockOutAmount]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedRecord({ ...editedRecord, [name]: parseFloat(value) });
    };

    if (!show) {
        return null;
    }

    return (
        <div style={{ position: 'fixed', top: '20%', left: '30%', backgroundColor: 'white', padding: '20px', zIndex: 100 }}>
            <h2>Edit Record</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                onSave(editedRecord);
            }}>
                {/* StockOutAmount */}
                <div>
                    <label>数量: </label>
                    <input
                        type="number"
                        name="stockOutAmount"
                        value={editedRecord.stockOutAmount}
                        onChange={handleChange}
                    />
                </div>
                {/* SellPrice */}
                <div>
                    <label>售价: </label>
                    <input
                        type="number"
                        step="0.01"
                        name="sellPrice"
                        value={editedRecord.sellPrice}
                        onChange={handleChange}
                    />
                </div>
                {/* Display-only TotalPrice */}
                <div>
                    <label>总价: </label>
                    <span>{displayTotalPrice.toFixed(2)}</span>
                </div>
                <button type="submit">Save</button>
                <button onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default EditPopUpForStockOut;
