"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getNFTCollectionData } from "@/helpers/NFTSData"
import { fetchNFTCollectionByCollectionName } from "@/helpers/NFTSData/fetchNFTCollectionByCollectionName"
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Image,
  Search,
} from "lucide-react"
import { RotatingLines } from "react-loader-spinner"

import { APP_PATHS } from "@/config/Routes"
import { shortenAddress } from "@/lib/shortenAddress"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = 10

  const router = useRouter()

  const [NFTCollectionData, setNFTCollectionData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showPagination, setShowPagination] = useState(true)

  const handlePrevPage = () => {
    const page = Math.min(currentPage - 1, 1)
    setCurrentPage((prev) => Math.max(prev - 1, 1))
    handleFetchCollectionData(Number(page))
  }

  const handleNextPage = () => {
    const page = Math.min(currentPage + 1, totalPages)
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    handleFetchCollectionData(Number(page))
  }

  const handleFetchCollectionData = async (page: number) => {
    try {
      setIsLoading(true)
      const res = await getNFTCollectionData(page)
      if (res.current_collections_v2) {
        setIsLoading(false)
        setShowPagination(true)
        setNFTCollectionData(res.current_collections_v2)
      }
    } catch (error) {
      setIsLoading(false)
      console.log("Error", error)
    }
  }

  const handleFetchCollectionDataByCollectionName = async () => {
    if (!searchTerm) return

    try {
      setIsLoading(true)
      const res = await fetchNFTCollectionByCollectionName(searchTerm)
      if (res.current_collections_v2) {
        setIsLoading(false)
        setShowPagination(false)
        setNFTCollectionData(res.current_collections_v2)
      }
    } catch (error) {
      setIsLoading(false)
      console.log("Error", error)
    }
  }

  useEffect(() => {
    handleFetchCollectionData(1)
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-8 text-3xl font-bold">Aptos NFT Explorer</h1>

      <div className="mb-8">
        <div className="mb-4 flex gap-4">
          <Input
            type="text"
            placeholder="Search NFT collections by Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md"
          />
          <Button onClick={handleFetchCollectionDataByCollectionName}>
            <Search className="mr-2 size-4" />
            Search
          </Button>
          <Button
            disabled={searchTerm.length <= 0}
            onClick={() => {
              setSearchTerm("")
              handleFetchCollectionData(1)
            }}
          >
            Clear
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>NFT Collections</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Index</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Creator</TableHead>
                  <TableHead>Curr Supply</TableHead>
                  <TableHead>Max Supply</TableHead>
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
                  {!NFTCollectionData.length && <div>No Data available</div>}
                  {NFTCollectionData.map((collection: any, index) => {
                    const adjustedIndex = index + 1 + (currentPage - 1) * 10
                    return (
                      <TableRow
                        key={index}
                        className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
                      >
                        <TableCell>{adjustedIndex}</TableCell>
                        <TableCell
                          className="cursor-pointer text-blue-500 hover:underline"
                          onClick={() =>
                            router.push(
                              `${APP_PATHS.NFTS}/${collection.collection_id}`
                            )
                          }
                        >
                          {collection.collection_name}
                        </TableCell>
                        <TableCell
                          className="cursor-pointer text-blue-500 hover:underline"
                          onClick={() => {
                            if (collection?.creator_address)
                              router.push(
                                `${APP_PATHS.PROFILE}/${collection?.creator_address}`
                              )
                          }}
                        >
                          {shortenAddress(collection?.creator_address, 10)}
                        </TableCell>
                        <TableCell>
                          {collection.current_supply?.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {collection.max_supply?.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              )}
            </Table>
            {showPagination && (
              <div className="mt-4 flex items-center justify-between">
                <Button onClick={handlePrevPage} disabled={currentPage === 1}>
                  <ChevronLeft className="mr-2 size-4" />
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
                  <ChevronRight className="ml-2 size-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
