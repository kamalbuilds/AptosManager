import React, { useState } from "react"
import { TrendingNFTs } from "@/constants/TrendingNFTs"

import NFTSearch from "@/components/nfts/NFTSearch"

const NFTsPage = () => {
  const { current_collections_v2 } = TrendingNFTs
  console.log("current_collections_v2", current_collections_v2)

  return (
    <div>
      <NFTSearch />
      NFT Component
    </div>
  )
}

export default NFTsPage
