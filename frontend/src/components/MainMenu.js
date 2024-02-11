// MainMenu.js
import { Link } from 'react-router-dom';

const MainMenu = () => {
    // Styling for the main menu
    const mainMenuStyle = {
        display: 'flex', // Use flexbox for layout
        flexDirection: 'column', // Arrange items vertically
        alignItems: 'center', // Center items horizontally
        justifyContent: 'center', // Center items vertically
        height: '100vh', // Set the height to the full viewport height
        backgroundColor: '#ADD8E6' // Light blue background
    };

    // Styling for buttons
    const buttonStyle = {
        width: '250px', // Set a fixed width for all buttons
        margin: '10px', // Add margin around buttons
        padding: '15px 30px', // Padding for button content
        fontSize: '18px', // Set font size
        borderRadius: '5px', // Add rounded corners
        backgroundColor: '#00008B', // Dark blue for buttons
        color: 'white', // Text color
        cursor: 'pointer', // Change cursor on hover
        textDecoration: 'none', // Remove underlines from links
        textAlign: 'center', // Center text horizontally
        transition: 'transform 0.1s ease-in-out' // Add transition effect for scaling
    };

    // Styling for the title
    const titleStyle = {
        fontSize: '36px', // Set font size
        fontWeight: 'bold', // Make text bold
        marginBottom: '30px', // Add space below the title
        color: '#00008B' // Dark blue for title
    };

    // Function to handle button click down event
    const handleMouseDown = (e) => {
        e.currentTarget.style.transform = 'scale(0.95)'; // Scale down button on click
    };

    // Function to handle button click up event
    const handleMouseUp = (e) => {
        e.currentTarget.style.transform = 'scale(1)'; // Reset button scale on release
    };

    return (
        <div style={mainMenuStyle}>
            <div style={titleStyle}>妈祖庙进销存管理系统</div>
            {/* Links to various routes with styled buttons */}
            <Link
                to="/new-item"
                style={buttonStyle}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            >
                新建货品
            </Link>
            <Link
                to="/new-stock-in"
                style={buttonStyle}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            >
                入库记录
            </Link>
            <Link
                to="/new-stock-out"
                style={buttonStyle}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            >
                出库记录
            </Link>
            <Link
                to="/statistics"
                style={buttonStyle}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            >
                统计
            </Link>
            <Link
                to="/view-record"
                style={buttonStyle}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            >
                查询记录
            </Link>
        </div>
    );
};

export default MainMenu;
