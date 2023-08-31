import { styled } from "styled-components";

const ContainerLogin = styled.div`
    width: 100vw;
    heigh: 100vh;
    display: flex;
    justify-content: center;
`

const FormLogin = styled.form`
    width: 350px;
    height: fit-content;
    border: 1px solid lightgray;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Head = styled.a`
    font-size: 28px;
    width: 80%;
    margin-top: 20px;
    margin-bottom: 20px;
`

const Label = styled.label`
    width: 80%;
`

const InputLogin = styled.input`
    width: 80%;
    height: 30px;
    border: 1px solid lightgray;
    margin-bottom: 5px;
`

const ButtonLogin = styled.button`
    width: 83% ;
    height: 30px;
    border: 1px solid lightgray;
    cursor: pointer;
`

const Terms = styled.a`
    width: 80%;
    margin-top: 10px;
    margin-bottom: 10px;    
`

export { ContainerLogin, FormLogin, Head, Label, InputLogin, ButtonLogin, Terms }