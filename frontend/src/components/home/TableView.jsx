import React from 'react';
import { Box, IconButton, Typography, Table, TableHead, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { DeleteForever, EditNote, Info } from '@mui/icons-material';
import DeleteBook from '../../pages/DeleteBook';
import Loader from '../Loader';

const TableView = ({book, loading, imageData, handleDeleteClick, handleDeleteCancel, handleDeleteConfirm, selectedBook}) => {
    return (
        <Box sx={{mt: 2, display: 'flex', justifyContent: 'center'}}> {/*root node*/}
         {loading ? (<Loader/>) : (  //first checking loading state before rendering data
            <TableContainer component={Paper} sx={{ m: 2, width: {xs: '95%',sm: '95%', md: '80%' }}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    {/* Row Wise Headings */}
                    <TableHead sx={{"& th": { backgroundColor: "#F18D9E"}}}>
                        <TableRow>
                            <TableCell align="center"><Typography variant="h6" color="text.main">NO.</Typography></TableCell>
                            <TableCell align="center"><Typography variant="h6" color="text.main">COVER IMAGE</Typography></TableCell>
                            <TableCell align="center"><Typography variant="h6" color="text.main">TITLE</Typography></TableCell>
                            <TableCell align="center"><Typography variant="h6" color="text.main">AUTHOR</Typography></TableCell>
                            <TableCell align="center"><Typography variant="h6" color="text.main">PUBLISH YEAR</Typography></TableCell>
                            <TableCell align="center"><Typography variant="h6" color="text.main">OPERATIONS</Typography></TableCell>
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
                                <Typography variant="body1" color="text.main"> {index + 1}</Typography>   {/* adding numbers in the table */}
                            </TableCell>
                            <TableCell align="center" sx={{py:1, m:0}}>
                                <img
                                    src={imageData[index]}   // using imageData state variable to fetch url source
                                    alt={`Cover for ${bookItem.title}`}  // using title for alt
                                    style={{ maxWidth: '180px', maxHeight: '180px' }}
                                />
                            </TableCell>
                            <TableCell align="center"><Typography variant="body1" color="text.main">{bookItem.title}</Typography></TableCell>
                            <TableCell align="center"> <Typography variant="body1" color="text.main">{bookItem.author}</Typography></TableCell>
                            <TableCell align="center"><Typography variant="body1" color="text.main">{bookItem.publishYear}</Typography></TableCell>   
                            <TableCell align="center" sx={{p:0, m:0}}>
                                {/* Operation Buttons (Delete, Edit, Info) */}
                                <Box sx={{p:0, m:0}}>
                                    <IconButton onClick={() =>  window.location.href=`/books/details/${bookItem._id}`}>
                                        <Info color='primary'/>
                                    </IconButton>
                                    <IconButton onClick={() =>  window.location.href=`/books/edit/${bookItem._id}`}>
                                        <EditNote color='primary' />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteClick(bookItem._id)}>
                                        <DeleteForever color='primary' />
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
}

export default TableView