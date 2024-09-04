"use client"
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Coins, ChevronLeft, ChevronRight } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

// @kamal use nodit api here
const fetchCoinsByName = async (name: string, page = 1, pageSize = 5) => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  const allCoins = [
    { name: 'Aptos', symbol: 'APT', creator: '0x1', supply: '1000000000' },
    { name: 'Aptos USD', symbol: 'aptUSD', creator: '0x2', supply: '1000000' },
    { name: 'Aptos Euro', symbol: 'aptEUR', creator: '0x3', supply: '500000' },
    { name: 'Aptos Gold', symbol: 'aptGOLD', creator: '0x4', supply: '100000' },
    { name: 'Aptos Silver', symbol: 'aptSILVER', creator: '0x5', supply: '200000' },
    { name: 'Aptos Bronze', symbol: 'aptBRONZE', creator: '0x6', supply: '300000' },
    { name: 'Aptos Platinum', symbol: 'aptPLAT', creator: '0x7', supply: '50000' },
  ].filter(coin => coin.name.toLowerCase().includes(name.toLowerCase()))

  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  return {
    coins: allCoins.slice(startIndex, endIndex),
    totalPages: Math.ceil(allCoins.length / pageSize)
  }
}

const fetchCoinsBySymbol = async (symbol: string, page = 1, pageSize = 5) => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  const allCoins = [
    { name: 'Aptos', symbol: 'APT', creator: '0x1', supply: '1000000000' },
    { name: 'Aptos USD', symbol: 'aptUSD', creator: '0x2', supply: '1000000' },
    { name: 'Aptos Euro', symbol: 'aptEUR', creator: '0x3', supply: '500000' },
    { name: 'Aptos Gold', symbol: 'aptGOLD', creator: '0x4', supply: '100000' },
    { name: 'Aptos Silver', symbol: 'aptSILVER', creator: '0x5', supply: '200000' },
    { name: 'Aptos Bronze', symbol: 'aptBRONZE', creator: '0x6', supply: '300000' },
    { name: 'Aptos Platinum', symbol: 'aptPLAT', creator: '0x7', supply: '50000' },
  ].filter(coin => coin.symbol.toLowerCase().includes(symbol.toLowerCase()))

  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  return {
    coins: allCoins.slice(startIndex, endIndex),
    totalPages: Math.ceil(allCoins.length / pageSize)
  }
}

export default function TokenPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchType, setSearchType] = useState('name')
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchCoins = async () => {
      if (!searchTerm) {
        setCoins([])
        setTotalPages(1)
        return
      }

      setLoading(true)
      setError('')
      try {
        let data
        if (searchType === 'name') {
          data = await fetchCoinsByName(searchTerm, currentPage)
        } else {
          data = await fetchCoinsBySymbol(searchTerm, currentPage)
        }
        setCoins(data.coins)
        setTotalPages(data.totalPages)
      } catch (err) {
        setError('Failed to fetch coins. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchCoins()
  }, [searchTerm, searchType, currentPage])

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Aptos Coin Explorer</h1>
      
      <div className="mb-8">
        <div className="flex flex-col gap-4 mb-4">
          <RadioGroup defaultValue="name" onValueChange={setSearchType} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="name" id="name" />
              <Label htmlFor="name">Search by Name</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="symbol" id="symbol" />
              <Label htmlFor="symbol">Search by Symbol</Label>
            </div>
          </RadioGroup>
          <div className="flex gap-4">
            <Input 
              type="text" 
              placeholder={`Search coins by ${searchType}`} 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md"
            />
            <Button>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
        
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        
        {!loading && !error && coins.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Coins</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Creator</TableHead>
                    <TableHead>Supply</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coins.map((coin: any, index) => (
                    <TableRow key={index}>
                      <TableCell>{coin.name}</TableCell>
                      <TableCell>{coin.symbol}</TableCell>
                      <TableCell>{coin.creator}</TableCell>
                      <TableCell>{coin.supply}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-between items-center mt-4">
                <Button onClick={handlePrevPage} disabled={currentPage === 1}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <span>Page {currentPage} of {totalPages}</span>
                <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        {!loading && !error && coins.length === 0 && searchTerm && (
          <p>No coins found. Try a different search term.</p>
        )}
      </div>
    </div>
  )
}