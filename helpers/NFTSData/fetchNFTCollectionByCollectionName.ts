export const fetchNFTCollectionByCollectionName = async (
  collectionName: string
) => {
  try {
    const res = await fetch("/api/fetchNFTCollectionByCollectionName", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ collectionName: collectionName }),
    })
    const response = await res.json()

    if (response.errors) {
      console.log("Errors in fetcing token activities", response.errors)
      return null
    } else {
      console.log("NFT Collection >>", response)
      return response.data
    }
  } catch (error) {
    console.log("Error", error)
    return null
  }
}
