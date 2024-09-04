"use client";
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Image, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react'

// use nodit here @kamal
const fetchNFTCollections = async (searchTerm = '', page = 1, pageSize = 3) => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  const allCollections = [
    { creator: '0x1', name: 'Aptos Monkeys', nft_count: 10000, floor_price: 10, volume_24h: 5000 },
    { creator: '0x2', name: 'Aptomingos', nft_count: 5000, floor_price: 5, volume_24h: 2000 },
    { creator: '0x3', name: 'Aptos Undead', nft_count: 3000, floor_price: 3, volume_24h: 1000 },
    { creator: '0x4', name: 'Aptos Punks', nft_count: 8000, floor_price: 8, volume_24h: 4000 },
    { creator: '0x5', name: 'Aptos Cats', nft_count: 6000, floor_price: 6, volume_24h: 3000 },
  ].filter(collection => collection.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  return {
    collections: allCollections.slice(startIndex, endIndex),
    totalPages: Math.ceil(allCollections.length / pageSize)
  }
}

const fetchNFTCollectionByName = async (name: string) => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    creator: '0x1',
    name: name,
    nft_count: 10000,
    floor_price: 10,
    volume_24h: 5000,
    description: 'A collection of unique monkey NFTs on the Aptos blockchain.',
    image_url: '/placeholder.svg?height=100&width=100',
    nfts: [
      { token_id: '1', name: 'Monkey #1', image_url: '/placeholder.svg?height=100&width=100' },
      { token_id: '2', name: 'Monkey #2', image_url: '/placeholder.svg?height=100&width=100' },
      { token_id: '3', name: 'Monkey #3', image_url: '/placeholder.svg?height=100&width=100' },
    ]
  }
}

export default function Component() {
  const [searchTerm, setSearchTerm] = useState('')
  const [collections, setCollections] = useState([])
  const [selectedCollection, setSelectedCollection] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchCollections = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await fetchNFTCollections(searchTerm, currentPage)
        setCollections(data.collections)
        setTotalPages(data.totalPages)
      } catch (err) {
        setError('Failed to fetch collections. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchCollections()
  }, [searchTerm, currentPage])

  const handleCollectionClick = async (collectionName: string) => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchNFTCollectionByName(collectionName)
      setSelectedCollection(data)
    } catch (err) {
      setError('Failed to fetch collection details. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Aptos NFT Explorer</h1>
      
      <div className="mb-8">
        <div className="flex gap-4 mb-4">
          <Input 
            type="text" 
            placeholder="Search NFT collections" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md"
          />
          <Button>
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
        
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        
        {!loading && !error && (
          <Card>
            <CardHeader>
              <CardTitle>NFT Collections</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Creator</TableHead>
                    <TableHead>NFT Count</TableHead>
                    <TableHead>Floor Price</TableHead>
                    <TableHead>24h Volume</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {collections.map((collection: any, index) => (
                    <TableRow key={index} className="cursor-pointer hover:bg-gray-100" onClick={() => handleCollectionClick(collection.name)}>
                      <TableCell>{collection.name}</TableCell>
                      <TableCell>{collection.creator}</TableCell>
                      <TableCell>{collection.nft_count}</TableCell>
                      <TableCell>{collection.floor_price} APT</TableCell>
                      <TableCell>{collection.volume_24h} APT</TableCell>
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
      </div>

      {selectedCollection && (
        <Card>
          <CardHeader>
            <CardTitle>{selectedCollection.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img src={selectedCollection.image_url} alt={selectedCollection.name} className="w-full h-auto rounded-lg mb-4" />
                <p className="text-sm text-gray-600 mb-4">{selectedCollection.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold">Creator</p>
                    <p className="text-sm">{selectedCollection.creator}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">NFT Count</p>
                    <p className="text-sm">{selectedCollection.nft_count}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Floor Price</p>
                    <p className="text-sm">{selectedCollection.floor_price} APT</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">24h Volume</p>
                    <p className="text-sm">{selectedCollection.volume_24h} APT</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">NFTs in Collection</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {selectedCollection.nfts.map((nft: any, index: number) => (
                    <div key={index} className="border rounded-lg p-2">
                      <img src={nft.image_url} alt={nft.name} className="w-full h-auto rounded-lg mb-2" />
                      <p className="text-sm font-semibold">{nft.name}</p>
                      <p className="text-xs text-gray-600">Token ID: {nft.token_id}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}