import {useEffect, useState} from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import Loader from '../components/Loader';
import { Card, CardContent, CardMedia, CardHeader, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

const ShowBook = () => {

    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:5555/books/${id}`)
        .then(
            (res) => {
                setBook(res.data);
            }
        )
        .catch((err) => { // Code executed on error
            console.log(err);
        })
        .finally(() => { // Code executed regardless of success or error
            // Adding a delay before setting loading to false (e.g., 500 milliseconds)
            setTimeout(() => {
                setLoading(false);
            }, 400);
        });
    }, [])

    return (
        <Box sx={{mt: 10, display: 'flex', justifyContent: 'center'}}> {/*root node*/}
         {loading ? (<Loader/>) : (  //first checking loading state before rendering data
            <Card>
                 <CardMedia
                    component="img"
                    height="140"
                    image={book.image}
                    alt="green iguana"
                    />
            </Card>
        )}
        </Box>
    )}
export default ShowBook;