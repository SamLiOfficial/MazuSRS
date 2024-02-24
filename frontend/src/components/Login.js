// Import useState, useNavigate from 'react' and axios
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import loginImage from '../images/mazu.png'; // Adjust the path according to your file structure

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Define the base URL of your backend
    const baseURL = `${process.env.REACT_APP_API_URL}/api/login`; // Adjust this URL based on your backend configuration

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(baseURL, { username, password });
            console.log(response.data); // For debugging purposes, to see the backend response
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/'); // Navigate to the homepage or dashboard upon successful login
        } catch (error) {
            console.error('Authentication failed:', error);
            alert('There is a error: Invalid credentials' + error); // Alert the user if login fails
        }
    };

    // Styles
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

    return (
        <div style={loginStyle}>
            <img src={loginImage} style={imageStyle} alt="Login" />
            <div style={titleStyle}>Login BIG</div>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={inputStyle}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                />
                <button type="submit" style={buttonStyle}>Login</button>
            </form>
        </div>
    );
};

export default Login;
