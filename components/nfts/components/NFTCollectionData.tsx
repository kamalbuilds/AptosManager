import React from "react"

import { shortenAddress } from "@/lib/shortenAddress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const NFTCollectionData = ({
  collectionDetails,
}: {
  collectionDetails: any
}) => {
  console.log("collectionDetails", collectionDetails)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{collectionDetails.collection_name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="">
          <div>
            <p className="mb-4 text-sm text-gray-600">
              {collectionDetails.description}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold">Creator</p>
                <p className="text-sm">
                  {shortenAddress(collectionDetails?.creator_address, 10)}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold">Max Supply</p>
                <p className="text-sm">
                  {collectionDetails.max_supply.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold">Floor Price</p>
                <p className="text-sm">10 APT</p>
              </div>
              <div>
                <p className="text-sm font-semibold">24h Volume</p>
                <p className="text-sm">100 APT</p>
              </div>
            </div>
          </div>
          {/* <div>
              <h3 className="mb-4 text-xl font-semibold">NFTs in Collection</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {selectedCollection.nfts.map((nft: any, index: number) => (
                  <div key={index} className="rounded-lg border p-2">
                    <img
                      src={nft.image_url}
                      alt={nft.name}
                      className="mb-2 h-auto w-full rounded-lg"
                    />
                    <p className="text-sm font-semibold">{nft.name}</p>
                    <p className="text-xs text-gray-600">
                      Token ID: {nft.token_id}
                    </p>
                  </div>
                ))}
              </div>
            </div> */}
        </div>
      </CardContent>
    </Card>
  )
}

export default NFTCollectionData
