import React, { useState } from "react";
import { Books, Item, Cover, CoverImg, ButtonDownload, Info, Title, AuthorName } from "./style";
import { useHistory } from 'react-router-dom';
import bookService from "../../services/book";
export default function App(props) {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const history = useHistory();

    const [books, setBooks] = useState(props.books);
    const [user, setUser] = useState();

    const handleDownload = async(e, format, bookId,title) => {
        e.preventDefault();
        await bookService.download(format, bookId, title);
    }

    return (
        <Books>
            {books && books.map( (book, index) =>
                <Item key={index}
                onClick={ 
                    async () => {
                        history.push('/book', {state: book});
                    }
                }> 
                    <Cover>
                        <CoverImg src={`${backendUrl}/book/cover/${book.id}`} onError={(e) => e.target.src="./icon-book.png"} />
                    </Cover>
                    <Info>
                        <Title>{book.title}</Title> <br/>
                        <AuthorName>{book.author_name}</AuthorName> <br/>
                    </Info> 
                    <ButtonDownload onClick={(e) => {handleDownload(e, book.format, book.id, book.title)}}> 
                        <a>Baixar</a>
                    </ButtonDownload>
                </Item>
            )}
            {!books && 
                <a>loading...</a>
            }
        </Books> 
    );
}
