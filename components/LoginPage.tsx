"use client"

import { useContext, useState } from "react"
import { useRouter } from "next/navigation"
import { GlobalContext } from "@/context/GlobalContext"

import { APP_PATHS } from "@/config/Routes"
import { fetchAccountData } from "@/config/fetchAccountData"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import SocialIcons from "./SocialIcons"
import { WalletSelector } from "./WalletSelector"
import { Separator } from "./ui/separator"

export function LoginPage() {
  const {
    address,
    setAddress,
    setNFTsData,
    setTokensData,
    setTokenTransferData,
    setNFTsTransferData,
  } = useContext(GlobalContext)

  const [userAddress, setUserAddress] = useState("")
  const router = useRouter()

  const handleConnect = async () => {
    if (!userAddress) return
    setAddress(userAddress)
    try {
      const res = await fetchAccountData(userAddress)
      console.log("userAddress", res)

      if (res) {
        const {
          current_fungible_asset_balances: userTokensDetails,
          current_token_ownerships_v2: userNFTDetails,
          fungible_asset_activities: userTokenTransferDetails,
          token_activities_v2: userNFTTransferDetails,
        } = res

        if (userTokensDetails) setTokensData(userTokensDetails)
        if (userNFTDetails) setNFTsData(userNFTDetails)
        if (userTokenTransferDetails)
          setTokenTransferData(userTokenTransferDetails)
        if (userNFTTransferDetails) setNFTsTransferData(userNFTTransferDetails)

        router.push(`${APP_PATHS.PROFILE}/${userAddress}`)
      }
    } catch (error) {
      console.log("Error", error)
    }
  }

  return (
    <div className="flex h-[80vh] w-full items-center justify-center px-4">
      <Card className="mx-auto w-2/3 max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">AptoBank</CardTitle>
          <CardDescription>
            Your personalised Bank on Aptos Blockchain
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-8">

            <Separator />

            <div className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Enter Aptos address"
                value={userAddress}
                onChange={(e) => setUserAddress(e.target.value)}
              />
              <Button onClick={handleConnect}>Explore</Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Reach out to us for any query.
              <SocialIcons />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
