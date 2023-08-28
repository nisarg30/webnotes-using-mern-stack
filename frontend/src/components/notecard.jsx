import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import EditNotePopup from './editnotepop'; 
import DeleteIcon from '@mui/icons-material/Delete';
import NoteModal from './notezoom';
import DeleteNote from './delete'

const NoteCard = ({ note, setNewnote, setdeleteNote }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { title, catagory, content, datetime } = note;

  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false); // State for managing pop-up visibility
  const [iszoomIN, setZoomin] = useState(false);
  const [deleteNote, setDelete] = useState(false);

  const handleEdit = () => {
    setIsEditPopupOpen(true); // Open the pop-up when the Edit button is clicked
  };

  const handleCloseEditPopup = () => {
    setIsEditPopupOpen(false); // Close the pop-up when needed
  };

  const handleZoom = () => {
    setZoomin(true); 
  };

  const handlecloseZoom = () => {
    setZoomin(false); 
  };

  const handleclosedelete = () => {
    setDelete(false); 
  };

  const handledeleterefresh = () => {
    setdeleteNote(true);
  }

  return (
    <Paper elevation={3} sx={{ padding: '16px', marginBottom: '16px', width: '300px', height: '320px' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column', 
          justifyContent: 'space-between', 
          height: '100%', 
        }}
      >
        <div>
            <Typography variant="subtitle1" gutterBottom>
              {title}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {catagory}
            </Typography>
        </div>
        <Typography
          variant="body1"
          paragraph
          style={{ maxHeight: '160px', overflowY: 'auto', marginTop: '8px', marginBottom: '8px' }}
        >
          {content}
        </Typography>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginBottom: '4px',
          }}
        >
          <Typography color="textSecondary" style={{ marginRight: 'auto' }}>
            {datetime}
          </Typography>
          <OpenInFullIcon
            color="secondary"
            aria-label="expand"
            onClick={() => {
              handleZoom();
            }}
            sx={{
              width: isSmallScreen ? '24px' : '32px', 
              height: isSmallScreen ? '24px' : '32px',
              transition: 'width 0.3s, height 0.3s',
              marginRight: '8px', 
            }}
          > 
          </OpenInFullIcon>
          <DeleteIcon
            color="grey"
            aria-label="delete"
            onClick={() => {
              setDelete(true);
            }}
            sx={{
              width: isSmallScreen ? '24px' : '32px', 
              height: isSmallScreen ? '24px' : '32px',
              transition: 'width 0.3s, height 0.3s',
              marginRight: '8px', 
            }}
          >
          </DeleteIcon>
          <Fab
            color="primary"
            aria-label="edit"
            onClick={handleEdit}
            sx={{
              width: isSmallScreen ? '24px' : '32px', 
              height: isSmallScreen ? '24px' : '32px',
              transition: 'width 0.3s, height 0.3s',
            }}
          >
            <EditIcon fontSize="small" /> 
          </Fab>
        </div>
      </div>
      
      {iszoomIN && (
        <NoteModal
          note={note}
          onClose={handlecloseZoom}
          setNoteedited={setNewnote}
          handleCloseEditPopup={handleCloseEditPopup}
          handleEdit={handleEdit}
          isEditPopupOpen={isEditPopupOpen}
        />
      )}

      {isEditPopupOpen && (
        <EditNotePopup
          note={note}
          onClose={handleCloseEditPopup}
          setNoteedited={setNewnote}
        />
      )}

      {deleteNote && (
        <DeleteNote
          note={note}
          onClose={handleclosedelete}
          setdeletenote={handledeleterefresh}
        />
      )}
    </Paper>
  );
};

export default NoteCard;
