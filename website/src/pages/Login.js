import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import validator from 'validator'
import { ContainerLogin, FormLogin, Head, ButtonLogin, Terms, Label, InputLogin } from './style.js';
import userService from '../services/user.js';

const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(email);
        console.log(pass);
        if(!validator.isEmpty(email) && !validator.isEmpty(pass)) {
            if(validator.isEmail(email)) {
                const response = await userService.login(email, pass);
                console.log(response);
                if(response?.auth) {
                    history.push('/');
                }
            } else {
            }
        } else {
        }
    }

    return (
        <ContainerLogin>
            <FormLogin>
                <Head> Fazer Login </Head>
                <Label>Email</Label>
                <InputLogin onChange={(e) => {
                    setEmail(e.target.value);
                }} type={"text"} />
                <Label>Senha</Label>
                <InputLogin onChange={(e) => setPass(e.target.value)} type={"password"} />
                <ButtonLogin onClick={(e) => {
                    handleLogin(e);
                }}> Fazer login </ButtonLogin>

                <Terms>
                Ao continuar, você concorda com as Condições de Uso da Amazon. Por favor verifique a Notificação de Privacidade, Notificação de Cookies e a Notificação de Anúncios Baseados em Interesse.
                </Terms>
                
                <Link to="/register">ainda não possui uma conta?</Link>
            </FormLogin>
        </ContainerLogin>
    );
}

export default Login;