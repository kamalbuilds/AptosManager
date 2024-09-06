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
                <p className="text-sm font-semibold">Curr Supply</p>
                <p className="text-sm">
                  {collectionDetails.current_supply.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold">Floor Price</p>
                <p className="text-sm">NAN APT</p>
              </div>
              <div>
                <p className="text-sm font-semibold">24h Volume</p>
                <p className="text-sm">NAN APT</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default NFTCollectionData
