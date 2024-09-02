"use client";

import { useState, useContext } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarComponent } from '@/components/sidebar';
import { GlobalContext } from '@/context/GlobalContext';
import { Overview } from '@/components/overview';
import { Portfolio } from '@/components/portfolio';
import { CoinsComponent } from '@/components/coins';
import { NFTsComponent } from '@/components/nfts';
import { TransferComponent } from '@/components/transfers';
import { DefiComponent } from '@/components/defi';
import { fetchTokensDataByAccount } from '@/config/fetchTokensDataByAccount';
import { fetchNFTsDataByAccount } from '@/config/fetchNFTsDataByAccount';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { LoginPage } from '@/components/LoginPage';

export default function Component() {

  const { connected } = useWallet();
  const { activeTab, address, setAddress, setTokensData, tokensData, NFTsData, setNFTsData } = useContext(GlobalContext);

  const handleExplore = async () => {
    if (!address) return

    const { current_fungible_asset_balances, fungible_asset_activities } = await fetchTokensDataByAccount(address);

    if (current_fungible_asset_balances) {
      console.log("current_fungible_asset_balances", current_fungible_asset_balances);
      setTokensData(current_fungible_asset_balances)
    }

    if (fungible_asset_activities) {
      console.log("fungible_asset_activities", fungible_asset_activities);
    }

    const { current_token_ownerships_v2, token_activities_v2 } = await fetchNFTsDataByAccount(address);

    if (current_token_ownerships_v2) {
      console.log("current_token_ownerships_v2", current_token_ownerships_v2);
      setNFTsData(current_token_ownerships_v2);
    }

    if (token_activities_v2) {
      console.log("token_activities_v2", token_activities_v2);
    }

  }



  return (
    <>

      {!address && <LoginPage />}

      {address && (
        <div className="flex h-screen bg-gray-100">
          <SidebarComponent />
          <div className="flex-1 overflow-auto p-8">
            <header className="mb-8">
              <h1 className="mb-4 text-3xl font-bold">Aptos Explorer</h1>
              {!connected && <div className="flex gap-4">
                <Input
                  type="text"
                  placeholder="Enter Aptos address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-96"
                />
                <Button onClick={handleExplore}>Explore</Button>
              </div>}
            </header>
            {activeTab === 'overview' && <Overview />}
            {activeTab === 'portfolio' && <Portfolio />}
            {activeTab === 'coins' && <CoinsComponent />}
            {activeTab === 'nfts' && <NFTsComponent />}
            {activeTab === 'transfers' && <TransferComponent />}
            {activeTab === 'defi' && <DefiComponent />}
          </div>
        </div>
      )}



    </>
  )
}