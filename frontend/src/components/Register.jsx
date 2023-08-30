import React from 'react';
import { useState, useEffect } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';

const RegisterForm = ({ onSwitchMode }) => {

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setcPassword] = useState('')
  const [error, setError] = useState('');

  useEffect(() => (
    sessionStorage.clear()
  ));

  const handlesubmit = async (event) => {
    event.preventDefault();
    if(!username){
        setError('username is required');
        return;
    }
    if(!email){
        setError('email is required');
        return;
    }
    if(!password){
        setError('password is required');
        return;
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
      setError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }
    
    if(!cpassword){
        setError('confirm password is required');
        return;
    }

    if(cpassword !== password){
      setError('passwords did not matched');
      return;
    }

    try {
        const url = 'https://webnotes-backend-server.onrender.com/reg';
        const data = {
            username : username,
            email : email,
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
            onSwitchMode();
        }
        else{
            setError(response.data)
            setTimeout(() => setError(""), 3000);
        }
    } catch (error) {
        if (error.response && error.response.status === 409) {
            setError('User already exist.');
        } else {
            setError('An unexpected error occurred.');
        }
        setTimeout(() => setError(''), 5000);
    }
  }

  return (
    <form style={{ width: '100%', marginTop: 16 }}>
      <TextField
        label="Username"
        fullWidth
        margin="normal"
        variant="outlined"
        type="text"
        required
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        variant="outlined"
        type="email"
        required
        onChange={(e) => setEmail(e.target.value)}
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
      <TextField
        label="Confirm Password"
        fullWidth
        margin="normal"
        variant="outlined"
        type="password"
        required
        onChange={(e) => setcPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handlesubmit}
      >
        Register
      </Button>
      <Button
        color="secondary"
        fullWidth
        onClick={onSwitchMode}
      >
        Switch to Login
      </Button>
      <Typography  color="error" variant="text">
            {error}
      </Typography>
    </form>
  );
};

export default RegisterForm;
