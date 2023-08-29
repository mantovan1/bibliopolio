import { styled } from "styled-components";

const Books = styled.div`
    display: grid;
    width: 100vw;
    justify-items: center;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-row-gap: 20px;

    @media (max-width: 700px ) {
        align-content: flex-start;
        grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 400px ) {
        grid-template-columns: 1fr;
    }
`;

const Item = styled.div`
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid lightgray;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
`;

const Cover = styled.div`
    width: 100%;
    display: flex;
    overflow: hidden;
    justify-content: center;
    background-color: #f7f7f7;
`;

const CoverImg = styled.img`
    height: 250px;
    object-fit:scale-down;

    div {
        width: 100%;
    }
`;

const ButtonDownload = styled.button`
    display: flex;
    width: 250px;
    padding: 2px;
    height: 25px;

    margin: 5px;
    
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

const Info = styled.a`
    width: 100%;
    text-align: center;
`;

const Title = styled.a`
    font-size: 16px;
`

const AuthorName = styled.a`
    font-size: 14px;
    color: gray;
`

export { Books, Item, Cover, CoverImg, ButtonDownload, Info, Title, AuthorName }