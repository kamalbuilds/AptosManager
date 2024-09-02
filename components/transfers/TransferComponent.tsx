"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const TransferComponent = () => {
    const [coinTransfers, setCoinTransfers] = useState([])
    const [nftTransfers, setNftTransfers] = useState([])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Transfers</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="coins">
                    <TabsList>
                        <TabsTrigger value="coins">Coin Transfers</TabsTrigger>
                        <TabsTrigger value="nfts">NFT Transfers</TabsTrigger>
                    </TabsList>
                    <TabsContent value="coins">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>From</TableHead>
                                    <TableHead>To</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Coin Type</TableHead>
                                    <TableHead>Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {coinTransfers.map((transfer: any, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{transfer.from}</TableCell>
                                        <TableCell>{transfer.to}</TableCell>
                                        <TableCell>{transfer.amount}</TableCell>
                                        <TableCell>{transfer.coin_type}</TableCell>
                                        <TableCell>{new Date().toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabsContent>
                    <TabsContent value="nfts">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>From</TableHead>
                                    <TableHead>To</TableHead>
                                    <TableHead>Collection</TableHead>
                                    <TableHead>Token ID</TableHead>
                                    <TableHead>Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {nftTransfers.map((transfer: any, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{transfer.from}</TableCell>
                                        <TableCell>{transfer.to}</TableCell>
                                        <TableCell>{transfer.collection}</TableCell>
                                        <TableCell>{transfer.token_id}</TableCell>
                                        <TableCell>{new Date().toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};

export { TransferComponent };