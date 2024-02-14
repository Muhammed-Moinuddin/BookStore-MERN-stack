//importing important functionalities
import {useState, useEffect} from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import {Table,TableHead, TableBody, TableCell, TableContainer, TableRow, Paper, Box, IconButton} from  '@mui/material';
import {DeleteForever, EditNote, Info} from '@mui/icons-material';
import DeleteBook from './DeleteBook';


const Home = () => {
    const [book, setBooks] = useState([]); //state for setting up books data
    const [loading, setLoading] = useState(false); //state for setting up loading bar
    const [imageData, setImageData] = useState([]); //state for setting up books data
    const [selectedBook, setSelectedBook] = useState(null); // State to store the selected book for deletion

    useEffect(() => {
        setLoading(true); 
        axios
        .get('http://localhost:5555/books') //hitting api
        .then((res) => { // Code executed on successful response
            setBooks(res.data.data);
            // Extract and convert image data to base64
            const images = res.data.data.map((book) => {
                const bufferData = new Uint8Array(book.image.data.data);  //converts binary image data into Uint8Array (8-bit unsigned integer array).
                const blob = new Blob([bufferData], { type: book.image.contentType }); //create binary large object (blob) from Uint8Array with specifying content type.
                const urlCreator = window.URL || window.webkitURL; //checking web api's
                const imageUrl = urlCreator.createObjectURL(blob);  //creating url representing blob & imageUrl is an array of URLs
                return imageUrl;
            });
            setImageData(images); //setting up images as state variable data
        })
        .catch((err) => { // Code executed on error
            console.log(err);
        })
        .finally(() => { // Code executed regardless of success or error
            // Adding a delay before setting loading to false (e.g., 500 milliseconds)
            setTimeout(() => {
                setLoading(false);
            }, 500);
        });
    },[])

    //handler for managing delete state 
    const handleDeleteClick = (bookId) => {
        setSelectedBook(bookId);
      };
    
    //handler for Delete Confirmation
    const handleDeleteConfirm = (id) => {
        axios
        .delete(`http://localhost:5555/books/${id}`)
        .then(() => {
            setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id)); //using previous book state to create new state and also achieving rendering through it
            setSelectedBook(null);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            // Add a delay before setting loading to false (e.g., 500 milliseconds)
            setTimeout(() => {
            setLoading(false);
        }, 500);
    })  
    // After deletion, resetting the selectedBook state
    setSelectedBook(null);
    };

    //handler of Canceling Popup
    const handleDeleteCancel = () => {
    setSelectedBook(null);
    };
  
    return (
        <Box sx={{mt: 10, display: 'flex', justifyContent: 'center'}}> {/*root node*/}
         {loading ? (<Loader/>) : (  //first checking loading state before rendering data
            <TableContainer component={Paper} sx={{ m: 2, width: {xs: '95%',sm: '95%', md: '80%' }}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    {/* Row Wise Headings */}
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
                        {/* Row Wise Mapping Values */}
                        {book.map((bookItem, index) => ( //mapping throught book array
                            <TableRow
                            key={bookItem._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell align="center">
                                {index + 1}   {/* adding numbers in the table */}
                            </TableCell>
                            <TableCell align="center">
                                <img
                                    src={imageData[index]}   // using imageData state variable to fetch url source
                                    alt={`Cover for ${bookItem.title}`}  // using title for alt
                                    style={{ maxWidth: '50px', maxHeight: '50px' }}
                                />
                            </TableCell>
                            <TableCell align="center">{bookItem.title}</TableCell>
                            <TableCell align="center">{bookItem.author}</TableCell>
                            <TableCell align="center">{bookItem.publishYear}</TableCell>   
                            <TableCell align="center" sx={{p:0, m:0}}>
                                {/* Operation Buttons (Delete, Edit, Info) */}
                                <Box sx={{p:0, m:0}}>
                                    <IconButton onClick={() =>  window.location.href=`/books/details/${bookItem._id}`}>
                                        <Info />
                                    </IconButton>
                                    <IconButton onClick={() =>  window.location.href=`/books/edit/${bookItem._id}`}>
                                        <EditNote />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteClick(bookItem._id)}>
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
         {/* Delete Book Popup */}
        {selectedBook && ( //Condition of Book Selection
            <DeleteBook
            //Passing Properties to DeleteBook Component
            isOpen={!!selectedBook} //Delete Book component is open or closed (passing boolean using double negation)
            onClose={handleDeleteCancel} //passing function via property
            onConfirm={handleDeleteConfirm} //passing function via property
            bookId={selectedBook} //passing id
            />
        )}
        </Box>
    )
};

export default Home;