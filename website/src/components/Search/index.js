import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Search, SearchTerm, ConfirmSearch } from './style.js';
export default function App(props) {

    const history = useHistory();

    const [term, setTerm] = useState();

    const gotoSearch = async () => {
        const data = { term: term };
        history.replace({
            pathname: `/${term}`
        });
    } 

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' & term != null) {
            gotoSearch();
        }
    };

    /*
    useEffect(() => {
        if (books.length > 0) {
          
          window.location.reload();
        }
    }, [books, history]);
    */

    return (
        <Search>
            <SearchTerm onKeyDown={handleKeyDown} onChange={(e) => setTerm(e.target.value)} placeholder='Pesquisa Bibliopolium...' type='text' />
            <ConfirmSearch onClick={gotoSearch} src='search-interface-symbol.png' />
        </Search>
    );
}