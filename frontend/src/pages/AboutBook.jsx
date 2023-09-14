import React, { useEffect, useState } from "react"
import Header from '../components/Header/index.jsx';
import Subheader from '../components/Subheader/index.jsx';
import CommentSection from "../components/CommentSection/index.jsx";
import { ContainerBookInfo, ContentBook, BookCover, ButtonDownloadLarge, RightSide, TitleBook, AuthorBook, Desc, ButtonFav, FavDiv } from "../styles/aboutbook.js";
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from "react-router-dom";
import favoriteService from "../services/favorite.js";
import bookService from '../services/book.js';

export default function AboutBook() {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const location = useLocation();
    const book = location.state;

    const [fav, setFav] = useState(false);
    const [imgSrc, setImgSrc] = useState('heart.png');

    const handleFavButton = async() => {
        const token = localStorage.getItem('@token');
        if(!token) {
            toast.error('É preciso ter uma conta para adicionar um livro aos seus favoritos', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            if(fav === true) {
                setImgSrc('heart.png');
                const result = await favoriteService.remove(book.state.id);
                console.log(result);
            } else {
                setImgSrc('heart-full.png');
                const result = await favoriteService.add(book.state.id);
                console.log(result);
            }
            setFav(!fav);
        }
    }

    const handleDownload = async(e) => {
        e.preventDefault();
        await bookService.download(book.state.format, book.state.id, book.state.title);
    }

    useEffect(() => {
        (async() => {
            const result = await favoriteService.check(book.state.id);
            console.log(result);
            console.log(result.status);
	    if(result.status == 200) {
                setFav(true);
                setImgSrc('heart-full.png');
            }
            console.log(fav);
        })();
    }, [book]);

    if(book) {
        return (
            <div>
                <Header />
                <Subheader />
                <ContainerBookInfo>
                    <ContentBook>
                        <BookCover src={`${backendUrl}/book/cover/${book.state.id}`} />
                        <RightSide>
                            <TitleBook>{book.state.title}</TitleBook>
                            <AuthorBook>{book.state.author_name}</AuthorBook>
                            <ButtonDownloadLarge onClick={(e) => {
                                handleDownload(e)
                            }}>
                                Baixar PDF
                            </ButtonDownloadLarge>
                            <FavDiv onClick={handleFavButton}>
                                <ButtonFav src={imgSrc} />
                                <a>Adicionar aos favoritos</a>
                            </FavDiv>
                        </RightSide>
                    </ContentBook>
                    {book.state.desc && 
                        <Desc>
                            <a> Descrição </a>
                            <a>
                                {book.state.desc}
                            </a>
                        </Desc>
                    }
		    {/*
                    <CommentSection />
		    */}
                </ContainerBookInfo>
                <ToastContainer />
            </div>
        )
    } else {
        return (
            <div>
                waiting...
            </div>
        )
    } 
}
