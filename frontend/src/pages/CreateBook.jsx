//importing important functionalities
import {useState} from 'react';
import {Grid, TextField, Container, Button, Typography} from '@mui/material';
import {ArrowForward} from '@mui/icons-material';
import Loader from '../components/Loader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import AlertSnackbar from '../components/AlertSnackbar';


const CreateBook = () => {

  const [title, setTitle] = useState(''); //creating state for title of books
  const [author, setAuthor] = useState(''); //creating state for author of books
  const [publishYear, setPublishYear] = useState(''); //creating state for Publish Year of books
  const [synopsis, setSynopsis] = useState(''); //creating state for Publish Year of books
  const [loading, setLoading] = useState(false); //creating state for loading functionality
  const [image, setImage] = useState(null); //creating state for image functionality
  const [snackbarOpen, setSnackbarOpen] = useState(false); //state for snackbar functionality
  const navigate = useNavigate();

  const handleSaveBook = () => {
    const formData = new FormData(); //object for http body request in key/value pairs
    formData.append('title', title); 
    formData.append('author', author);
    formData.append('publishYear', publishYear);
    formData.append('synopsis', synopsis);
    formData.append('image', image);

    setLoading(true);
    axios.post('http://localhost:5555/books', formData)
        .then(() => {
            setSnackbarOpen(true);
            setTimeout(() => {
            navigate('/'); // Delay navigation to allow Snackbar to be displayed
            }, 3250);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
          // Add a delay before setting loading to false (e.g., 500 milliseconds)
          setTimeout(() => {
              setLoading(false);
          }, 400);
      });
  };

  return (
    <Container sx={{my: 20,display: 'flex', justifyContent: 'center'}}>
      <Grid container spacing={3} sx={{width: {xs: '95%',sm: '80%', md: '70%' }}}>
        <Grid item xs={12}>
          <BackButton/>
        </Grid>
        <Grid item xs={12}>
          <Typography component="h1" variant='h4'>
            Create Book
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {
            loading ? <Loader item xs={12}/> : '' //first checking loading state before rendering data
          } 
        </Grid> 
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
        <Grid item xs={12}>
        <TextField
          required
          id="synopsis"
          name="synopsis"
          label="Synopsis"
          fullWidth
          variant="outlined"
          multiline
          maxRows={4}
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
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
            color='info'
          >
            Submit
          </Button>
        </Grid>
      </Grid>
      <AlertSnackbar open={snackbarOpen} onClose={() => setSnackbarOpen(false)} message="Book Created Succesfully!"/>
    </Container>
  )
}

export default CreateBook