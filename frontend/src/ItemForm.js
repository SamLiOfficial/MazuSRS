import React, { useState } from 'react';
import axios from 'axios';

const ItemForm = () => {
    const [item, setItem] = useState({
        itemId: '',
        itemType: '',
        itemName: '',
        brand: '',
        itemSize: '',
        unit: '',
        note: ''
    });
    const [response, setResponse] = useState('');

    const handleChange = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
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
        <div>
            <h2>Enter Item Details</h2>

        </div>
    );
};

export default ItemForm;
