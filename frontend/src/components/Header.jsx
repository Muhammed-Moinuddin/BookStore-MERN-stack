import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, IconButton, ButtonGroup, Button, CssBaseline, Drawer, Divider, List, ListItem} from '@mui/material';
import {Menu, AddBox, TableChartOutlined, StyleOutlined} from '@mui/icons-material';

const drawerWidth = 240;

const Header = (props) => {

    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    }
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
           <Typography variant="h5" sx={{ my: 2 }}>
                Book Store App
            </Typography>
            <Divider />
            <List>
                <ListItem>
                <Button startIcon={<TableChartOutlined />} sx={{ mx: 6 }}>Table View</Button>
                </ListItem>
                <ListItem>
                    <Button startIcon={<StyleOutlined />} sx={{ mx: 6 }}>Card View</Button>
                </ListItem>
                
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window.document.body : undefined;
  return (
    <Box sx={{ display: 'flex', zIndex: 100}}>
        <CssBaseline />
        <AppBar component="nav" position="fixed">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }} 
                    >
                    <Menu />
                </IconButton>
                <Typography
                    variant="h5"
                    component="div"
                    color='info'
                >
                    Book Store App
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <ButtonGroup variant="contained" aria-label="Basic button group"sx={{ display: { xs: 'none', sm: 'block' }}}>
                    <Button startIcon={<TableChartOutlined />} color='info'>Table View</Button>
                    <Button startIcon={<StyleOutlined />} color='info'>Card View</Button>
                </ButtonGroup> 
                <Box sx={{ flexGrow: 1 }} />
                <Button component={Link} to="/books/create" variant="contained" aria-label="Basic button group" startIcon={<AddBox />} color='info'>
                    Add Book
                </Button>
            </Toolbar>
        </AppBar>
        <Toolbar/>
        <nav>
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box',  },
                }}
                >
                {drawer}
            </Drawer>
        </nav>
    </Box>
  )
}

export default Header;