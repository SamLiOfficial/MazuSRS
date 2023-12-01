import { Link } from 'react-router-dom';

const MainMenu = () => {
    // Styling for the main menu
    const mainMenuStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#ADD8E6' // Light blue background
    };

    // Styling for buttons
    const buttonStyle = {
        width: '250px', // Set a fixed width for all buttons
        margin: '10px',
        padding: '15px 30px',
        fontSize: '18px',
        borderRadius: '5px',
        backgroundColor: '#00008B', // Dark blue for buttons
        color: 'white',
        cursor: 'pointer',
        textDecoration: 'none',
        textAlign: 'center',
        transition: 'transform 0.1s ease-in-out'  // Add transition effect
    };

    // Styling for the title
    const titleStyle = {
        fontSize: '36px',
        fontWeight: 'bold',
        marginBottom: '30px',
        color: '#00008B' // Dark blue for title
    };

    // Styling for emphasized text
    const emphasizedText = {
        fontWeight: 'bold'
    };

    // Function to handle button click down event
    const handleMouseDown = (e) => {
        e.currentTarget.style.transform = 'scale(0.95)';
    };

    // Function to handle button click up event
    const handleMouseUp = (e) => {
        e.currentTarget.style.transform = 'scale(1)';
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
