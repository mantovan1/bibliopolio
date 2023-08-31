import React, { useEffect , useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header/index.jsx';
import Subheader from '../components/Subheader/index.jsx';

import ListBooks from '../components/ListBooks/index.jsx';

import { network } from '../config/network.js';

const SeusUploads = () => {  
  
    const [books, setBooks] = useState([
        {nome_livro: 'Helena', nome_autor: 'Machado de Assis', nome_arquivo: 'teste'},
        {nome_livro: 'Helena', nome_autor: 'Machado de Assis', nome_arquivo: 'teste'},
    ]);
    const [usuario, setUsuario] = useState(null);
    const token = localStorage.getItem('@token');

    /*
    const carregarListaUploads = async () => {
        try {
            await fetch(network.api + '/seus-uploads-usuario', {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                }
            
            })
            .then(response => response.json())
            .then( async data => {
                setListaUploads(data);
                console.log(data);
            })
        } catch (e) {}    
    }
    */

    return (
        <div>
            <Header />
            <Subheader />  
            <a>Seus uploads</a>
            <ListBooks books={books} />
        </div>
    );
}

export default SeusUploads;