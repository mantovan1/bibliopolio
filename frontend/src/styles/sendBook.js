import { styled } from "styled-components";

const SendBookPage = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
`

const TopMessage = styled.a`
    width: 60%;
`

const UploadFile = styled.input`
    width: 60%;
    height: 50px;
    background-color: #f7f7f7;
    border: 1px solid lightgray;
    margin-top: 30px;
    margin-bottom: 30px;

    cursor: pointer;
`

const BookInfoUpload = styled.div`
    width: 60%;
    height: fit-content;
    display: flex;
    flex-direction: column;
`

const InputBookTitle = styled.input`
    padding: 10px;
    border: 1px solid lightgray;
    margin-bottom: 10px;

    &:hover {
        border: 1px solid tgray
    }
`

const InputBookAuthor = styled.input`
    padding: 10px;
    border: 1px solid lightgray;
    margin-bottom: 10px;

    &:hover {
        border: 1px solid tgray
    }
`

const BookDescInput = styled.textarea`
    height: 200px;
    border: 1px solid lightgray;
    resize: none;
` 

const SelectedGenres = styled.div`
    width: 60%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 10px;
`

const GenreSelected = styled.div`
    background-color: #d9d9d9;
    padding: 10px;
    border-radius: 5px;
    margin-right: 5px;
    border: 1px solid lightgray;
`

const BookGenreArea = styled.label`
    height: 300px;
    overflow-y: scroll;
    border: 1px solid lightgray;
    display: flex;
    flex-direction: column;
`

const BookGenreOption = styled.label`
    border-bottom: 1px solid lightgray;
    padding: 10px;
`

const GenreOption = styled.input`

`

const SaveBook = styled.div`
    width: 60%;
    height: fit-content;
    margin-top: 20px;
`

const SaveBookButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 250px;
    height: 30px;
    padding: 10px;
    border: 1px solid lightgray;
    cursor: pointer;
    float: right;
`

export { SendBookPage, TopMessage, UploadFile, BookInfoUpload, InputBookTitle, InputBookAuthor, BookDescInput, SelectedGenres, GenreSelected, BookGenreArea, BookGenreOption, GenreOption, SaveBook, SaveBookButton }