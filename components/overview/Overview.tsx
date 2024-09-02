import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const Overview = () => {

    const totalPortfolioValue = 0
    const coinBalances = []
    const nfts = []

    const portfolioData = [
        { date: '2023-01-01', value: 1000 },
        { date: '2023-02-01', value: 1200 },
        { date: '2023-03-01', value: 1100 },
        { date: '2023-04-01', value: 1400 },
        { date: '2023-05-01', value: 1300 },
        { date: '2023-06-01', value: 1600 },
    ]

    const renderPortfolioChart = (
        <ResponsiveContainer width="100%" height={200}>
            <LineChart data={portfolioData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    )

    return (
        <div>
            <h1 className="mb-4 text-3xl font-bold">OverView</h1>

            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Portfolio Value</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">${totalPortfolioValue.toLocaleString()}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Coin Types</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{coinBalances.length}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>NFTs Owned</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{nfts.length}</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Portfolio Value Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                    {renderPortfolioChart}
                </CardContent>
            </Card>
        </div>
    );
};

export { Overview };