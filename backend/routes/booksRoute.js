import express from "express";
const router = express.Router();
import { Book } from '../models/bookModel.js';
import multer from "multer";

const fileFilter = (req, file, cb) => {
    const allowedContentTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

    if (allowedContentTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Allowed types: jpeg, jpg, png, gif'), false)
    }
};

const storage = multer.memoryStorage();
const upload = multer({ storage, fileFilter }).single('image');

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

//Route to get a single the books
router.get('/:id', async (req,res) => { //using id to find a single book
    try{
        if( !req.body.title || !req.body.author || !req.body.publishYear || !req.body.synopsis ){
            return res.status(400).send({message: 'Kindly fill all the necessary details'});
        }
        const { id } = req.params; //destructuring id from requested URL parameters
        const book = await Book.findById(id); //simply finding it by id
        return res.status(200).send(book);
    } catch(error){
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
});

//Route to get single book and update it
router.put('/:id', async (req,res) => {
    try {
        const { id } = req.params; //destructuring id from requested URL parameters
        const result = await Book.findByIdAndUpdate(id, req.body); //simply finding it by id and updating it with requested body
        if(!result){ //checking result and sending confirmation messages
            return res.status(404).send({message: 'Book Not Found'});
        } else {
            return res.status(200).send({message: 'Book updated successfully'});
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
})

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