"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Activity } from 'lucide-react';

const DefiComponent = () => {
    const [protocolPositions, setProtocolPositions] = useState([])


    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>DeFi Positions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Protocol</TableHead>
                                <TableHead>Value</TableHead>
                                <TableHead>APY</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {protocolPositions.map((position, index) => (
                                <TableRow key={index}>
                                    <TableCell>{position.name}</TableCell>
                                    <TableCell>${position.value}</TableCell>
                                    <TableCell>{position.apy}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>DeFi Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <Activity className="mr-2 size-4" />
                            <span>Deposited 100 APT into Liquidswap</span>
                        </div>
                        <div className="flex items-center">
                            <Activity className="mr-2 size-4" />
                            <span>Borrowe 50 USDC from Aries Markets</span>
                        </div>
                        <div className="flex items-center">
                            <Activity className="mr-2 size-4" />
                            <span>Staked 200 APT in Tortuga</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export { DefiComponent };