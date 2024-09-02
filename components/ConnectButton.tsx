"use client"
import React, { useContext } from 'react';
import { WalletSelector } from './WalletSelector';
import { Input } from './ui/input';
import { GlobalContext } from '@/context/GlobalContext';
import { Button } from './ui/button';
import { fetchTokensDataByAccount } from '@/config/fetchTokensDataByAccount';
import { fetchNFTsDataByAccount } from '@/config/fetchNFTsDataByAccount';

const ConnectButton = () => {
    const { address, setAddress, setTokensData, setNFTsData } = useContext(GlobalContext);

    const handleExplore = async () => {
        if (!address) return

        const { current_fungible_asset_balances, fungible_asset_activities } = await fetchTokensDataByAccount(address);

        console.log("responsese", current_fungible_asset_balances, fungible_asset_activities);

        if (current_fungible_asset_balances) {
            console.log("current_fungible_asset_balances", current_fungible_asset_balances);
            setTokensData(current_fungible_asset_balances)
        }

        if (fungible_asset_activities) {
            console.log("fungible_asset_activities", fungible_asset_activities);
        }

        const { current_token_ownerships_v2, token_activities_v2 } = await fetchNFTsDataByAccount('0x274c398a921b8e2ba345feac3039e1c8b196a7eb1395cdd3584af3a85eb9ec50');

        if (current_token_ownerships_v2) {
            console.log("current_token_ownerships_v2", current_token_ownerships_v2);
            setNFTsData(current_token_ownerships_v2);
        }

        if (token_activities_v2) {
            console.log("token_activities_v2", token_activities_v2);
        }


    }






    return (
        <div className='flex flex-row gap-2'>
            {/* <div className="flex gap-4">
                <Input
                    type="text"
                    placeholder="Enter Aptos address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-96"
                />
                <Button onClick={() => {
                    handleExplore();
                }}>Explore</Button>
            </div> */}
            <WalletSelector />
        </div>
    );
};

export default ConnectButton;