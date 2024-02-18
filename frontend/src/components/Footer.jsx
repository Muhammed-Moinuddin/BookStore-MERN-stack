import {Grid, TextField, Container, Button, Typography, AppBar, Toolbar, Box, IconButton, Divider} from '@mui/material';
import { Link } from 'react-router-dom';
import { Code, LinkedIn, GitHub, EmojiEmotions } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Container sx={{pt:3, pb: 2}}>
          <Toolbar>
            <Grid container justifyContent="space-evenly" alignItems="center">
              <Grid xs={12} md={6} sx={{textAlign: "left"}} >
                <Typography variant="body1" sx={{color: "#000" , backgroundColor: "#E6D72A", p: 1, maxWidth: "fit-content", borderRadius: 1}}>
                  © {new Date().getFullYear()} Book Store App. All rights reserved.
                </Typography>
              </Grid>
              <Grid xs={12} md={6} sx={{textAlign: "right"}}>
                <Button startIcon={<LinkedIn />} variant="contained" color='info' sx={{ marginLeft: 1 }}>
                  LinkedIn
                </Button>
                <Button startIcon={<GitHub />} variant="contained" color='info' sx={{ marginLeft: 1 }}>
                  Github
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
        <Divider variant="middle" color="#fff"/>
        <Container sx={{pt:3, pb: 4}}>
          <Typography variant="body1" color="#000" sx={{textAlign: "center"}}>
            <strong>Design and Developed by M.Moinuddin</strong>
          </Typography>
      </Container>
      </AppBar>
    </Box>
    
  )
}

export default Footer;