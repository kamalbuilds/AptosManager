import { NextRequest, NextResponse } from "next/server"
import {
  getNFTsDataQuery,
  getNFTsDataQueryByCollectionId,
} from "@/queries/NFTsData"

import { BASE_MAINNET_URL } from "@/config/url.config"

export async function POST(req: NextRequest) {
  try {
    const { collection_id } = await req.json()
    const operationsDoc = getNFTsDataQueryByCollectionId(collection_id)
    console.log("OperationDoc", operationsDoc)

    const response = await fetch(BASE_MAINNET_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: {},
        operationName: "MyQuery",
      }),
    })

    const result = await response.json()

    if (result.errors) {
      return NextResponse.json({ errors: result.errors }, { status: 400 })
    }

    return NextResponse.json({ data: result.data }, { status: 200 })
  } catch (error) {
    console.error("Fetch error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
