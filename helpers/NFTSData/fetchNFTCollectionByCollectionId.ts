export const fetchNFTCollectionByCollectionId = async (
  collectionId: string
) => {
  try {
    const res = await fetch("/api/fetchNFTCollectionById", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ collection_id: collectionId }),
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
