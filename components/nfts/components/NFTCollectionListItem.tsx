import React, { useEffect, useState } from "react"
import Image from "next/image"

import { shortenAddress } from "@/lib/shortenAddress"
import { TableCell, TableRow } from "@/components/ui/table"

const NFTCollectionListItem = ({ collection }: { collection: any }) => {
  const tokenURI = {
    name: "AptosMonkeys #1009",
    description:
      "Aptos monkeys are a cute collection of Monkes residing on Aptos making a unique jungle of their own",
    external_url:
      "https://ipfs.io/ipfs/bafybeig6bepf5ci5fyysxlfefpjzwkfp7sarj6ed2f5a34kowgc6qenjfa/1009.png",
    attributes: [
      {
        trait_type: "Background",
        value: "Green Fade",
      },
      {
        trait_type: "Clothing",
        value: "Diving Suit",
      },
      {
        trait_type: "Eyes",
        value: "Steampunk",
      },
      {
        trait_type: "Headwear",
        value: "Blue Shorts",
      },
      {
        trait_type: "Mouth",
        value: "Bubble",
      },
      {
        trait_type: "Skin",
        value: "Gold",
      },
      {
        trait_type: "Extra",
        value: "Empty",
      },
    ],
    image:
      "https://ipfs.io/ipfs/bafybeig6bepf5ci5fyysxlfefpjzwkfp7sarj6ed2f5a34kowgc6qenjfa/1009.png",
  }

  // const [tokenURIDetails, setTokenURIDetails] = useState("")
  // useEffect(() => {
  //   if (collection?.token_uri) {
  //     ;(async () => {
  //       const res = await fetch(collection?.token_uri)
  //       const response = await res.json()
  //       console.log("response", response)
  //       if (response.image) {
  //         setTokenURIDetails(response.image)
  //       }
  //     })()
  //   }
  // }, [collection])

  const owner = collection.current_token_ownerships.find(
    (item: any) => item.amount === 1
  )

  const tokenId =
    collection.token_data_id.slice(0, 5) +
    "..." +
    collection.token_data_id.slice(-5)

  return (
    <TableRow>
      <TableCell>
        <Image
          src={tokenURI.image}
          width={40}
          height={40}
          alt={tokenURI.name}
        />
      </TableCell>
      <TableCell>{tokenId}</TableCell>
      <TableCell>{collection.token_name}</TableCell>
      <TableCell>{shortenAddress(owner?.owner_address, 5)}</TableCell>
    </TableRow>
  )
}

export default NFTCollectionListItem
