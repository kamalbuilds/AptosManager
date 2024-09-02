"use client"
import React, { ReactNode } from 'react';
import { PontemWallet } from "@pontem/wallet-adapter-plugin";
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
import { OKXWallet } from "@okwallet/aptos-wallet-adapter";
import { Network } from "@aptos-labs/ts-sdk";
import { BitgetWallet } from "@bitget-wallet/aptos-wallet-adapter";
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';

const Provider = ({ children }: { children: ReactNode }) => {


    const wallets = [
        new BitgetWallet(),
        new MartianWallet(),
        new PontemWallet(),
        new OKXWallet(),
    ];


    return (
        <AptosWalletAdapterProvider
            plugins={wallets}
            autoConnect
            onError={(error) => {
                console.log("Error >>>", error);

            }}
        >
            {children}
        </AptosWalletAdapterProvider>
    );
};

export default Provider;