"use client";

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Wallet, Coins, Image, ArrowUpDown, PieChart, TrendingUp, Activity } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

// todo : fetch the data using nodit
const fetchData = async (endpoint: string) => {
 
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay
  return []
}

// Mock data for portfolio value chart
const portfolioData = [
  { date: '2023-01-01', value: 1000 },
  { date: '2023-02-01', value: 1200 },
  { date: '2023-03-01', value: 1100 },
  { date: '2023-04-01', value: 1400 },
  { date: '2023-05-01', value: 1300 },
  { date: '2023-06-01', value: 1600 },
]

export default function Component() {
  const [address, setAddress] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const [coinBalances, setCoinBalances] = useState([])
  const [nfts, setNfts] = useState([])
  const [coinTransfers, setCoinTransfers] = useState([])
  const [nftTransfers, setNftTransfers] = useState([])
  const [protocolPositions, setProtocolPositions] = useState([])
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0)

  useEffect(() => {
    if (address) {
      fetchData(`https://api.nodit.io/coins/balances/${address}`).then(setCoinBalances)
      fetchData(`https://api.nodit.io/nfts/${address}`).then(setNfts)
      fetchData(`https://api.nodit.io/coins/transfers/${address}`).then(setCoinTransfers)
      fetchData(`https://api.nodit.io/nfts/transfers/${address}`).then(setNftTransfers)
      // Mock data for protocol positions and portfolio value
      setProtocolPositions([
        { name: 'Liquidswap', value: 500, apy: '5.2%' },
        { name: 'Aries Markets', value: 300, apy: '3.8%' },
        { name: 'Tortuga', value: 200, apy: '4.5%' },
      ])
      setTotalPortfolioValue(1600)
    }
  }, [address])

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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Aptos Explorer</h2>
          <nav>
            <Button 
              variant={activeTab === 'overview' ? "default" : "ghost"} 
              className="w-full justify-start mb-2"
              onClick={() => setActiveTab('overview')}
            >
              <BarChart className="mr-2 h-4 w-4" />
              Overview
            </Button>
            <Button 
              variant={activeTab === 'portfolio' ? "default" : "ghost"} 
              className="w-full justify-start mb-2"
              onClick={() => setActiveTab('portfolio')}
            >
              <PieChart className="mr-2 h-4 w-4" />
              Portfolio
            </Button>
            <Button 
              variant={activeTab === 'coins' ? "default" : "ghost"} 
              className="w-full justify-start mb-2"
              onClick={() => setActiveTab('coins')}
            >
              <Coins className="mr-2 h-4 w-4" />
              Coins
            </Button>
            <Button 
              variant={activeTab === 'nfts' ? "default" : "ghost"} 
              className="w-full justify-start mb-2"
              onClick={() => setActiveTab('nfts')}
            >
              <Image className="mr-2 h-4 w-4" />
              NFTs
            </Button>
            <Button 
              variant={activeTab === 'transfers' ? "default" : "ghost"} 
              className="w-full justify-start mb-2"
              onClick={() => setActiveTab('transfers')}
            >
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Transfers
            </Button>
            <Button 
              variant={activeTab === 'defi' ? "default" : "ghost"} 
              className="w-full justify-start mb-2"
              onClick={() => setActiveTab('defi')}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              DeFi
            </Button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Aptos Explorer</h1>
          <div className="flex gap-4">
            <Input 
              type="text" 
              placeholder="Enter Aptos address" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)}
              className="w-96"
            />
            <Button>Explore</Button>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="coins">Coins</TabsTrigger>
            <TabsTrigger value="nfts">NFTs</TabsTrigger>
            <TabsTrigger value="transfers">Transfers</TabsTrigger>
            <TabsTrigger value="defi">DeFi</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
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
          </TabsContent>

          <TabsContent value="portfolio">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Asset Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center">
                    <PieChart className="h-full w-full text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderPortfolioChart}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="coins">
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
          </TabsContent>

          <TabsContent value="nfts">
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
          </TabsContent>

          <TabsContent value="transfers">
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
          </TabsContent>

          <TabsContent value="defi">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <Activity className="mr-2 h-4 w-4" />
                      <span>Deposited 100 APT into Liquidswap</span>
                    </div>
                    <div className="flex items-center">
                      <Activity className="mr-2 h-4 w-4" />
                      <span>Borrowe 50 USDC from Aries Markets</span>
                    </div>
                    <div className="flex items-center">
                      <Activity className="mr-2 h-4 w-4" />
                      <span>Staked 200 APT in Tortuga</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}