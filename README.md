# BookStore-MERN-stack

Book Management System
🎉 Welcome to the Book Management System, a full-stack application that allows you to manage a collection of books with complete CRUD functionality - Add, Delete, Update, and Get.

🖥️ Tech Stack:

Frontend:
React.js
Material UI for a sleek and responsive design

Backend:
Node.js
Express.js for server-side logic
MongoDB as the database

📸 Image Handling:
Utilizing Multer for efficient image handling
Axios used for making HTTP requests

🌐 Backend Routes:
Create (POST): /books
Adds a new book to the collection with detailed validation
Supports uploading book covers using Multer

Read (GET): /books
Retrieves all books in the collection
Provides a count of the books and their details

Read (GET by ID): /books/:id
Retrieves a specific book by its ID

Update (PUT): /books/:id
Updates a specific book's details, including the option to change the book cover
Utilizes MongoDB's findByIdAndUpdate for efficient updates

Delete (DELETE): /books/:id
Deletes a book from the collection based on its ID
👨‍💻 Backend Implementation:

Backend logic is focused on modularity and clarity.
Detailed comments are provided for better understanding.

📱 Frontend:
The frontend is built with React.js, offering a seamless user interface.
Different views are supported, including a table view and a card view.
ImageUtils component is used for rendering book covers.

⚙️ Getting Started:
Clone the repository.
Navigate to the project directory.
Install dependencies using npm install.
Run the server using npm start in the backend directory.
Run the frontend using npm start in the frontend directory.
🚀 Start Managing Your Books!

Feel free to use this Book Management System. If you encounter any issues or have suggestions, please open an issue or submit a pull request.

Happy coding! 📚🚀