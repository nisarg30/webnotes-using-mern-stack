import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditNotePopup = ({ note, onClose, setNoteedited }) => {
    const [editedNote, setEditedNote] = useState({ ...note });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedNote((prevNote) => ({
        ...prevNote,
        [name]: value,
        }));
    };

    const handleSaveChanges = async (event) => {
    event.preventDefault();
        if(!editedNote.title){
            setError('Title is required');
            setTimeout(() => setError(""), 3000);
            return;
        }
        if(!editedNote.content){
            setError('content is required');
            setTimeout(() => setError(""), 3000);
            return;
        }
    
        try {
            const url = 'https://webnotes-backend-server.onrender.com/modifynote';
            const data = {
                noteId : note.id,
                title : editedNote.title,
                catagory : editedNote.catagory,
                content : editedNote.content
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
                setNoteedited(true);
                onClose();
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
        <Dialog open={true} onClose={onClose}>
        <DialogTitle>Edit Note</DialogTitle>
        <DialogContent>
            <TextField
            label="Title"
            name="title"
            value={editedNote.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            />
            <TextField
            label="Category"
            name="catagory"
            value={editedNote.catagory}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            />
            <TextField
            label="Content"
            name="content"
            value={editedNote.content}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
            />
            <Typography variant="caption" color="textSecondary">
            Date: {editedNote.datetime}
            </Typography>
            <Typography variant='error'>
                {error}
            </Typography>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleSaveChanges} color="primary">
            Save Changes
        </Button>
        <Button onClick={onClose} color="secondary">
            Cancel
        </Button>
        </DialogActions>
    </Dialog>
    );
};

export default EditNotePopup;
