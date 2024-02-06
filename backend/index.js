import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import booksRoute from "./routes/booksRoute.js"
import mongoose, { model } from "mongoose";
import {Book} from "./models/bookModel.js";

const app = express();
app.use(express.json()); //built-in middleware to make sure that server excpt json requests
app.use('/books', booksRoute);
 
app.get('/' ,(req, res) => {
    console.log(req);
    return res.status(234).send("Welcome to MERN stack Course");
})


//To connect to mongodb
mongoose.connect(mongoDBURL).then(
    () => {
        console.log("App is connected now")
        //Server will only run if mongoDB is connected
        app.listen(PORT, () => {
            console.log(`You server is running at port ${PORT}`)
        })
}).catch((err) => {
    console.log(err);
})