import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";

import validator from 'validator'

import style from './style.css';

import Header from '../components/Header/index';

import { network } from '../config/network';

const Login = () => {

    const history = useHistory();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(async() => {
        if(await localStorage.getItem('@token') != null) {
            history.push('/enviar-livro');
        }
        
    }, [])

    const handleLogin = async (e) => {

        e.preventDefault();

        if(!validator.isEmpty(email) && !validator.isEmpty(senha)) {
            if(validator.isEmail(email)) {
                
                //request api
                try{
                    await fetch(network.api + '/login-usuario', {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: email,
                            senha:  senha
                        })
                    })
                    .then(response => response.json())
                    .then(async data => {
                        try {
                            if(data.auth == true) {
                                await localStorage.setItem('@token', data.token);
                                await localStorage.setItem('@usuario', JSON.stringify(data.result));
                                history.push({ pathname: '/' });
                            }
                        } catch (e) {
                            // saving error
                        }
                    })
        
                }catch(err){
                    //
                }

            } else {
                setErrorMessage("*Email inválido! \n");
            }
        } else {
            setErrorMessage("*Preencha todos os campos! \n");
        }
    
        console.log(email);
        console.log(senha);
    
    }

    return (
        <div className='colored-container'>
            {/*}<Header noSearchBar={true} />{*/} 

            <form onSubmit={(e) => handleLogin(e)} className='login-container'>
                <div className='login-div'>
                    <div className='top'>
                        <h1>Login</h1>
                        <a className='error-msg'>{errorMessage}</a>
                    </div>
                    
                    <div>
                        <div>
                            <a>Email</a> <br />
                            <input onChange={(e) => setEmail(e.target.value)} type={"text"} />
                        </div>

                        <div>
                            <a>Senha</a> <br />
                            <input onChange={(e) => setSenha(e.target.value)} type={"password"} /> <br />
                        </div>
                    </div>

                    <button type='submit'> Próximo </button>
                    
                    <Link to="/cadastro">ainda não possui uma conta?</Link>
                </div>
            </form>

        </div>
    );
}

export default Login;