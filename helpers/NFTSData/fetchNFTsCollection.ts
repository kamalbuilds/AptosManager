export const getNFTCollectionData = async (page?: number) => {
  try {
    console.log("Page", page)

    const res = await fetch("/api/fetchNFTCollection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page: page }),
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
