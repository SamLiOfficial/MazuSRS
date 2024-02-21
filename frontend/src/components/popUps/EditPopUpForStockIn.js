import React, { useState, useEffect } from 'react';

const EditPopUpForStockIn = ({ record, show, onSave, onClose }) => {
    const [editedRecord, setEditedRecord] = useState({ ...record });

    // Use useEffect to recalculate totalPrice whenever stockInAmount or unitPrice changes
    useEffect(() => {
        setEditedRecord(current => {
            const recalculatedTotalPrice = current.stockInAmount * current.unitPrice;
            return { ...current, totalPrice: recalculatedTotalPrice };
        });
    }, [editedRecord.stockInAmount, editedRecord.unitPrice]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedValue = name === 'unitPrice' ? parseFloat(value) : value;
        setEditedRecord({ ...editedRecord, [name]: updatedValue });
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
                {/* 数量 (stockInAmount) */}
                <div>
                    <label>数量: </label>
                    <input
                        type="number"
                        name="stockInAmount"
                        value={editedRecord.stockInAmount}
                        onChange={handleChange}
                    />
                </div>
                {/* 单价 (unitPrice) */}
                <div>
                    <label>单价: </label>
                    <input
                        type="number"
                        step="0.01"
                        name="unitPrice"
                        value={editedRecord.unitPrice}
                        onChange={handleChange}
                    />
                </div>
                {/* 总价 (totalPrice) - Display only, not editable */}
                <div>
                    <label>总价: </label>
                    <span>{editedRecord.totalPrice.toFixed(2)}</span>
                </div>
                <button type="submit">Save</button>
                <button onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default EditPopUpForStockIn;
