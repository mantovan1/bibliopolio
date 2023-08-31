import React from 'react';
import styled from 'styled-components';

// Defina estilos únicos para a página Home
const Search = styled.div`
    width: 100%;
    display: flex;
    align-items: center; /* Center the items vertically */
    justify-content: center;
    justify-self: center;
`;

const SearchTerm = styled.input`
    width: 80%;
    height: 35px;
    padding-left: 10px;
    outline: none;
    border: none;
    font-size: 15px;
    border-bottom-left-radius: 7px;
    border-top-left-radius: 7px;
    border: 1px solid #d3d3d3;
`

const ConfirmSearch = styled.img`
    height: 37px;
    width: 32px;
    width: auto; /* Set width to auto to maintain aspect ratio */
    background-color: white;
    border-left: 2px solid #d3d3d3;
    border-bottom-right-radius: 7px;
    border-top-right-radius: 7px;
    background-color: #d9d9d9;
    border: 1px solid #d3d3d3;
    cursor: pointer;
`

export { Search, SearchTerm, ConfirmSearch };