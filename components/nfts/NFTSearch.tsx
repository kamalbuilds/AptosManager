"use client"

import React, { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const NFTSearch = () => {
  const [nftAddress, setNFTAddress] = useState("")
  const searchNFT = () => {
    console.log("searchNFT")
  }

  return (
    <div className="flex gap-4">
      <Input
        type="text"
        placeholder="Enter NFT address"
        value={nftAddress}
        onChange={(e) => setNFTAddress(e.target.value)}
        className="w-96"
      />
      <Button onClick={searchNFT}>Search</Button>
    </div>
  )
}

export default NFTSearch
