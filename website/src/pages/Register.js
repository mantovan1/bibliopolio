import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import validator from 'validator'
import { network } from '../config/network';
import { ContainerLogin, FormLogin, Head, ButtonLogin, Terms, Label, InputLogin } from './style.js';
import axios from 'axios';

const Login = () => {
    const history = useHistory();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirmedPass, setConfirmedPass] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const handleRegister= async (e) => {
        e.preventDefault();
        console.log('teste');
        console.log(name);
        console.log(email);
        console.log(pass);
        console.log(confirmedPass);
        if(
            name &&
            email &&
            pass &&
            confirmedPass &&
            (pass === confirmedPass)
        ) {
            const endpoint = network.api + '/user/signup';
            console.log(endpoint);
            const user = {
                name: name,
                email: email,
                pass: pass
            }
            axios.post(endpoint, user)
            .then(response => {
            console.log(response.data); // Deve imprimir "sent" se a requisição foi bem-sucedida
            })
            .catch(error => {
            console.error(error);
            });
        }
    }

    const handleNameChange = async (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = async (e) => {
        setEmail(e.target.value);
    }

    const handlePassChange = async (e) => {
        setPass(e.target.value);
    }

    const handleConfirmedPassChange = async(e) => {
        setConfirmedPass(e.target.value);
    }

    return (
        <ContainerLogin>
            <FormLogin>
                <Head> Criar conta </Head>
                <Label>Seu nome</Label>
                <InputLogin placeholder='Nome e sobrenome' onChange={handleNameChange} type={"text"} />
                <Label>Email</Label>
                <InputLogin onChange={handleEmailChange} type={"text"} />
                <Label>Senha</Label>
                <InputLogin onChange={handlePassChange} type={"password"} />
                
                <Label>Insira a senha nova mais uma vez</Label>
                <InputLogin onChange={handleConfirmedPassChange} type={"password"} />
                
                <ButtonLogin onClick={handleRegister}> Fazer login </ButtonLogin>

                <Terms>
                Ao continuar, você concorda com as Condições de Uso da Amazon. Por favor verifique a Notificação de Privacidade, Notificação de Cookies e a Notificação de Anúncios Baseados em Interesse.
                </Terms>
                
                <Link to="/login">você já tem uma conta? Faça login</Link>
            </FormLogin>
        </ContainerLogin>
    );
}

export default Login;