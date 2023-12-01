import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';  // Import the "+" icon
import { Link } from 'react-router-dom';  // Import Link component
import SearchTableOut from './SearchTableOut';
import SearchTableIn from "./SearchTableIn"; // Update this path as needed

const SearchForm = () => {
    // State for search criteria and results
    const [searchCriteria, setSearchCriteria] = useState({
        brand: '',
        itemType: '',
        itemName: '',
        unit: '',
        itemSizde: ''
    });

    const [searchResult, setSearchResult] = useState([]);
    const [brands, setBrands] = useState([]);
    const [itemTypes, setItemTypes] = useState([]);
    const [itemNames, setItemNames] = useState([]);
    const [units, setUnits] = useState([]);
    const [itemSizes, setItemSizes] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    // Function to fetch brands from the backend
    const fetchBrands = async () => {
        const res = await axios.get('http://localhost:8080/brands');
        setBrands(res.data);
    };

    // Function to fetch item types based on selected brand
    const fetchItemTypes = async (brand) => {
        const res = await axios.get(`http://localhost:8080/itemTypes/${brand}`);
        setItemTypes(res.data);
    };

    // Function to fetch item names based on selected brand and item type
    const fetchItemNames = async (brand, itemType) => {
        const res = await axios.get(`http://localhost:8080/itemNames/${brand}/${itemType}`);
        setItemNames(res.data);
    };

    // Function to fetch units based on selected brand, item type, and item name
    const fetchUnits = async (brand, itemType, itemName) => {
        const res = await axios.get(`http://localhost:8080/units/${brand}/${itemType}/${itemName}`);
        setUnits(res.data);
    };

    // Function to fetch item sizes based on selected criteria
    const fetchItemSizes = async (brand, itemType, itemName, unit) => {
        const res = await axios.get(`http://localhost:8080/sizes/${brand}/${itemType}/${itemName}/${unit}`);
        setItemSizes(res.data);
    };

    // Function to search for items based on the selected criteria
    const searchItem = async () => {
        const { brand, itemType, itemName, unit, itemSize } = searchCriteria;
        const res = await axios.get(`http://localhost:8080/searchItem?brand=${brand}&itemType=${itemType}&itemName=${itemName}&unit=${unit}&itemSize=${itemSize}`);
        setSearchResult(res.data);
        setHasSearched(true);
    };

    // Fetch brands when the component mounts
    useEffect(() => {
        fetchBrands();
    }, []);

    // Handle changes in dropdowns and update search criteria
    const handleChange = (field, value) => {
        let newCriteria = { ...searchCriteria, [field]: value };

        // Reset child dropdowns based on which parent dropdown is changed
        if (field === 'brand') {
            newCriteria = { ...newCriteria, itemType: '', itemName: '', unit: '', itemSize: '' };
            fetchItemTypes(value);
        }
        if (field === 'itemType') {
            newCriteria = { ...newCriteria, itemName: '', unit: '', itemSize: '' };
            fetchItemNames(searchCriteria.brand, value);
        }
        if (field === 'itemName') {
            newCriteria = { ...newCriteria, unit: '', itemSize: '' };
            fetchUnits(searchCriteria.brand, searchCriteria.itemType, value);
        }
        if (field === 'unit') {
            newCriteria = { ...newCriteria, itemSize: '' };
            fetchItemSizes(searchCriteria.brand, searchCriteria.itemType, searchCriteria.itemName, value);
        }

        setSearchCriteria(newCriteria);
    };

    // Styling for the form and components, similar to stock in page
    const formContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#d4ebf2',  // Light blue background
        padding: '20px',
        borderRadius: '10px',
    };

    const titleStyle = {
        marginBottom: '20px',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#00008B',  // Dark blue text
    };

    const formStyle = {
        display: 'grid',
        gridTemplateColumns: '160px 300px',
        gap: '10px',
        alignItems: 'center',
    };

    const labelStyle = {
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#00008B',  // Dark blue background
        borderRadius: '5px',
        padding: '5px 10px',
        textAlign: 'left',
    };

    const selectStyle = {
        width: '100%',
        padding: '5px',
        borderRadius: '5px',
        backgroundColor: '#d4ebf2',
    };

    const buttonStyle = {
        gridArea: '1 / 1 / 2 / 3',
        backgroundColor: '#00008B',  // Dark blue background
        color: '#fff',  // White text
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
        textAlign: 'center',
    };

    // New Item Button Style, similar to stock in page
    const newItemButtonStyle = {
        backgroundColor: '#00008B', // Dark blue background
        color: '#fff',  // White text
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
        textAlign: 'center',
        width: '500px',  // Fixed width
        marginBottom: '40px'  // Added space between this and the dropdown
    };

    const searchTableStyle = {
        marginTop: '20px'  // Add space between the table and form
    };

    const newItemButtonContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#d4ebf2',  // Light blue background
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '20px',
        height: "45px"  // Add some space between this and the form
    };

    return (
        <div>
            {/* New Item Button */}
            <div style={newItemButtonContainerStyle}>
                <Link to="/new-item-out" style={{ ...newItemButtonStyle, backgroundColor: '#00008B', textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ backgroundColor: '#d4ebf2', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <FaPlus color="#00008B" />  {/* Updated color for the '+' icon */}
                    </div>
                    <span style={{ marginLeft: '8px' }}>新建货品</span>
                </Link>
            </div>

            <div style={formContainerStyle}>
                {/* Title */}
                <div style={titleStyle}>搜索货品</div>

                {/* Form */}
                <div style={formStyle}>
                    {/* Brand */}
                    <label style={labelStyle}>品牌</label>
                    <select style={selectStyle} name="brand" value={searchCriteria.brand} onChange={e => handleChange('brand', e.target.value)}>
                        <option value="">选择品牌</option>
                        {brands.map((brand, index) => <option key={index} value={brand}>{brand}</option>)}
                    </select>

                    {/* Item Type */}
                    <label style={labelStyle}>类别</label>
                    <select style={selectStyle} name="itemType" value={searchCriteria.itemType} onChange={e => handleChange('itemType', e.target.value)}>
                        <option value="">选择类别</option>
                        {itemTypes.map((type, index) => <option key={index} value={type}>{type}</option>)}
                    </select>

                    {/* Item Name */}
                    <label style={labelStyle}>名称</label>
                    <select style={selectStyle} name="itemName" value={searchCriteria.itemName} onChange={e => handleChange('itemName', e.target.value)}>
                        <option value="">选择名称</option>
                        {itemNames.map((name, index) => <option key={index} value={name}>{name}</option>)}
                    </select>

                    {/* Unit */}
                    <label style={labelStyle}>单位</label>
                    <select style={selectStyle} name="unit" value={searchCriteria.unit} onChange={e => handleChange('unit', e.target.value)}>
                        <option value="">选择单位</option>
                        {units.map((unit, index) => <option key={index} value={unit}>{unit}</option>)}
                    </select>

                    {/* Item Size */}
                    <label style={labelStyle}>货品规格</label>
                    <select style={selectStyle} name="itemSize" value={searchCriteria.itemSize} onChange={e => handleChange('itemSize', e.target.value)}>
                        <option value="">选择规格</option>
                        {itemSizes.map((size, index) => <option key={index} value={size}>{size}</option>)}
                    </select>

                    {/* Search Button - Moved to the bottom */}
                    <button style={{ ...buttonStyle, gridArea: '6 / 1 / 7 / 3' }} onClick={searchItem}>搜索</button>
                </div>
            </div>

            <div style={searchTableStyle}>
                {/* Show the table only after the Search button is clicked */}
                {hasSearched && <SearchTableOut items={searchResult} />}
            </div>
        </div>
    );
};

export default SearchForm;
