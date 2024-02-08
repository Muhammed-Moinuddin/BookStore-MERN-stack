import React from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, ButtonGroup, Button} from '@mui/material';
import {DeleteForever, Menu} from '@mui/icons-material';

const navItems = ['Home', 'About', 'Contact'];

const Header = () => {
  return (
    <Box sx={{ display: 'flex'}}>
        <AppBar component="nav">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    >
                    <Menu />
                </IconButton>
                <Typography
                    variant="h6"
                    component="div"
                >
                    Book Store App
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <ButtonGroup variant="contained" aria-label="Basic button group">
                    <Button>Table View</Button>
                    <Button>Card View</Button>
                </ButtonGroup> 
                <Box sx={{ flexGrow: 1 }} />
                <Button variant="contained" aria-label="Basic button group" startIcon={<DeleteForever />}>
                    Delete
                </Button> 
            </Toolbar>

        </AppBar>
    </Box>
  )
}

export default Header;