import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    min-height: 50px;
    align-items: center;
    margin-top: 10px;

    @media (max-width: 400px) {
        grid-template-columns: 1fr;
    }
`;

const Logo = styled.a`
    width: 50%;
    text-align: center;
    font-family: Baskervill;
    font-size: 32px;
    cursor: pointer;

    @media (max-width: 400px) {
        font-size: 26px;
    }
`;

const More = styled.a`
    width: 10%;
    align-items: center;
    font-size: 20px;
    cursor: pointer;
    color: white;
`;

export {Header, Logo, More}