import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

function Header() {
    return (
    <AppBar position="static" style={{backgroundColor : '#000000'}}>
        <Toolbar>
        <Typography variant="h6">Webnotes</Typography>
        </Toolbar>
    </AppBar>
    );
}

export default Header;
