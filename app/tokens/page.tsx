"use client"

import { useEffect, useState } from "react"
import {
  fetchTokenDataBySymbol,
  fetchTokensDataByName,
} from "@/helpers/TokensData"
import { ChevronLeft, ChevronRight, Coins, Search } from "lucide-react"
import { RotatingLines } from "react-loader-spinner"

import { NODEREAL_URL } from "@/config/url.config"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function TokenPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchType, setSearchType] = useState("name")
  const [coins, setCoins] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const [searchTokenDetails, setSearchTokenDetails] = useState([])

  const totalPages = 10
  const handlePrevPage = () => {
    const page = Math.max(currentPage - 1, 1)
    setCurrentPage((prev) => Math.max(prev - 1, 1))
    console.log("Page", page)

    handleGetTokenData(page)
  }

  const handleNextPage = () => {
    const page = Math.min(currentPage + 1, totalPages)
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    console.log("Page >>", page)

    handleGetTokenData(page)
  }

  const [isLoading, setIsLoading] = useState(false)
  const handleGetTokenData = async (page?: number) => {
    try {
      const currPage = page ? page - 1 : 0

      setIsLoading(true)
      const url = `${NODEREAL_URL}/api/coin?page=${currPage}&pageSize=10`
      const res = await fetch(url)

      const response = await res.json()
      console.log("Token Collection >>", response)
      if (response.msg === "success") {
        setIsLoading(false)
        setCoins(response.data.coins_list)
      }
      return response
    } catch (error) {
      setIsLoading(false)
      console.log("Error", error)
      return null
    }
  }

  useEffect(() => {
    handleGetTokenData(1)
  }, [])

  const handleSearch = async () => {
    // Search by name or symbol

    if (searchTerm === "name") {
      setIsLoading(true)
      const response = await fetchTokensDataByName(searchTerm)
      console.log("Token Collection >>", response)

      if (response) {
        setIsLoading(false)
        setSearchTokenDetails(response.coin_infos)
      } else {
        setIsLoading(false)
        setSearchTokenDetails([])
      }
    }

    if (searchTerm === "symbol") {
      setIsLoading(true)
      const response = await fetchTokenDataBySymbol(searchTerm)
      console.log("Token Collection >>", response)

      if (response) {
        setIsLoading(false)
        setSearchTokenDetails(response.coin_infos)
      } else {
        setIsLoading(false)
        setSearchTokenDetails([])
      }
    }
  }

  const handleClear = () => {
    setSearchTerm("")
    setSearchTokenDetails([])
    handleGetTokenData(1)
  }

  console.log("Coins", coins)
  console.log("searchTokenDetails", searchTokenDetails)

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-8 text-3xl font-bold">Aptos Coin Explorer</h1>

      <div className="mb-8">
        <div className="mb-4 flex flex-col gap-4">
          <RadioGroup
            defaultValue="name"
            onValueChange={setSearchType}
            className="flex gap-4"
          >
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
            <Button onClick={handleClear}>Clear</Button>
            <Button onClick={handleSearch}>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </div>

        {searchTokenDetails.length ? (
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
                    <TableHead>Decimal</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                {isLoading ? (
                  <div className="flex h-[50vh] w-full items-center justify-center">
                    <RotatingLines
                      visible={true}
                      width="40"
                      strokeColor="#2c68e7"
                      strokeWidth="5"
                      animationDuration="0.75"
                      ariaLabel="rotating-lines-loading"
                    />
                  </div>
                ) : (
                  <TableBody className="h-[50vh]">
                    {!searchTokenDetails.length && <div>No Data available</div>}
                    {searchTokenDetails.map((coin: any, index) => (
                      <TableRow key={index}>
                        <TableCell>{coin.name}</TableCell>
                        <TableCell>{coin.symbol}</TableCell>
                        <TableCell>{coin.decimals}</TableCell>
                        <TableCell>{coin.coin_type.slice(0, 90)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
              <div className="mt-4 flex items-center justify-between">
                <Button onClick={handlePrevPage} disabled={currentPage === 1}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Coins</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Holders</TableHead>
                    <TableHead>Transfers</TableHead>
                  </TableRow>
                </TableHeader>
                {isLoading ? (
                  <div className="flex h-[50vh] w-full items-center justify-center">
                    <RotatingLines
                      visible={true}
                      width="40"
                      strokeColor="#2c68e7"
                      strokeWidth="5"
                      animationDuration="0.75"
                      ariaLabel="rotating-lines-loading"
                    />
                  </div>
                ) : (
                  <TableBody className="h-[50vh]">
                    {!coins.length && <div>No Data available</div>}
                    {coins.map((coin: any, index) => (
                      <TableRow key={index}>
                        <TableCell>{coin.rank}</TableCell>
                        <TableCell>{coin.name}</TableCell>
                        <TableCell>{coin.price ?? "-"}</TableCell>
                        <TableCell>{coin.symbol}</TableCell>
                        <TableCell>
                          {coin.holder_count.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {coin.transfer_count.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
              {!!coins.length && (
                <div className="mt-4 flex items-center justify-between">
                  <Button onClick={handlePrevPage} disabled={currentPage === 1}>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
