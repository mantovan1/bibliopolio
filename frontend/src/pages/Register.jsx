import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import validator from 'validator'
import { ContainerLogin, FormLogin, Head, ButtonLogin, Terms, Label, InputLogin } from '../styles/login.js';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import userService from '../services/user.js';

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
            const response = await userService.register(name, email, pass);
            console.log(response);
            if(response.status == 200) {
                const responseData = await response.data;
                if(responseData.message) {
                    const message = responseData.message;
                    toast.success(message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
                else {
                    toast.error('algo deu errado', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            }
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
                
                <ButtonLogin onClick={handleRegister}> Cadastrar </ButtonLogin>

                <Terms>
                Ao continuar, você concorda com as Condições de Uso da Amazon. Por favor verifique a Notificação de Privacidade, Notificação de Cookies e a Notificação de Anúncios Baseados em Interesse.
                </Terms>
                
                <Link to="/login">você já tem uma conta? Faça login</Link>
            </FormLogin>
            <ToastContainer />
        </ContainerLogin>
    );
}

export default Login;