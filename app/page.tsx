"use client"

import { useContext, useState } from "react"
import { NFTData } from "@/constants/NFTDataByAccount"
import { TokenData } from "@/constants/TokenDataByAccount"
import { GlobalContext } from "@/context/GlobalContext"
import { useWallet } from "@aptos-labs/wallet-adapter-react"

import { fetchNFTsDataByAccount } from "@/config/fetchNFTsDataByAccount"
import { fetchTokensDataByAccount } from "@/config/fetchTokensDataByAccount"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoginPage } from "@/components/LoginPage"
import { DefiComponent } from "@/components/defi"
import { Overview } from "@/components/overview"
import { Portfolio } from "@/components/portfolio"
import { SidebarComponent } from "@/components/sidebar"
import { TransferComponent } from "@/components/transfers"

export default function Component() {
  const { connected } = useWallet()
  const {
    activeTab,
    address,
    setAddress,
    setTokensData,
    tokensData,
    NFTsData,
    setNFTsData,
  } = useContext(GlobalContext)

  const handleExplore = async () => {
    // if (!address) return

    //TODO: Change this when not using constant
    // const { current_fungible_asset_balances, fungible_asset_activities } =
    //   await fetchTokensDataByAccount(address)
    const { current_fungible_asset_balances, fungible_asset_activities } =
      TokenData

    if (current_fungible_asset_balances) {
      console.log(
        "current_fungible_asset_balances",
        current_fungible_asset_balances
      )
      setTokensData(current_fungible_asset_balances)
    }

    if (fungible_asset_activities) {
      console.log("fungible_asset_activities", fungible_asset_activities)
    }

    // const { current_token_ownerships_v2, token_activities_v2 } =
    //   await fetchNFTsDataByAccount(address)
    const { current_token_ownerships_v2, token_activities_v2 } = NFTData

    if (current_token_ownerships_v2) {
      console.log("current_token_ownerships_v2", current_token_ownerships_v2)
      setNFTsData(current_token_ownerships_v2)
    }

    if (token_activities_v2) {
      console.log("token_activities_v2", token_activities_v2)
    }
  }

  return (
    <>
      <div className="flex h-screen ">
        <SidebarComponent />
        <div className="flex-1 overflow-auto p-8">
          <header className="mb-8">
            <h1 className="mb-4 text-3xl font-bold">Aptos Explorer</h1>
            {!connected && (
              <div className="flex gap-4">
                <Input
                  type="text"
                  placeholder="Enter Aptos address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-96"
                />
                <Button onClick={handleExplore}>Explore</Button>
              </div>
            )}
          </header>
          {activeTab === "portfolio" && <Portfolio />}
          {activeTab === "transfers" && <TransferComponent />}
          {activeTab === "defi" && <DefiComponent />}
        </div>
      </div>
    </>
  )
}
