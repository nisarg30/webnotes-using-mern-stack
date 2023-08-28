import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import EditNotePopup from './editnotepop'; 
import DeleteIcon from '@mui/icons-material/Delete';

const NoteModal = ({ note, setNewnote , onClose, handleEdit, handleCloseEditPopup, isEditPopupOpen }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const { title, catagory, content, datetime } = note;

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogContent sx={{ padding: '16px', minWidth: '300px', maxWidth: '400px' }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column', 
                        justifyContent: 'space-between', 
                        height: '100%', 
                    }}
                >
                    <div>
                        <Typography variant="subtitle2" gutterBottom>
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
                        <DeleteIcon
                            color="grey"
                            aria-label="delete"
                            onClick={() => {
                                // Handle delete action
                            }}
                            sx={{
                                width: isSmallScreen ? '24px' : '32px', 
                                height: isSmallScreen ? '24px' : '32px',
                                transition: 'width 0.3s, height 0.3s',
                                marginRight: '8px', 
                            }}
                        />
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

                {isEditPopupOpen && (
                    <EditNotePopup
                        note={note}
                        onClose={handleCloseEditPopup}
                        setNoteedited={setNewnote}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default NoteModal;
