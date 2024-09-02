export const coinBalanceByAccountQuery = (accountAddress: string) => {
  console.log("Account address: " + accountAddress)

  return `
  query MyQuery {
    current_fungible_asset_balances(
    offset: 0
    where: {
      owner_address: {
        _eq: "${accountAddress}"
      }
    }
    ) {
        owner_address
        amount
        asset_type
        storage_id
        is_frozen
        token_standard
        metadata {
          asset_type
          creator_address
          decimals
          name
          symbol
          token_standard
          maximum_v2
          supply_v2
        }
      }
    }`
}
