"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const CoinsComponent = () => {
    const [coinBalances, setCoinBalances] = useState([])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Coin Balances</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Coin Type</TableHead>
                            <TableHead>Balance</TableHead>
                            <TableHead>Value (USD)</TableHead>
                            <TableHead>24h Change</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {coinBalances.map((coin: any, index) => (
                            <TableRow key={index}>
                                <TableCell>{coin.coin_type}</TableCell>
                                <TableCell>{coin.amount}</TableCell>
                                <TableCell>${(coin.amount * 1).toFixed(2)}</TableCell>
                                <TableCell className="text-green-500">+2.5%</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export { CoinsComponent };