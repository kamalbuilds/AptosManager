export const fetchTokensDataByName = async (coinName: string) => {
  try {
    console.log("coinName", coinName)

    const res = await fetch("/api/fetchTokenDataByName", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ coinName: coinName }),
    })
    const response = await res.json()

    if (response.errors) {
      console.log("Errors in fetcing token details", response.errors)
      return null
    } else {
      console.log("Token Details >>", response)
      return response.data
    }
  } catch (error) {
    console.log("Error", error)
    return null
  }
}
