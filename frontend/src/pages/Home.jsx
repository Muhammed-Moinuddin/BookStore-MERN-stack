import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import {Table,TableHead, TableBody, TableCell, TableContainer, TableRow, Paper, Box, Link, IconButton} from  '@mui/material';
import {DeleteForever, EditNote, Info} from '@mui/icons-material';


const Home = () => {
    const [book, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imageData, setImageData] = useState([]);

    console.log(book);


    useEffect(() => {
        setLoading(true); 
        axios
        .get('http://localhost:5555/books')
        .then((res) => {
            setBooks(res.data.data);
            // Extract and convert image data to base64
            const images = res.data.data.map((book) => {
                const bufferData = new Uint8Array(book.image.data.data);
                const blob = new Blob([bufferData], { type: book.image.contentType });
                const urlCreator = window.URL || window.webkitURL;
                const imageUrl = urlCreator.createObjectURL(blob);
                return imageUrl;
            });
            setImageData(images);
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
    },[])
  
    return (
        <Box sx={{mt: 10, display: 'flex', justifyContent: 'center'}}> {/*root node*/}
         {loading ? (<Loader/>) : (
            <TableContainer component={Paper} sx={{ m: 2, maxWidth: '80%'}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">No</TableCell>
                            <TableCell align="center">Cover Page</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Author</TableCell>
                            <TableCell align="center">Publish Year</TableCell>
                            <TableCell align="center">Operations</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {book.map((bookItem, index) => (
                            
                            <TableRow
                            key={bookItem._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell align="center">
                                {index + 1}
                            </TableCell>
                            <TableCell align="center">
                                <img
                                    src={imageData[index]}
                                    alt={`Cover for ${bookItem.title}`}
                                    style={{ maxWidth: '50px', maxHeight: '50px' }}
                                />
                            </TableCell>
                            <TableCell align="center">{bookItem.title}</TableCell>
                            <TableCell align="center">{bookItem.author}</TableCell>
                            <TableCell align="center">{bookItem.publishYear}</TableCell>
                            <TableCell align="center">
                                {bookItem.title}
                            </TableCell>
                            <TableCell align="center">
                                {bookItem.author}
                            </TableCell>
                            <TableCell align="center">
                                {bookItem.publishYear}
                            </TableCell>
                                
                            <TableCell align="center">
                                <Box>
                                    <IconButton onClick={() =>  window.location.href=`/books/details/${bookItem._id}`}>
                                        <Info />
                                    </IconButton>
                                    <IconButton onClick={() =>  window.location.href=`/books/edit/${bookItem._id}`}>
                                        <EditNote />
                                    </IconButton>
                                    <IconButton onClick={() =>  window.location.href=`/books/delete/${bookItem._id}`}>
                                        <DeleteForever />
                                    </IconButton>
                                </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
         )}
        </Box>
    )
};

export default Home;