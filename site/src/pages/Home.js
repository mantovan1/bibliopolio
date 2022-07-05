import React, { useEffect , useState } from 'react';
import { Link } from 'react-router-dom';

import style from './style.css';

import Header from '../components/Header/index';
import Footer from '../components/Footer/index';


const Home = () => {  
  
    const [livros, setLivros] = useState(null);

    const [mensagemInicial, setMensagemInicial] = useState("Este é um site sem fins lucrativos, cujo único objetivo é a distribuição de conhecimento");

    const [pesquisa, setPesquisa] = useState("");

    const [usuario, setUsuario] = useState(null);

    const carregarLivros = async () => {
        try {
            await fetch('http://192.168.15.152:8080/listar-livros', {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            
            })
            .then(response => response.json())
            .then( async data => {

                setLivros(data);

                console.log(data);
            })
        } catch (e) {
            console.log(e);
        }    
    }

    const buscarLivros = async () => {
        try {
            await fetch('http://192.168.15.152:8080/buscar-livros/' + pesquisa, {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            
            })
            .then(response => response.json())
            .then( async data => {

                setLivros(data);

                console.log(data);
            })
        } catch (e) {
            console.log(e);
        }    
    }

    const downloadEbook = async (url, nome_arquivo) => {
        
            const token = localStorage.getItem('@token');

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

        if (livros === null) {
            carregarLivros();
        }

        var usuarioJSON = localStorage.getItem('@usuario');

        setUsuario(JSON.parse(usuarioJSON));

        if(usuario) {
            setMensagemInicial("Seja bem-vindo " + usuario.nick)
        }

    }, [])
    
    const ListaLivros = () => {

        const fixUrl = (str) => {
            const newStr = str.replace('.pdf', '.png')
        
            return newStr;

        } 
    
        return (

            <div className='books'>
                

                {livros && livros.map( (livro) =>
                    <div className='item'> 
                        <div className='capa'>
                            <img src={"http://192.168.15.152:8080/" + fixUrl(livro.nome_arquivo)} onError={(e) => e.target.src="./icon-book.png"} />
                        </div>
                        <div className='info'>
                            <a>{livro.nome_livro}</a> <br/>
                            <a>{livro.nome_autor}</a> <br/>

                            {usuario && 
                            <div className='btn_download' onClick={(e) => {e.preventDefault(); downloadEbook('http://192.168.15.152:8080/usuario-download', livro.nome_arquivo);}}> 
                                <a>Baixar pdf</a>
                            </div>
                            }

                            {!usuario &&
                                <div onClick={(e) => {e.preventDefault(); window.location.assign('http://192.168.15.152:8080/download/' + livro.nome_arquivo, "_blank");}} className='btn_download'>Baixar pdf</div>
                            }

                        </div> 
                    </div>
                )}

                {!livros && 
                    <a>loading...</a>
                }

            </div>    

        );
    }

    return (
        <div>
            <Header setPesquisa={setPesquisa} buscarLivros={buscarLivros} />

            <div className='mensagem-inicio'>
                <a>{mensagemInicial}</a>
            </div>
        
            <ListaLivros />

            <Footer />    

        </div>
    );
}

export default Home;