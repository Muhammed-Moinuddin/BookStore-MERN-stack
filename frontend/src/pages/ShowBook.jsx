import {useEffect, useState} from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import Loader from '../components/Loader';
import ImageUtils from '../components/ImageUtils';
import {Box, Typography, Grid, Paper, Snackbar } from '@mui/material';
import { useParams } from 'react-router-dom';


const dateOptions = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
const ShowBook = () => {

    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const [imageData, setImageData] = useState([]); //state for setting up books data
    const {id} = useParams();

    useEffect(() => {
        setLoading(true);
    
        axios.get(`http://localhost:5555/books/${id}`)
            .then((res) => {
                setBook(res.data);
                const images = ImageUtils(res.data);
                setImageData(images);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 400);
            });
    }, [id]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            >
        <BackButton/>
         {loading ? (<Loader/>) : (  //first checking loading state before rendering data
            <Grid container justifyContent="center" alignItems="center" component={Paper} sx={{ width: {xs: '80%',sm: '60%', md: '40%'}, p: 2, boxShadow: '5px' }}> 
                <Grid item xs={12} sm={6} sx={{p: 2}}>
                    {/* Textual Content */}
                    <Typography variant="body1" color="text.secondary" sx={{mb: 3, px:2, py:1, borderRadius: '25px', backgroundColor: 'secondary.main' , width: "fit-content"}}>
                        Publish Year: {book.publishYear}
                    </Typography>
                    <Typography variant="h4" sx={{pb: 0}}>
                        {book.title}
                    </Typography>
                    <Typography variant="h5" color="text.secondary" sx={{pb: 3}}>
                        By {book.author}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" >
                        {book.synopsis}
                    </Typography>
                    <span></span>
                    <Typography variant="body1" color="text.secondary" sx={{pt: 3}}>
                        <strong>Created At :</strong> {new Date(book.createdAt).toLocaleDateString(undefined, dateOptions)}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{pt: 3}}>
                        <strong>Created At :</strong> {new Date(book.updatedAt).toLocaleDateString(undefined, dateOptions)}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    {/* Image */}
                    <img src={imageData} alt="Your Image" style={{ maxWidth: '100%', height: 'auto' }} />
                </Grid>
            </Grid>    
        )}
        </Box>
    )}
export default ShowBook;