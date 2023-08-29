import React, { useEffect, useState } from "react"
import Header from '../components/Header/index.js';
import Subheader from '../components/Subheader/index.js';
import CommentSection from "../components/CommentSection/index.js";
import { ContainerBookInfo, ContentBook, BookCover, ButtonDownloadLarge, RightSide, TitleBook, AuthorBook, Desc, ButtonFav, FavDiv } from "./style.js"
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from "react-router-dom";
import { network } from "../config/network.js";
import axios from "axios";
import favoriteService from "../services/favorite.js";

export default function AboutBook() {

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

    const downloadBook = async () => {
        console.log(book);
        const downloadUrl = `${network.api}/book/download/pdf/${book.state.id}`;

        axios.get(downloadUrl, { responseType: 'blob' })
        .then(response => {
            // Create a blob URL from the response data
            const blobUrl = URL.createObjectURL(response.data);

            // Create a link element
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = book.state.filename; // Specify the default download filename
            link.click();

            // Clean up the blob URL
            URL.revokeObjectURL(blobUrl);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        (async() => {
            const result = await favoriteService.check(book.state.id);
            console.log(result);
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
                        <BookCover src={`${network.api}/book/cover/${book.state.id}`} />
                        <RightSide>
                            <TitleBook>{book.state.title}</TitleBook>
                            <AuthorBook>{book.state.author_name}</AuthorBook>
                            <ButtonDownloadLarge onClick={() => {downloadBook()}}>Baixar PDF</ButtonDownloadLarge>
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
                    <CommentSection />
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