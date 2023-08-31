import { styled } from "styled-components";

const Subheader = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end; /* Alinhar à esquerda */
    align-items: center;
    background-color: #d9d9d9;
    margin-top: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
`

const TopicContainer = styled.div`
    display: flex;
    align-items: center;
    flex: 0.4; /* Preenchimento flexível para ocupar o espaço restante */
`

const Topic = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 30px;
    cursor: pointer;

    &:hover {
        height: calc(30px - 2px);
        border-bottom: 2px solid gray;
    }

    @media (max-width: 400px) {
        width: 80px;
    }
`

export { Subheader, Topic, TopicContainer };
