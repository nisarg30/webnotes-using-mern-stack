import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Addnewnote from "./addnewnote";
import { ExitToApp } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 100; // Adjust the width as needed

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
  },
}));

export default function Sidebar({ setNewNote }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
    
  return (
    <StyledDrawer variant="permanent" anchor="left">
      <List style={{ position: 'relative', height: '100%', backgroundColor : '#000000' }}>
        <ListItem>
          <Addnewnote setNewnote={setNewNote} />
        </ListItem>
        <ListItem>
          <ListItemIcon style={{ marginLeft: "5px" }}>
            <IconButton onClick={handleLogout} size="large" style={{color : '#ffffff'}}>
              <ExitToApp fontSize="inherit" /> {/* Logout icon */}
            </IconButton>
          </ListItemIcon>
        </ListItem>
      </List>
    </StyledDrawer>
  );
}
