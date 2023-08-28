import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteNotepop = ({ note, onClose, setdeletenote }) => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleDelete= async (event) => {
    event.preventDefault();
        try {
            const url = 'http://localhost:8080/deletenote';
            const data = {
                noteId : note.id,
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
                onClose();
                setdeletenote();
            }
            else{
                setError(response.data)
                setTimeout(() => setError(""), 3000);
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setError('updatation error');
            } else {
                console.log(error);
                setError('An unexpected error occurred.');
            }
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        <Dialog open={true} onClose={() => {onClose(false)}}>
        <DialogTitle>Are you sure you want to delete this note?</DialogTitle>
        <DialogContent>
            <Typography variant='error'>
                {error}
            </Typography>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleDelete} color="primary">
            Delete
        </Button>
        <Button onClick={onClose} color="secondary">
            Cancel
        </Button>
        </DialogActions>
    </Dialog>
    );
};

export default DeleteNotepop;
