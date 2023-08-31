import React, { useState } from "react";
import Header from "../components/Header/index.jsx";
import Subheader from "../components/Subheader/index.jsx";
import { ContactPage, ContactInfo, EmailSubject, EmailBody, ButtonArea, ButtonSendEmail, LabelSubject, LabelBody } from "../styles/contact.js";

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
                Mande um email para nós:
                </ContactInfo>
                <LabelSubject>Título</LabelSubject>
                <EmailSubject onChange={handleTitleChange} />
                <LabelBody>Corpo do email</LabelBody>
                <EmailBody onChange={handleParagraphChange} />
                <ButtonArea>
                    <ButtonSendEmail onClick={sendEmail}>Enviar email</ButtonSendEmail>
                </ButtonArea>
            </ContactPage>
        </div>
    );
};