import {useEffect, useState} from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import Loader from '../components/Loader';
import ImageUtils from '../components/ImageUtils';
import { Card, CardContent, CardMedia, Box, Typography, Grid, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';

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
        <Box sx={{mt: 20, display: 'flex', justifyContent: 'center'}}> {/*root node*/}
         {loading ? (<Loader/>) : (  //first checking loading state before rendering data
            // <Box sx={{display: 'flex', justifyContent: 'center', p: 1, mt: 4, width: {xs: '70%',sm: '50%', md: '40%' }}}>
            //     <Box component="img" src={imageData}  sx={{objectFit: "contain", width: "50%", p: 2}} title={"Cover from " + book.title}></Box>
            //     <Box><Typography variant="body1" color="initial" sx={{p: 2, width: "100%"}}>{book.synopsis}</Typography></Box>
            // </Box>
            <Grid container justifyContent="center" alignItems="center" component={Paper} sx={{ width: {xs: '80%',sm: '60%', md: '40%'}, padding: '20px' }}>
                <Grid item xs={12} sm={6} >
                    {/* Textual Content */}
                    <Typography variant="body1" color="text.secondary" sx={{pb: 3, backgroundColor: "blue" , width: "fit-content"}}>
                        Publish Year: {book.publishYear}
                    </Typography>
                    <Typography variant="h4" sx={{pb: 0}}>
                        {book.title}
                    </Typography>
                    <Typography variant="h5" color="text.secondary" sx={{pb: 3}}>
                        By {book.author}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {book.synopsis}
                    </Typography>
                    
                </Grid>
                <Grid item xs={12} sm={6}>
                    {/* Image */}
                    <img src={imageData} alt="Your Image" style={{ maxWidth: '100%', height: 'auto' }} />
                </Grid>
            </Grid>
            // <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            //     <Grid item xs={6}>
            //         <Card sx={{width: {xs: '70%',sm: '50%', md: '30%' }}}>
            //             <CardMedia
            //             sx={{objectFit: "cover"}}
            //             image={imageData}
            //             title={"Cover from " + book.title}
            //             component="img"
            //             />
            //         </Card>   
            //     </Grid>
            //     <Grid item xs={6}>
            //         <Card sx={{width: {xs: '70%',sm: '50%', md: '30%' }}}>
            //             <CardContent>
            //                 <Typography gutterBottom variant="h5" component="div" sx={{textTransform: 'uppercase', fontWeight: 'bold'}}>
            //                     {book.title}
            //                 </Typography>
            //                 <Typography variant="body2" color="text.secondary">Synopsis: {book.synopsis} </Typography>
            //             </CardContent>
            //         </Card>
            //     </Grid>
            // </Grid>
            
        )}
        </Box>
    )}
export default ShowBook;