// Import useState, useNavigate from 'react' and axios
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import loginImage from '../images/mazu.png'; // Adjust the path according to your file structure

// Define a functional component called Login
const Login = () => {
    // Define state variables username and password using useState hook
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // Use useNavigate hook to handle navigation
    const navigate = useNavigate();

    // Define the base URL of your backend
    const baseURL = `${process.env.REACT_APP_API_URL}/api/login`; // Adjust this URL based on your backend configuration

    // Define handleLogin function to handle login form submission
    const handleLogin = async (e) => {
        // Prevent default form submission behavior
        e.preventDefault();
        try {
            // Send a POST request to the backend with username and password
            const response = await axios.post(baseURL, { username, password });
            // Log the response data for debugging purposes
            console.log(response.data);
            // Store authentication status in local storage upon successful login
            localStorage.setItem('isAuthenticated', 'true');
            // Navigate to the homepage or dashboard upon successful login
            navigate('/');
        } catch (error) {
            // Log error message if authentication fails
            console.error('Authentication failed:', error);
            // Alert the user if login fails
            alert('There is a error: Invalid credentials' + error);
        }
    };

    // Styles for login page
    const loginStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#ADD8E6'
    };

    const inputStyle = {
        margin: '10px',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '2px solid #00008B',
        width: '250px',
        outline: 'none',
        transition: 'border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    };

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
        border: 'none',
        transition: 'background-color 0.3s ease-in-out, transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    };

    const titleStyle = {
        fontSize: '36px',
        fontWeight: 'bold',
        marginBottom: '30px',
        color: '#00008B'
    };

    const imageStyle = {
        maxWidth: '200px',
        marginBottom: '20px',
    };

    // Return the JSX for the login page
    return (
        <div style={loginStyle}>
            {/* Display login image */}
            <img src={loginImage} style={imageStyle} alt="Login" />
            {/* Display login title */}
            <div style={titleStyle}>用户登录</div>
            {/* Login form */}
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Input field for username */}
                <input
                    type="text"
                    placeholder="用户名"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={inputStyle}
                />
                {/* Input field for password */}
                <input
                    type="password"
                    placeholder="密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                />
                {/* Button to submit the form */}
                <button type="submit" style={buttonStyle}>确认</button>
            </form>
        </div>
    );
};

// Export the Login component as default
export default Login;
