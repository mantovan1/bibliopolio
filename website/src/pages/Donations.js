import React from "react";
import Header from '../components/Header/index.js';
import Subheader from '../components/Subheader/index.js';
import { DonationsPage, DonationInfo } from "./style.js";

export default function App() {
    return (
        <div>
            <Header />
            <Subheader />

            <DonationsPage>
                <DonationInfo>
                Faça uma doação e nos ajude a manter nosso servidor!
                </DonationInfo>

                <DonationInfo>
                Bitcoin: bc1quwrr99lsed9qx3tm6s62asupupfl8et26pzr7k
                </DonationInfo>
                <DonationInfo>
                LiteCoin: ltc1qea0g2t5u6zhqzl4agyz2f527xyu2f76ahsc73m
                </DonationInfo>
                <DonationInfo>
                Monero: 49kDB9VaRrWArwatEbF6LUe74MYYm4ykcLM5hhCpW8s27ZjTnwLqPxG1GM2jkAqyMwRG357F2CowoMbYzp3TfM5GSL4rD7S
                </DonationInfo>
            </DonationsPage>
        </div>
    );
}