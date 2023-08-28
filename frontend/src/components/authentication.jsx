import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import LoginForm from './Login';
import RegisterForm from './Register';
import Header from './header';

const LoginRegisterPage = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);

    const toggleMode = () => {
        setIsLoginMode((prevMode) => !prevMode);
    };

    return (
        <div>
        <Header />
        <Container
        maxWidth="xs"
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
        }}
        >
        <Typography variant="h4" align="center">
            {isLoginMode ? 'Login' : 'Register'}
        </Typography>

        {isLoginMode ? (
            <LoginForm onSwitchMode={toggleMode}  />
        ) : (
            <RegisterForm onSwitchMode={toggleMode} />
        )}
        </Container>
        </div>
    );
};

export default LoginRegisterPage;
