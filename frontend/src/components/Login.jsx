import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';

const LoginForm = ({ onSwitchMode }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const navigate = useNavigate();
    useEffect(() => (
        sessionStorage.clear()
    ));
    
    const handlesubmit = async (event) => {
        event.preventDefault();
        if(!username){
            setError('username is required');
            return;
        }
        if(!password){
            setError('password is required');
            return;
        }
        try {
            const url = 'https://webnotes-backend-server.onrender.com';
            const data = {
                username : username,
                password : password
            }
            var response = await axios({
                url: url, 
                headers: {
                    'Content-Type': 'application/json',
                },
                data: data,
                method: 'POST'
            });
    
            if(response.status === 200){
                localStorage.setItem("token", response.data.token);
                navigate('/notespage');
            }
            else{
                setError(response.data)
                setTimeout(() => setError(""), 3000);
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setError('User not found.');
            } else if(error.response && error.response.status === 401){
                setError('Please enter correct combination of email and passowrd.');
            }
            else {
                setError('An unexpected error occurred');
            }
            setTimeout(() => setError(''), 3000);
        }
    }
    return (
        <div>
        <form style={{ width: '100%', marginTop: 16 }}>
        <TextField
            label="Username"
            fullWidth
            margin="normal"
            variant="outlined"
            type="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
            label="Password"
            fullWidth
            margin="normal"
            variant="outlined"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
        />
        <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handlesubmit}
        >
            Login
        </Button>
        <Button
            color="secondary"
            fullWidth
            onClick={onSwitchMode}
            mt={2}
        >
            Don't Have an account? Create account
        </Button>
        <Typography  color="error" variant="text">
            {error}
        </Typography>
        </form>
        </div>
    );
};

export default LoginForm;
