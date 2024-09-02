"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const NFTsComponent = () => {
    const [nfts, setNfts] = useState([])

    return (
        <Card>
            <CardHeader>
                <CardTitle>NFTs</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Collection</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Token ID</TableHead>
                            <TableHead>Estimated Value</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {nfts.map((nft: any, index) => (
                            <TableRow key={index}>
                                <TableCell>{nft.collection}</TableCell>
                                <TableCell>{nft.name}</TableCell>
                                <TableCell>{nft.token_id}</TableCell>
                                <TableCell>$100</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export { NFTsComponent };