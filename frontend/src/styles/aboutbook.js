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

export { ContainerBookInfo, ContentBook, BookCover, RightSide, TitleBook, AuthorBook, FavDiv, ButtonFav, ButtonDownloadLarge, Desc }