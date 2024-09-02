"use client"
import React, { useContext, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { GlobalContext } from '@/context/GlobalContext';

const CoinsComponent = () => {
    const { tokensData } = useContext(GlobalContext);
    console.log("tokensData", tokensData);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Coin Balances</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Index</TableHead>
                            <TableHead>Coin Type</TableHead>
                            <TableHead>Balance</TableHead>
                            <TableHead>Symbol</TableHead>
                            <TableHead>Type</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tokensData.map((coin: any, index) => {
                            const balance = coin.metadata ? ((coin.amount) / 10 ** (coin.metadata.decimals)) : coin.amount;
                            return (
                                <TableRow key={index}>
                                    <TableCell>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{coin.metadata ? coin.metadata.name : 'NULL'}</TableCell>
                                    <TableCell>{balance.toFixed(4)}</TableCell>
                                    <TableCell>{coin.metadata ? coin.metadata.symbol : 'NULL'}</TableCell>
                                    <TableCell className="capitalize">{coin.token_standard}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export { CoinsComponent };