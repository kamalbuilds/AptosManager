"use client"
import React, { useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import CoinTransferListItem from "./components/CoinTransferListItem"
import { fetchTokenDetails } from "@/helpers/TokensData"
import { Button } from "../ui/button"
import { RotatingLines } from "react-loader-spinner"
const CoinTransfers = ({ tokenId, decimal }: { tokenId: string, decimal: number }) => {

    const [isloading, setIsloading] = useState(false)
    const [coinActivities, setCoinActivities] = useState([])

    const handleGetTokenDetails = async () => {
        try {
            setIsloading(true)
            const res = await fetchTokenDetails(tokenId)
            console.log("Res", res)
            if (res.coin_activities) {
                setIsloading(false)
                setCoinActivities(res.coin_activities)
            }
        } catch (error) {
            setIsloading(false)
        }
    }

    useEffect(() => {

        if (tokenId) {
            handleGetTokenDetails();
        }

    }, [tokenId])


    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>From Address</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Action Type</TableHead>
                    <TableHead>Date</TableHead>
                </TableRow>
            </TableHeader>
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
                <TableBody>
                    {coinActivities.map((collection: any, index: any) => {
                        return <CoinTransferListItem tokenTransfer={collection} key={index} decimal={decimal} />
                    })}
                </TableBody>
            )}

        </Table>
    )
}

export default CoinTransfers
