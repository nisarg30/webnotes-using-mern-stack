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
import DeleteNote from './delete';

const darkGradients = [
  'radial-gradient(circle, #0A0E14, #1A1D26)',
  'radial-gradient(circle, #2E0B0B, #1A1A26)',
  'radial-gradient(circle, #1C1C1C, #303030)',
  'radial-gradient(circle, #0A1822, #162138)',
  'radial-gradient(circle, #1E1E1E, #2E2E2E)',
  'radial-gradient(circle, #141822, #1E2C3A)',
  'radial-gradient(circle, #1B0E1B, #0C1E2C)',
  'radial-gradient(circle, #242B34, #162028)',
  'radial-gradient(circle, #130F19, #1F0D30)',
  'radial-gradient(circle, #161616, #2C2C2C)',
  'radial-gradient(circle, #0F1119, #1A1C26)',
  'radial-gradient(circle, #1E232E, #11161F)',
  'radial-gradient(circle, #1A1C1F, #0F1828)',
  'radial-gradient(circle, #171B1E, #272D30)',
  'radial-gradient(circle, #181B20, #272A2F)',
  'radial-gradient(circle, #14121E, #3D142D)',
  'radial-gradient(circle, #1B1125, #371A32)',
  'radial-gradient(circle, #1E1E1E, #2E2E2E)',
  'radial-gradient(circle, #0F0F0F, #252525)',
  'radial-gradient(circle, #0D1B1E, #173023)',
];

const getRandomGradient = () => {
  const randomIndex = Math.floor(Math.random() * darkGradients.length);
  return darkGradients[randomIndex];
};

const NoteCard = ({ note, setNewnote, setdeleteNote }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { title, catagory, content, datetime } = note;

  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [iszoomIN, setZoomin] = useState(false);
  const [deleteNote, setDelete] = useState(false);
  const [backgroundGradient, setBackgroundGradient] = useState(getRandomGradient());

  const handleEdit = () => {
    setIsEditPopupOpen(true);
  };

  const handleCloseEditPopup = () => {
    setIsEditPopupOpen(false);
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
  };

  return (
    <Paper elevation={10} sx={{ marginBottom: '16px', width: '320px', height: '350px', padding : '2px' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          background: backgroundGradient,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius : '10px'
        }}
      >
        <div>
          <Typography variant="h4" ml={1} gutterBottom style={{ color : '#ffffff', padding: '5px', borderRadius: '5px' }} mr={1} mt={1}>
            {title}
          </Typography>
          <Typography color="textSecondary" ml={1} variant="h5" gutterBottom style={{ color : '#ffffff', padding: '5px', borderRadius: '5px' }} mr={1} mt={1}>
            {catagory}
          </Typography>
        </div>
        <Typography
          variant="body1"
          paragraph
          ml={1}
          mr={1}
          mt={1}
          style={{
            maxHeight: '160px',
            overflowY: 'auto',
            marginTop: '8px',
            marginBottom: '8px',
            color : '#ffffff',
            padding: '5px',
            borderRadius: '5px'
          }}
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
          <Typography color="textSecondary" style={{ marginRight: 'auto', color : '#ffffff', padding: '5px', borderRadius: '5px' }} ml={1} variant="h5">
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
            style={{ color: 'orange' }}
          />
          <DeleteIcon
            color="white"
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
            style={{ color: 'white' }}
          />
          <Fab
            color="primary"
            aria-label="edit"
            onClick={handleEdit}
            sx={{
              width: isSmallScreen ? '24px' : '32px',
              height: isSmallScreen ? '24px' : '32px',
              transition: 'width 0.3s, height 0.3s',
              marginRight: '10px',
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
