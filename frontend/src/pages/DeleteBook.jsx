// //importing important functionalities
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const DeleteBook = ({isOpen, onClose, onConfirm, bookId}) => {
    return (
        <Dialog open={isOpen} onClose={onClose}>  
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
                Are you sure you want to delete this book? This action is irreversible.
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" variant="outlined">
                    Cancel
                </Button>
                <Button onClick={() => onConfirm(bookId)} color="error" variant="contained"> {/* onConfirm is function over here & we send id of the book as argument */}
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteBook;