import mongoose from "mongoose";

//Structure for book collection
const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        publishYear: {
            type: Number,
            required: true,
        },
        synopsis: {
            type: String,
            required: true,
        },
        image: {
            data: Buffer,
            contentType: String,
        }
    },
    {
        timestamps: true,
    }
);

export const Book = mongoose.model('bookDocument', bookSchema) || mongoose.model.bookDocument ; //Create new one || if document is already present