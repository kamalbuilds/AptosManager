/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useContext, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { GlobalContext } from '@/context/GlobalContext';

const NFTsComponent = () => {
    const [nfts, setNfts] = useState([])

    const { NFTsData } = useContext(GlobalContext);

    console.log("NFTsData", NFTsData)

    return (
        <Card>
            <CardHeader>
                <CardTitle>NFTs</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Collection Name</TableHead>
                            <TableHead>Curr_Supply</TableHead>
                            <TableHead>Store</TableHead>
                            <TableHead>Type</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {NFTsData.map((nft: any, index) => {
                            const amount = nft.amount;
                            if (amount > 0) {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{nft.current_token_data.token_name}</TableCell>
                                        <TableCell>{nft.amount}</TableCell>
                                        <TableCell>{nft.current_token_data.current_collection.collection_name}</TableCell>
                                        <TableCell>{nft.current_token_data.current_collection.current_supply}</TableCell>
                                        <TableCell>{nft.table_type_v1}</TableCell>
                                        <TableCell>{nft.token_standard}</TableCell>
                                    </TableRow>
                                )
                            } else {
                                return null
                            }

                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export { NFTsComponent };