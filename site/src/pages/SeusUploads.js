import React, { useEffect , useState } from 'react';
import { Link } from 'react-router-dom';

import style from './style.css';

import Header from '../components/Header/index';
import Footer from '../components/Footer/index';


const SeusUploads = () => {  
  
    const [listaUploads, setListaUploads] = useState(null);

    const [usuario, setUsuario] = useState(null);

    const token = localStorage.getItem('@token');

    const carregarListaUploads = async () => {
        try {
            await fetch('http://192.168.15.152:8080/seus-uploads-usuario', {
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
        } catch (e) {
            console.log(e);
        }    
    }

    const downloadEbook = async (url, nome_arquivo) => {
        
        const token = await localStorage.getItem('@token')

        try{
            await fetch(url, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify({
                    nome_arquivo: nome_arquivo
                })
            })
            .then(response => response.blob())
            .then(blob => {
                console.log(token);
                var url = window.URL.createObjectURL(blob);
                console.log(url);
                var a = document.createElement('a');
                a.href = url;
                a.download = nome_arquivo;
                document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
                a.click();    
                a.remove();
            })    
        
        }catch(err){
            //
        }

    
    }

    useEffect( () => {

        if (listaUploads === null) {
            carregarListaUploads();
        }

        var usuarioJSON = localStorage.getItem('@usuario');

        setUsuario(JSON.parse(usuarioJSON));

    }, [])
    
    const ListaLivros = () => {

        const fixUrl = (str) => {
            const newStr = str.replace('.pdf', '.png')
        
            return newStr;

        } 
    
        return (

            <div className='downloads'>
                

                {listaUploads && listaUploads.map( (livroPublicado) =>
                    
                        <div className='item'> 
                        <div className='capa'>
                            <img src={"http://192.168.15.152:8080/" + fixUrl( livroPublicado.nome_arquivo)} onError={(e) => e.target.src="./icon-book.png"} />
                        </div>
                        <div className='download-info'>
                            <Link onClick={(e) => {downloadEbook('http://192.168.15.152:8080/usuario-download', livroPublicado.nome_arquivo)}}>{ livroPublicado.nome_arquivo}</Link> <br/>
                            <a>{livroPublicado.createdAt}</a> <br/>
                        </div> 
                    </div>
                    

                )}

                {!listaUploads && 
                    <a>nada por aqui...</a>
                }

            </div>    

        );
    }

    return (
        <div>
            <Header noSearchBar={true} />

            <div className='mensagem-inicio'>
                <a>Seus uploads</a>
            </div>
        
            <ListaLivros />

            <Footer />    

        </div>
    );
}

export default SeusUploads;