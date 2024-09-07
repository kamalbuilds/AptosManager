"use client"

import React, { useEffect, useState } from "react"
import { fetchTokenDetails } from "@/helpers/TokensData"
import { RotatingLines } from "react-loader-spinner"

import { Button } from "@/components/ui/button"
import CoinInfo from "@/components/tokens/CoinInfo"
import CoinTransfers from "@/components/tokens/CoinTransfers"
import { NODEREAL_URL } from "@/config/url.config"


type TokenType = {
    price: string;
    coin_type_hash: string;
    coin_type: string;
    created_transaction_version: number;
    creator_address: string;
    name: string;
    symbol: string;
    decimals: number;
    supply: string;
    supply_aggregator_table_handle: string;
    supply_aggregator_table_key: string;
    created_transaction_timestamp: string;
    transfer_count: number;
    holder_count: number;
    validated: boolean;
}

const TokenPage = ({ params }: { params: any }) => {
    console.log("Params", params)

    const { tokenId } = params;

    const [isloading, setIsloading] = useState(false)
    const [coinInfo, setCoinInfo] = useState<TokenType>()

    const handleGetTokenPrice = async () => {
        try {
            setIsloading(true)
            const url = `${NODEREAL_URL}/api/coin/${tokenId}`
            const res = await fetch(url)
            const response = await res.json()
            console.log("Response", response);
            if (response.msg === 'success') {
                setIsloading(false)
                setCoinInfo(response.data)
            }

        } catch (error) {
            setIsloading(false)
            console.log("Error in fetching price of the token");
        }
    }

    useEffect(() => {
        if (tokenId) {
            handleGetTokenPrice();
        }

    }, [tokenId])

    return (
        <div className="w-full px-12 py-4">
            {isloading ? (
                <RotatingLines
                    visible={true}
                    width="40"
                    strokeColor="#2c68e7"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                />
            ) : (
                <>
                    {!coinInfo && <div>No data available</div>}
                    {coinInfo && (
                        <div className="flex flex-col gap-4">
                            <CoinInfo coinInfo={coinInfo} />
                            <CoinTransfers tokenId={coinInfo.coin_type} decimal={coinInfo.decimals} />
                        </div>
                    )}
                </>
            )}

        </div>
    )
}

export default TokenPage
