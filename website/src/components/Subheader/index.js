import React, { useEffect, useState } from "react";
import { Subheader, TopicContainer, Topic } from './style.js';
import { useHistory } from "react-router-dom";

export default function App() {

    const history = useHistory();
    const [path, setPath] = useState("");
    const [token, setToken] = useState();

    const gotoDonations = async() => {
        history.push('/donations');
    }

    const gotoSendBook = async() => {
        history.push('/sendbook');
    }

    const gotoContact = async() => {
        history.push('/contact');
    }

    const logout = async() => {
        localStorage.removeItem('@token');
        localStorage.removeItem('@user');
        window.location.reload();
    }

    const gotoLogin = async() => {
        history.push('/login');
    }

    useEffect(() => {
        const currentPath = window.location.pathname;
        setPath(currentPath);
        setToken(localStorage.getItem('@token'));
    }, []);

    return (
        <Subheader>
            <TopicContainer>
                <Topic onClick={gotoDonations}>
                    Ajude com Doações
                </Topic>
                <Topic onClick={gotoSendBook}>
                    Envie um livro
                </Topic>
                <Topic onClick={gotoContact}>
                    Contato
                </Topic>
                {token &&
                    <Topic>
                        Seus favoritos
                    </Topic>
                }
                {token &&
                    <Topic onClick={logout}>
                        Sair
                    </Topic>
                }
                {!token &&
                    <Topic onClick={gotoLogin}>
                        Login
                    </Topic>
                }
            </TopicContainer>
        </Subheader>
    );
}