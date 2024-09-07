export const fetchTokenDetails = async (coinType: string) => {
  try {
    console.log("coinType", coinType)

    const res = await fetch("/api/fetchTokenDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ coinType: coinType }),
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
