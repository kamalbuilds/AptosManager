import React from "react"

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import NFTCollectionListItem from "./NFTCollectionListItem"

const NFTCollectionList = ({ collectionList }: { collectionList: any }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Logo</TableHead>
          <TableHead>TokenId</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Owner</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {collectionList.map((collection: any, index: any) => {
          return <NFTCollectionListItem collection={collection} key={index} />
        })}
      </TableBody>
    </Table>
  )
}

export default NFTCollectionList
