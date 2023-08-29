import React, { useState } from "react";
import Header from "../components/Header/index.js";
import Subheader from "../components/Subheader/index.js";
import { ContactPage, ContactInfo, EmailSubject, EmailBody, ButtonArea, ButtonSendEmail } from "./style.js";

import axios from 'axios';

export default function Contact() {

    const [title, setTitle] = useState();
    const [paragraph, setParagraph] = useState();

    const sendEmail = async() => {
        axios.get('http://192.168.15.152:8080/email/message2us', {
            params: {
              title: title,
              paragraph: paragraph,
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleParagraphChange = (e) => {
        setParagraph(e.target.value);
    }

    return (
        <div>
            <Header />
            <Subheader />
            <ContactPage>
                <ContactInfo>
                Entre em contato pelo email: elivroslove@protonmail.com
                </ContactInfo>
                <a>Título</a>
                <EmailSubject onChange={handleTitleChange} />
                <a>Corpo do email</a>
                <EmailBody onChange={handleParagraphChange} />
                <ButtonArea>
                    <ButtonSendEmail onClick={sendEmail}>Enviar email</ButtonSendEmail>
                </ButtonArea>
            </ContactPage>
        </div>
    );
};