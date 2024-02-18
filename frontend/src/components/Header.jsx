import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, Button, CssBaseline} from '@mui/material';
import {AddBox} from '@mui/icons-material';


const Header = (props) => {

  return (
    <Box sx={{ display: 'flex', zIndex: 100}}>
        <CssBaseline />
        <AppBar component="nav" position="fixed">
            <Toolbar>
                <Typography
                    variant="h5"
                    component="div"
                    color='info'
                >
                    Book Store App
                </Typography>
                
                <Box sx={{ flexGrow: 1 }} />
                <Button component={Link} to="/books/create" variant="contained" aria-label="Basic button group" startIcon={<AddBox />} color='info'>
                    Add Book
                </Button>
            </Toolbar>
        </AppBar>
        <Toolbar/>
        
    </Box>
  )
}

export default Header;