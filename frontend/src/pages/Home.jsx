import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import {DeleteForever, EditNote, AddBox, Info} from '@mui/icons-material';
const Home = () => {
    const [book, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true); 
        axios
        .get('http://localhost:5555/books')
        .then((res) => {
            setBooks(res.data.data);
            setLoading(false)
        })
        .catch((err) => {
            console.log(err);
            setLoading(false)
        })
    },[])
    
    return (
        <div> {/*root node*/}
            Home
        </div>
    )
};

export default Home;