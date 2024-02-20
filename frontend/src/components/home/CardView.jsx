import { Box, IconButton, Typography, Card, CardMedia, CardActions, CardContent, Grid } from '@mui/material';
import { DeleteForever, EditNote, Info } from '@mui/icons-material';
import DeleteBook from '../../pages/DeleteBook';
import Loader from '../Loader';

const CardView = ({book, loading, imageData, handleDeleteClick, handleDeleteCancel, handleDeleteConfirm, selectedBook}) => {
    return (
        <Box sx={{my: 4, display: 'flex', justifyContent: 'center'}}> {/*root node*/}
         {loading ? (<Loader/>) : (  //first checking loading state before rendering data
            //
            <Grid container spacing={2} justifyContent="center" sx={{ m: 2, width: {xs: '95%',sm: '95%', md: '80%', lg: '60%' }}}>
                {book.map((bookItem, index) => ( //mapping through book item
                <Grid item xs={12} sm={6} md={4} key={bookItem._id}  sx={{ justifyContent: 'center', alignItems: "center" }}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            alt={`Cover for ${book.title}`}
                            height="140"
                            image={imageData[index]}
                            sx={{height: '100%', width: '100%'}}
                            
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {bookItem.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                By {bookItem.author}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <IconButton onClick={() =>  window.location.href=`/books/details/${bookItem._id}`}>
                                <Info color='primary'/>
                            </IconButton>
                            <IconButton onClick={() =>  window.location.href=`/books/edit/${bookItem._id}`}>
                                <EditNote color='primary' />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteClick(bookItem._id)}>
                                <DeleteForever color='primary' />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
                ))}
            </Grid>
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
}

export default CardView;