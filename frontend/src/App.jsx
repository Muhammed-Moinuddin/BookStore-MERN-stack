import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateBook from './pages/CreateBook';
import EditBook from './pages/EditBook';
import ShowBook from './pages/ShowBook';
import DeleteBook from './pages/DeleteBook';


const theme = createTheme({

  palette: {
    primary: {
      light: "#66d2d2", // Lighter shade of Persian Green
      main: "#00A6A6",
      dark: "#007575", // Darker shade of Persian Green
      contrastText: '#fff', // White text on Persian Green
    },
    secondary: {
      light: "#c1e9e5", // Lighter shade of Vista Blue
      main: "#98DBC6",
      dark: "#6fae9c", // Darker shade of Vista Blue
      contrastText: '#000', // Black text on Vista Blue
    },
    info: {
      light: "#f7ebcc", // Lighter shade of Sunflower
      main: "#E6D72A",
      dark: "#c5b827", // Darker shade of Sunflower
      contrastText: '#000', // Black text on Sunflower
    },
    success: {
      light: "#f7cdd1", // Lighter shade of Marvelous
      main: "#F18D9E",
      dark: "#c55767", // Darker shade of Marvelous
      contrastText: '#000', // Black text on Marvelous
    },
  },
  typography: { 
    fontFamily: '"Arvo", "Lato"',
    h1: {
      fontFamily: "Arvo",
    },
    h2: {
      fontFamily: "Arvo",
    },
    h3: {
      fontFamily: "Arvo",
    },
    h4: {
      fontFamily: "Arvo",
    },
    h5: {
      fontFamily: "Arvo",
    },
    h6: {
      fontFamily: "Arvo",
      fontSize: "1.1rem"
    },
    body1: {
      fontFamily: "Lato",
      fontSize: "1.1rem"
    },
    body2: {
      fontFamily: "Lato",
    },
    subtitle1: {
      fontFamily: "Lato",
    },
    subtitle2: {
      fontFamily: "Lato",
    },
    button: {
      fontFamily: "Lato",
    },
  },
  
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <Header/>
      <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/books/create' element={<CreateBook/>}/>
         <Route path='/books/edit/:id' element={<EditBook/>}/>
         <Route path='/books/details/:id' element={<ShowBook/>}/>
         <Route path='/books/delete/:id' element={<DeleteBook/>} />
      </Routes>
    </ThemeProvider>
  )
}

export default App