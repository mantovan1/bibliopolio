import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import Header from '../components/Header/index.js';
import Subheader from '../components/Subheader/index.js';
import { SendBookPage, TopMessage, UploadFile, SaveBook, SaveBookButton, BookInfoUpload, InputBookTitle, InputBookAuthor, BookGenreArea, BookGenreOption, GenreOption, GenreSelected, SelectedGenres, BookDescInput } from '../styles/sendBook.js';
import bookService from '../services/book.js'
import { ToastContainer, toast } from 'react-toastify';

const SendBook = () => {

    const history = useHistory();

    const [title, setTitle] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [desc, setDesc] = useState();

    const [file, setFile] = useState("");
    const genres = ['Clássico', 'Fantasia', 'Ação', 'Romance'];

    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmitBook = async (e) => {

        e.preventDefault();

        console.log(title);
        console.log(authorName);
        console.log(selectedGenres);
        console.log(file);

        const token = localStorage.getItem('@token');
        if(!token) {
            toast.error('É preciso ter uma conta para adicionar um livro a plataforma', {
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
            if(
                title,
                authorName,
                selectedGenres,
                file
            ) {
                const formData = new FormData();

                formData.append('title', title);
                formData.append('author_name', authorName);
                formData.append('genre', selectedGenres[0]);
                formData.append('file', file);
                if(desc) {
                    formData.append('desc', desc);
                }
                console.log(formData);

                const response = await bookService.uploadBook(formData);
                
                toast.success(response, {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                console.log(response);
            }
        }
    }

    const handleFileChange = async(e) => {
        setFile(e.target.files[0]);
    }

    const handleTitleChange = async(e) => {
        setTitle(e.target.value);
    };

    const handleAuthorChange = async(e) => {
        setAuthorName(e.target.value);
    }

    const handleGenreChange = async(genre) => {
        console.log('teste')
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter((g) => g !== genre));
        } else {
            if(selectedGenres.length < 1) {
                setSelectedGenres([...selectedGenres, genre]);
            }
        }
        console.log(selectedGenres);
    }

    const handleDescChange = async (e) => {
        setDesc(e.target.value);
    }

    return (
        <div>
            <Header />
            <Subheader />
            <SendBookPage>
                <TopMessage>
                {`
                    Quer ajudar compartilhando um livro? perfeito :)
                    Os livros devem estar em formato ePub ou pdf.
                    Pedimos que não postem livros que já estão cadastrados no site, utilize a ferramenta de busca e nos ajude a poupar um pouco de trabalho :)`
                }
                </TopMessage>
                <UploadFile type='file' onChange={
                    (e) => handleFileChange(e)
                }/>
                <BookInfoUpload>
                    <a>Título</a>
                    <InputBookTitle onChange={
                        (e) => handleTitleChange(e)
                    } />
                    <a>Nome do autor</a>
                    <InputBookAuthor onChange={
                        (e) => handleAuthorChange(e)
                    } />
                    <a>Descrição</a>
                    <BookDescInput onChange={(e) => {
                        handleDescChange(e);
                    }} />
                    <SelectedGenres>
                        {selectedGenres.map((genre) => 
                            <GenreSelected>{genre} </GenreSelected>
                        )}
                    </SelectedGenres>
                    <a>Selecione um gênero literário</a>
                    <BookGenreArea>
                        {
                        genres &&
                        genres.map((genre) => (
                            <BookGenreOption key={genre}>
                                {genre}
                                <GenreOption
                                key={genre}
                                type='checkbox'
                                name={genre}
                                checked={selectedGenres.includes(genre)}
                                onClick={() => handleGenreChange(genre)}
                                />
                            </BookGenreOption>
                        ))}
                    </BookGenreArea>
                </BookInfoUpload>
                <SaveBook>
                    <SaveBookButton onClick={
                        (e) => handleSubmitBook(e)
                    }>
                        Enviar livro
                    </SaveBookButton>
                </SaveBook>
            </SendBookPage>
            <ToastContainer />
        </div>
    );
}

export default SendBook;