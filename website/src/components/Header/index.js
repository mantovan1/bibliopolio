import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Search from '../Search/index.js'

import { Header, Logo, More } from './style.js'

export default function App(props) {

    const history = useHistory();
    const [usuario, setUsuario] = useState(null);
 
    useEffect( () => {

        var usuarioJSON = localStorage.getItem('@usuario');
        setUsuario(JSON.parse(usuarioJSON));
    
    } , []);

    const gotoHome = async () => {
        history.push('/');
    }

    return (
        <Header>
           <Logo onClick={gotoHome}> Bibliopólio</Logo>
           <Search />
        </Header>
    );
}