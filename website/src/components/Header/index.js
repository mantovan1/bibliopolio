import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import style from './style.css';

export default function App(props) {

    const [visible, setVisible] = useState(false);

    const history = useHistory();

    const [usuario, setUsuario] = useState(null);
 
    useEffect( () => {

        var usuarioJSON = localStorage.getItem('@usuario');
    
        setUsuario(JSON.parse(usuarioJSON));
    
    } , [])

    return (
        <section className='header'>

            <a onClick={(e) => {history.push('/')}}> Livros   </a>
            
            {!props.noSearchBar &&
                <input type={'text'} onChange={(e) => {props.setPesquisa(e.target.value); props.buscarLivros()}} placeholder='pesquisar...' />
            }
           
           <a onMouseOver = {(e) => setVisible(true)} >Mais +</a>
                {visible && 
                    <ul >

                        {!usuario &&
                        
                        <li onClick={(e) => {history.push('/login')}}>
                            Login
                        </li>
                        
                        }

                        {usuario &&
                        
                        <li onClick={(e) => {history.push('/enviar-livro')}}>
                            Colaborar com seus PDF's
                        </li>
                        
                        }

                        {usuario &&
                        
                        <li onClick={(e) => {history.push('/seus-downloads')}}>
                            Seus Downloads
                        </li>
                        
                        }

                        {usuario &&
                        
                        <li onClick={(e) => {history.push('/seus-uploads')}}>
                            Seus Uploads
                        </li>
                        
                        }

                        {usuario &&
                        
                        <li onClick={(e) => {localStorage.removeItem('@token'); localStorage.removeItem('@usuario')}}>
                            Sair
                        </li>
                        
                        }

                    </ul>
                }
            
        </section>
    )

}