import React, { useState } from "react";
import { Books, Item, Cover, CoverImg, ButtonDownload, Info, Title, AuthorName } from "./style";
import { network } from '../../config/network.js';
import { useHistory } from 'react-router-dom';
import axios from "axios";

export default function App(props) {

    const history = useHistory();

    const [books, setBooks] = useState(props.books);
    const [user, setUser] = useState();

    const downloadBook = async (book) => {

        const downloadUrl = `${network.api}/book/download/pdf/${book.id}`;

        axios.get(downloadUrl, { responseType: 'blob' })
        .then(response => {
            // Create a blob URL from the response data
            const blobUrl = URL.createObjectURL(response.data);

            // Create a link element
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = book.filename; // Specify the default download filename
            link.click();

            // Clean up the blob URL
            URL.revokeObjectURL(blobUrl);
        })
        .catch(error => {
            console.error('Error:', error);
        });
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
                        <CoverImg src={`${network.api}/book/cover/${book.id}`} onError={(e) => e.target.src="./icon-book.png"} />
                    </Cover>
                    <Info>
                        <Title>{book.title}</Title> <br/>
                        <AuthorName>{book.author_name}</AuthorName> <br/>
                    </Info> 
                    <ButtonDownload onClick={() => {downloadBook(book)}}> 
                        <a>Baixar pdf</a>
                    </ButtonDownload>
                </Item>
            )}
            {!books && 
                <a>loading...</a>
            }
        </Books> 
    );
}