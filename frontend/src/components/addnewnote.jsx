import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button, TextField, Typography, Grid, Fab } from '@mui/material'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Addnewnote({ setNewnote }) {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [catagory, setCatagory] = useState('');
    const [Content, setContent] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleAddClick = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handlesubmit = async (event) => {
        event.preventDefault();
        if(!title){
            setError('Title is required');
            setTimeout(() => setError(""), 3000);
            return;
        }
        if(!Content){
            setError('content is required');
            setTimeout(() => setError(""), 3000);
            return;
        }
        
        try {
            const url = 'http://localhost:8080/addnewnote';
            const data = {
                title : title,
                catagory : catagory,
                content : Content
            }
            const token = localStorage.getItem('token');
            if(!token){
                navigate('/');
            }
            var response = await axios({
                url: url, 
                headers: {
                    'Content-Type': 'application/json',
                    'authorization' : token
                },
                data: data,
                method: 'POST'
            });
            if(response.status === 200){
                setCatagory('');
                setTitle('');
                setContent('');
                setError('');
                setNewnote(true);
                handleCloseModal();
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
        <div className="add-new-note">
        <IconButton
            onClick={handleAddClick}
        >
        <Fab color="primary" aria-label="add" size='medium'>
            <AddIcon />
        </Fab>
        </IconButton>

        <Modal
            open={showModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-title"
        >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>

            <h2 id="modal-title">Add New Note</h2>
            <form style={{ width: '100%', marginTop: 16 }}>
            <Grid container spacing={2} alignContent="column">
            <Grid item xs={6} >
                <TextField
                    label="Title"
                    autoComplete='off'
                    fullWidth
                    variant="standard"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Category"
                    autoComplete='off'
                    fullWidth
                    variant="standard"
                    type="text"
                    required
                    value={catagory}
                    onChange={(e) => setCatagory(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} >
                <TextField
                    label="Content"
                    autoComplete='off'
                    fullWidth
                    multiline
                    rows={10}
                    variant="standard"
                    type="text"
                    required
                    value={Content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{ overflowY: 'auto', zIndex : 10 }}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography  color="error" variant="text">
                    {error}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handlesubmit}
                >
                    Add
                </Button>
            </Grid>
            </Grid>
            </form>
            </Box>
        </Modal>
        </div>
    );
}
export default Addnewnote;