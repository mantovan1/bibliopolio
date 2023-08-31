import React from "react";
import Header from '../components/Header/index.jsx';
import Subheader from '../components/Subheader/index.jsx';
import { DonationsPage, DonationInfo } from "../styles/donations.js";

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
                Bitcoin: 
                </DonationInfo>
                <DonationInfo>
                LiteCoin: 
                </DonationInfo>
                <DonationInfo>
                Monero: 
                </DonationInfo>
                <DonationInfo>
                PIX: 
                </DonationInfo>
            </DonationsPage>
        </div>
    );
}