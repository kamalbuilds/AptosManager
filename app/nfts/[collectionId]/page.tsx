import React from "react"

import NFTCollection from "@/components/nfts/NFTCollection"

const CollectionIdPage = async ({ params }: { params: any }) => {
  const { collectionId } = params

  return <NFTCollection collectionId={collectionId} />
}

export default CollectionIdPage
