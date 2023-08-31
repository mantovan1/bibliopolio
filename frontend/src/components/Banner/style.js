import React from 'react';
import styled from 'styled-components';

const Banner = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;

    margin-top: 30px;
    margin-bottom: 30px;
    align-self: center;
    align-items: center;

    background-color: rgba(128, 128, 128, 0.5);
`;

const Background = styled.img`
    width: 100%;
    height: 400px;
    z-index: -1;
`;

const Text = styled.a`
    width: calc(100% - 20px);
    margin-inline: 10px;

    font-size: 80px;
    color white
    text-align: center;
    position: absolute;
    top: 50%;
`;

export default { Banner, Background, Text }