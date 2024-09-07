export const fetchTokenDataBySymbol = async (symbol: string) => {
  try {
    console.log("coinName", symbol)

    const res = await fetch("/api/fetchTokenDataBySymbol", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ symbol: symbol }),
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
