import {useState, useEffect} from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import ImageUtils from '../components/ImageUtils';
import DeleteBook from './DeleteBook';
import TableView from '../components/home/TableView';
import ViewTypeButton from '../components/ViewTypeButton';
import CardView from '../components/home/CardView';
import AlertSnackbar from '../components/AlertSnackbar';


const Home = () => {
    const [book, setBooks] = useState([]); //state for setting up books data
    const [loading, setLoading] = useState(false); //state for setting up loading bar
    const [imageData, setImageData] = useState([]); //state for setting up books data
    const [selectedBook, setSelectedBook] = useState(null); // State to store the selected book for deletion
    const [viewType, setViewType] = useState('table') //State to store the view type - by default table is selected
    const [snackbarOpen, setSnackbarOpen] = useState(false); //state for snackbar functionality

    useEffect(() => {
        setLoading(true); 
        axios
        .get('http://localhost:5555/books') //hitting api
        .then((res) => { // Code executed on successful response
            setBooks(res.data.data);
            const images = res.data.data.map((eachBook) => ImageUtils(eachBook));
            setImageData(images); //setting up images as state variable data
        })
        .catch((err) => { // Code executed on error
            console.log(err);
        })
        .finally(() => { // Code executed regardless of success or error
            // Adding a delay before setting loading to false (e.g., 500 milliseconds)
            setTimeout(() => {
                setLoading(false);
            }, 300);
        });
    },[])

    //handler for changing view type
    const handleViewType = (type) => {
        setViewType(type);
    }

    //handler for managing delete state 
    const handleDeleteClick = (bookId) => {
        setSelectedBook(bookId);
    };
    
    //handler for Delete Confirmation
    const handleDeleteConfirm = (id) => {
        axios
        .delete(`http://localhost:5555/books/${id}`)
        .then(() => {
            setSnackbarOpen(true);
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
        }, 400);
    })  
    // After deletion, resetting the selectedBook state
    setSelectedBook(null);
    };

    //handler of Canceling Popup
    const handleDeleteCancel = () => {
    setSelectedBook(null);
    };

  
    return (
        <Box sx={{pt:0, mt:0}}> {/*root node*/}
            <ViewTypeButton onViewTypeChange={handleViewType}/>  {/* Sending Handler to the component */}
            {/* Below setting up viewtype with the help of above handler */}
            {viewType === 'table' && <TableView
                book={book}
                loading={loading}
                imageData={imageData}
                handleDeleteClick={handleDeleteClick}
                handleDeleteConfirm={handleDeleteConfirm}
                handleDeleteCancel={handleDeleteCancel}
                setSelectedBook={setSelectedBook}
            />}
            {viewType === 'card' && <CardView
                book={book}
                loading={loading}
                imageData={imageData}
                handleDeleteClick={handleDeleteClick}
                handleDeleteConfirm={handleDeleteConfirm}
                handleDeleteCancel={handleDeleteCancel}
                setSelectedBook={setSelectedBook}
            />}
            
            {selectedBook && (
                <DeleteBook
                isOpen={!!selectedBook}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                bookId={selectedBook}
                />
            )}
            <AlertSnackbar open={snackbarOpen} onClose={() => setSnackbarOpen(false)} message="Book Deleted Succesfully!"/>
        </Box>
    )
};

export default Home;