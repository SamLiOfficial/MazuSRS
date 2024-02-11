// Login.js

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Styling similar to MainMenu.js
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
        border: '2px solid #00008B', // Make the border slightly thicker for better visual impact
        width: '250px',
        outline: 'none', // Removing the default outline
        transition: 'border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out', // Smooth transition for border color and shadow
    };

    const buttonStyle = {
        width: '250px',
        margin: '10px',
        padding: '15px 30px',
        fontSize: '18px',
        borderRadius: '5px',
        backgroundColor: '#00008B', // Original background color
        color: 'white',
        cursor: 'pointer',
        textDecoration: 'none',
        textAlign: 'center',
        border: 'none',
        transition: 'background-color 0.3s ease-in-out, transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out', // Smooth transition for background color, transform, and shadow
    };

    const titleStyle = {
        fontSize: '36px',
        fontWeight: 'bold',
        marginBottom: '30px',
        color: '#00008B'
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'correctUsername' && password === 'correctPassword') {
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div style={loginStyle}>
            <div style={titleStyle}>Login</div>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={inputStyle}
                    onFocus={(e) => {
                        e.target.style.borderColor = '#007BFF'; // Change border color to a bright color on focus
                        e.target.style.boxShadow = '0 0 8px #007BFF'; // Add a glowing shadow effect
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = '#00008B'; // Revert to original border color
                        e.target.style.boxShadow = 'none'; // Remove the shadow
                    }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle} // Using the same styled inputStyle as for the username input
                    onFocus={(e) => {
                        e.target.style.borderColor = '#007BFF'; // Change border color to a bright color on focus
                        e.target.style.boxShadow = '0 0 8px #007BFF'; // Add a glowing shadow effect
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = '#00008B'; // Revert to original border color
                        e.target.style.boxShadow = 'none'; // Remove the shadow
                    }}
                />
                <button
                    type="submit"
                    style={buttonStyle}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#007BFF'; // Change background color on hover
                        e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)'; // Add a subtle shadow for depth
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#00008B'; // Revert to original background color
                        e.target.style.boxShadow = 'none'; // Remove the shadow
                    }}
                    onMouseDown={(e) => {
                        e.target.style.transform = 'scale(0.98)'; // Slightly scale down the button on click
                    }}
                    onMouseUp={(e) => {
                        e.target.style.transform = 'scale(1)'; // Reset button scale on release
                    }}
                >Login</button>
            </form>
        </div>
    );
};

export default Login;
