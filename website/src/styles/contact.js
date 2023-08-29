import { styled } from "styled-components";

const ContactPage = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ContactInfo = styled.div`
    width: 60%;
    border-bottom: 1px solid lightgray;
`
const LabelSubject = styled.label`
    width: 60%;
    margin-top: 10px;
`

const EmailSubject = styled.textarea`
    width: 60%;
    border: 1px solid lightgray;
    resize: none;
`

const LabelBody = styled.label`
    width: 60%;
    margin-top: 10px;
`

const EmailBody = styled.textarea`
    width: 60%;
    height: 250px;
    border: 1px solid lightgray;
    resize: none;
`

const ButtonArea = styled.div`
    width: 60%;
    display: flex;
    justify-content: flex-end;
`

const ButtonSendEmail = styled.button`
    width: 250px;
    height: 30px;
    border: 1px solid lightgray;
    margin-top: 10px;
    cursor: pointer;
`

export { ContactPage, ContactInfo, LabelSubject, EmailSubject, LabelBody, EmailBody, ButtonArea, ButtonSendEmail }