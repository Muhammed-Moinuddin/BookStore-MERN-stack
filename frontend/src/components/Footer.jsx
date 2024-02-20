//importing important functionalities
import {Grid, Container, Button, Typography, AppBar, Toolbar, Box, Divider} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { LinkedIn, GitHub } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Container sx={{pt:3, pb: 2}}>
          <Toolbar>
            <Grid container justifyContent="space-evenly" alignItems="center">
              <Grid xs={12} sm={6} sx={{textAlign: "center"}} >
                <Typography variant="body1" sx={{color: "#000" , backgroundColor: "#E6D72A", p: 1, mb: 1, maxWidth: "fit-content", borderRadius: 1}}>
                  © {new Date().getFullYear()} Book Store App. All rights reserved.
                </Typography>
              </Grid>
              <Grid xs={12} sm={6} sx={{textAlign: "center", mb: 1}} >
                <Button component={NavLink} to="https://www.linkedin.com/in/muhammad-moinuddin-software-developer/" target="_blank" startIcon={<LinkedIn />} variant="contained" color='info' sx={{ marginLeft: 1 }}>
                  LinkedIn
                </Button>
                <Button component={NavLink} to="https://github.com/Muhammed-Moinuddin" target="_blank" startIcon={<GitHub />} variant="contained" color='info' sx={{ marginLeft: 1 }}>
                  Github
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
        <Divider variant="middle" color="#fff"/>
        <Container sx={{pt:3, pb: 4}}>
          <Typography variant="body1" sx={{ textAlign: "center", color: "#000" }}>
            <strong>Design and Developed by M.Moinuddin</strong>
          </Typography>
        </Container>
      </AppBar>
    </Box>
    
  )
}

export default Footer;