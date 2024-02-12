import React, {useState} from 'react';
import {Box, Grid, TextField, Container, Button, IconButton, Typography, Input} from '@mui/material';
import {ArrowBack, ArrowForward} from '@mui/icons-material';
import Loader from '../components/Loader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CreateBook = () => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSaveBook = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('publishYear', publishYear);
    formData.append('image', image);

    setLoading(true);
    axios.post('http://localhost:5555/books', formData)
        .then(() => {
            navigate('/')
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
          // Add a delay before setting loading to false (e.g., 500 milliseconds)
          setTimeout(() => {
              setLoading(false);
          }, 500);
      });
  };

  return (
    <Container sx={{mt: 20,display: 'flex', justifyContent: 'center'}}>
      <Grid container spacing={3} sx={{width: '60%'}}>
        <Grid item xs={12}>
        <Button startIcon={<ArrowBack/>} variant="outlined">Back</Button>
        </Grid>
        <Grid item xs={12}>
          <Typography component="h1" variant='h4'>
            Create Book
          </Typography>
        </Grid>
        {loading ? <Loader/> : ''}
         <Grid item xs={12}>
          <TextField
            required
            id="bookTitle"
            name="bookTitle"
            label="Book Title"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="bookAuthor"
            name="bookAuthor"
            label="Book Author"
            fullWidth
            variant="outlined"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            required
            id="publishYear"
            name="publishYear"
            label="Publish Year"
            fullWidth
            variant="outlined"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}> 
          <TextField
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          id="image-upload"
        />
        </Grid>
        <Grid item xs={12}>
          <Button
            endIcon={<ArrowForward/>}
            variant="contained"
            onClick={handleSaveBook}
          >
            Submit
          </Button>
        </Grid>
        
      </Grid>
    </Container>
  )
}

export default CreateBook