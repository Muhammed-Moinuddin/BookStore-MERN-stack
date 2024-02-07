import React from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';

const Header = () => {
  return (
    <>
      <Box sx={{ backgroundColor: '#262228', height: '10px' }}>
        {/* Content or styling for the first Box */}
      </Box>
      <Box sx={{ display: 'flex', backgroundColor: 'blue' }}>
        <AppBar position='fixed' sx={{ backgroundColor: '#262228' }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{ mr: 2, display: { sm: 'none' } }}
            ></IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              MUI
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}></Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
