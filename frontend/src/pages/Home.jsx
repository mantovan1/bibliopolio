import React, { useEffect , useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/index';
import Subheader from '../components/Subheader';
import ListBooks from '../components/ListBooks';
import { useLocation, useParams } from 'react-router-dom';
import bookService from '../services/book.js';

const Home = () => {  
    const location = useLocation();
    const { term } = useParams();
    const [books, setBooks] = useState();

    useEffect(() => {
        (async() => {
            const newBooks = await bookService.listBooks();
            setBooks(newBooks);
        })();
    }, []);
    
    useEffect(() => {
        (async() => {
            if(term){
                const newBooks = await bookService.search(term);
                setBooks(newBooks);
            }
        })();
    }, [location.pathname, term]);

    return (
        <div>
            <Header />
            <Subheader />
            {books &&
            (
                <ListBooks books={books} />
            )
            }
        </div>
    );
}

export default Home;