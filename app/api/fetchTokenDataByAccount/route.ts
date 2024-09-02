import { NextRequest, NextResponse } from "next/server"
import { getTokensDataQueryByAccount } from "@/queries/TokensData/TokensDataByAccount.query"

import { BASE_MAINNET_URL } from "@/config/url.config"

export async function POST(req: NextRequest) {
  try {
    const { accountAddress } = await req.json()
    const operationsDoc = getTokensDataQueryByAccount(accountAddress)
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

    /**
     * Gives 2 array of objects
     * 1.current_fungible_asset_balances -> coins that the user has
     * 2.fungible_asset_activities -> activities of the assets/coins
     */

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
