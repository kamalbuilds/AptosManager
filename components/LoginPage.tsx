"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useContext, useState } from "react"
import { GlobalContext } from "@/context/GlobalContext"
import { WalletSelector } from "./WalletSelector"
import { Separator } from "./ui/separator"
import SocialIcons from "./SocialIcons"
import { fetchTokensDataByAccount } from "@/config/fetchTokensDataByAccount"
import { fetchNFTsDataByAccount } from "@/config/fetchNFTsDataByAccount"

export function LoginPage() {
    const { address, setAddress, setNFTsData, setTokensData, setTokenTransferData, setNFTsTransferData } = useContext(GlobalContext);

    const [userAddress, setUserAddress] = useState('');

    const handleConnect = async () => {
        if (!userAddress) return

        setAddress(userAddress);

        const { current_fungible_asset_balances, fungible_asset_activities } = await fetchTokensDataByAccount(userAddress);

        console.log("responsese", current_fungible_asset_balances, fungible_asset_activities);

        if (current_fungible_asset_balances) {
            console.log("current_fungible_asset_balances", current_fungible_asset_balances);
            setTokensData(current_fungible_asset_balances)
        }

        if (fungible_asset_activities) {
            console.log("fungible_asset_activities", fungible_asset_activities);
            setTokenTransferData(fungible_asset_activities)
        }

        const { current_token_ownerships_v2, token_activities_v2 } = await fetchNFTsDataByAccount(userAddress);

        if (current_token_ownerships_v2) {
            console.log("current_token_ownerships_v2", current_token_ownerships_v2);
            setNFTsData(current_token_ownerships_v2);
        }

        if (token_activities_v2) {
            console.log("token_activities_v2", token_activities_v2);
            setNFTsTransferData(token_activities_v2);
        }

    }


    return (
        <div className="flex h-[80vh] w-full items-center justify-center px-4">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">AptoBank</CardTitle>
                    <CardDescription>
                        Your personalised Bank on Aptos Blockchain
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-8">

                        <WalletSelector />

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
