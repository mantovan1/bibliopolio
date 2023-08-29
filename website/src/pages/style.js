import { styled } from "styled-components";

const ContainerBookInfo = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ContentBook = styled.div`
    width: 60%;
    display: grid;
    grid-template-columns: 1fr 1fr;

    @media (max-width: 400px) {
        grid-template-columns: 1fr;
        border: none;
    }
`

const BookCover = styled.img`
    width: fit-content;
    height: 480px;

    @media (max-width: 400px) {
        height: 320px;
        width: 90%;
    }
`

const RightSide = styled.div`
    width: 400px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    padding-left: 45px;

    @media (max-width: 400px) {
        width: 60%;
        align-items: center;
    }

`

const TitleBook = styled.a`
    font-size: 22px;
`

const AuthorBook = styled.a`
    font-size: 14px;
    font-weight: bold;
    color: gray;
`

const FavDiv = styled.div`
    width: 200px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    cursor: pointer;

    &:hover{
        opacity: 0.5;
    }
`

const ButtonFav = styled.img`
    width: 30px;
    height: 30px;
`

const ButtonDownloadLarge = styled.button`
    display: flex;
    width: 200px;
    padding: 2px;
    height: 50px;

    margin-top: 10px;

    align-items: center;
    justify-content: center;

    border-radius: 2px;
    border: 1px solid lightgray;

    font-style: normal;
    font-family: 'Lato', sans-serif;
    cursor: pointer;

    &:hover {
        background-color: #d3d3d3;
    }
`

const Desc = styled.a`
    width: 60%;
`

const ContainerLogin = styled.div`
    width: 100vw;
    heigh: 100vh;
    display: flex;
    justify-content: center;
`

const FormLogin = styled.form`
    width: 350px;
    height: fit-content;
    border: 1px solid lightgray;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Head = styled.a`
    font-size: 28px;
    width: 80%;
    margin-top: 20px;
    margin-bottom: 20px;
`

const Label = styled.label`
    width: 80%;
`

const InputLogin = styled.input`
    width: 80%;
    height: 30px;
    border: 1px solid lightgray;
    margin-bottom: 5px;
`

const ButtonLogin = styled.button`
    width: 83% ;
    height: 30px;
    border: 1px solid lightgray;
    cursor: pointer;
`

const Terms = styled.a`
    width: 80%;
    margin-top: 10px;
    margin-bottom: 10px;    
`

const DonationsPage = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const DonationInfo = styled.a`
    width: 80%
`

const SendBookPage = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
    width: 250px;
    height: 30px;
    border: 1px solid lightgray;
    cursor: pointer;
    float: right;
`

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

const EmailSubject = styled.textarea`
    width: 60%;
    border: 1px solid lightgray;
    resize: none;
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
    border: 1px solid black;
`

export { ContainerBookInfo, ContentBook, BookCover, RightSide, TitleBook, AuthorBook, FavDiv, ButtonFav, ButtonDownloadLarge, Desc }
export { ContainerLogin, FormLogin, Head, Label, InputLogin, ButtonLogin, Terms }
export { DonationsPage, DonationInfo }
export { SendBookPage, TopMessage, UploadFile, BookInfoUpload, InputBookTitle, InputBookAuthor, BookDescInput, SelectedGenres, GenreSelected, BookGenreArea, BookGenreOption, GenreOption, SaveBook, SaveBookButton }
export { ContactPage, ContactInfo, EmailSubject, EmailBody, ButtonArea, ButtonSendEmail }