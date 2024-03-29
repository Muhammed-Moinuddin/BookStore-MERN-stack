import express from "express";
const router = express.Router();
import mongoose from "mongoose";
import { Book } from '../models/bookModel.js';
import multer from "multer";

//function to control which files should be uploaded and which should be skipped
const fileFilter = (req, file, cb) => {
    const allowedContentTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']; //defining allowed file type

    if (allowedContentTypes.includes(file.mimetype)) {  //checking file type
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Allowed types: jpeg, jpg, png, gif'), false)
    }
};

const storage = multer.memoryStorage(); //using mongodb memory Storage functionality
const upload = multer({ storage, fileFilter }).single('image'); //memory storage engine stores files in memory as buffer, only storing single file, also checking the file.

//Route to save books
router.post('/', upload ,async (req, res) => {  //post method to save/add the book
    try {
        if(
            !req.body.title || !req.body.author || !req.body.publishYear || !req.body.synopsis || !req.file  //checking that request body has all essential things
        ){
            return res.status(400).send({message: "Kindly fill all the requested details"});
        }
        const newBook = { //creating new object with the received data
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
            synopsis: req.body.synopsis,
            image: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            },
        }

        const book = await Book.create(newBook); // using that object and creating new book with help of model
        return res.status(200).send(book);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
})

//Route to get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({}); //finds all the books
        return res.status(200).send({ //making our data more useful 
            count: books.length, 
            data: books
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
})

// Route to get a single book by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Ensure that the provided ID is valid before attempting to find the book
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: 'Invalid book ID' });
        }
        
        const book = await Book.findById(id); //finding book with help of id
        if (!book) {
            return res.status(404).send({ message: 'Book not found' }); //If book not found then send 404 error
        }
        return res.status(200).send(book);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});


//Route to update a single book
router.put('/:id', upload, async (req,res) => {
    try {
        //destructuring and assigning
        const {id} = req.params;
        const {title, author, publishYear, synopsis} = req.body;
        const image = req.file;

        //new object with the updated data
        const updatedFields = {
            title,
            author,
            publishYear,
            synopsis,
        }
        if (image) {  //checking file changed or not
            updatedFields.image = {
                data: image.buffer,
                contentType: image.mimetype,
            }
        }
        const result = await Book.findByIdAndUpdate(id, updatedFields, {new: true}); //simply finding it by id and updating it with requested body, should return the modified document rather than the original document
        if(!result) {
            res.status(404).send({message: "Book not Found"});
        } else {
            res.status(200).send({message: "Book Found and Updated", book: result })
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message})
    }
});


//Route to get single book and delete it
router.delete('/:id', async (req,res) => {
    try {
        const { id } = req.params; //destructuring id from requested URL parameters
        const result = await Book.findByIdAndDelete(id); //simply finding it by id and updating it with requested body
        if(!result){ //checking result and sending confirmation messages
            return res.status(404).send({message: 'Book Not Found'});
        } else {
            return res.status(200).send({message: 'Book deleted successfully'});
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
})

export default router;