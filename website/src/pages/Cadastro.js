import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";

import validator from 'validator'

import style from './style.css';

import Header from '../components/Header/index';

import { network } from '../config/network';

//var sha256 = require('js-sha256');

const Cadastro = () => {
    
    const history = useHistory();
    
    const [nick, setNick] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [errorMessage, setErrorMessage] = useState(null);
    const [senhaSeguraMessage, setSenhaSeguraMessage] = useState(null);

    const handleLogin = async (e) => {

        e.preventDefault();

        if(!validator.isEmpty(nick) && !validator.isEmpty(email) && !validator.isEmpty(senha)) {
            if(validator.isEmail(email)) {
                if(validator.isStrongPassword(senha)) {

                    //request api

                    //window.alert(process.env.KEY);

                    try{
                        await fetch(network.api + '/cadastro-usuario', {
                            method: 'post',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                nick: nick,
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
                    setErrorMessage("*Senha fraca!");
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

    useEffect( () => {
        if(senha != "" && senha != null) {
            if(!validator.isStrongPassword(senha)) {
                setSenhaSeguraMessage("*a senha deve conter letras (maiúsculas e minúsculas), números e caracteres especiais");
            } else {
                setSenhaSeguraMessage("*Senha forte!");
            }
        }
    }, [senha]);

    return (
        <div className='colored-container'>
            {/*}<Header noSearchBar={true} />{*/} 

            <form onSubmit={(e) => handleLogin(e)} className='login-container'>
                <div className='login-div'>
                    <div className='top'>
                        <h1>Cadastro</h1>
                        <a className='error-msg'>{errorMessage}</a>
                    </div>
                    
                    <div>

                        <div>
                            <a>Nick</a> <br />
                            <input onChange={(e) => setNick(e.target.value)} type={"text"} />
                        </div>

                        <div>
                            <a>Email</a> <br />
                            <input onChange={(e) => setEmail(e.target.value)} type={"text"} />
                        </div>

                        <div>
                            <a>Senha</a> <br />
                            <input onChange={(e) => setSenha(e.target.value)} type={"password"} /> <br />
                            <a className='senha-segura-msg' color='black'>{senhaSeguraMessage}</a>
                        </div>
                    </div>

                    <button type='submit'> Próximo </button>
                    
                    <Link to="/">voltar</Link>
                </div>
            </form>

        </div>
    )    
}

export default Cadastro;