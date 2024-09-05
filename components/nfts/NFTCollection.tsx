"use client"

import React, { useEffect, useState } from "react"
import { fetchNFTCollectionByCollectionId } from "@/helpers/NFTSData/fetchNFTCollectionByCollectionId"

import NFTCollectionData from "./components/NFTCollectionData"
import NFTCollectionList from "./components/NFTCollectionList"

const NFTCollection = ({ collectionId }: { collectionId: string }) => {
  console.log("NFTCollectionById", collectionId)

  const [isLoading, setIsLoading] = useState(true)
  const [collectionDetails, setCollectionDetail] = useState([])
  const [collectionList, setCollectionList] = useState([])

  const handleFetchCollectionDataById = async (collectionId: string) => {
    try {
      setIsLoading(true)
      const res = await fetchNFTCollectionByCollectionId(collectionId)
      console.log("Res", res)
      if (res) {
        setIsLoading(false)
        const { current_collections_v2_by_pk, current_token_datas_v2 } = res
        setCollectionDetail(current_collections_v2_by_pk)
        setCollectionList(current_token_datas_v2)
      }
    } catch (error) {
      setIsLoading(false)
      console.log("Error", error)
    }
  }

  useEffect(() => {
    if (collectionId) {
      handleFetchCollectionDataById(collectionId)
    }
  }, [collectionId])

  console.log("isloading", isLoading)

  return (
    <div className="w-full px-12 py-4">
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <>
          <NFTCollectionData collectionDetails={collectionDetails} />
          <NFTCollectionList collectionList={collectionList} />
        </>
      )}
    </div>
  )
}

export default NFTCollection
