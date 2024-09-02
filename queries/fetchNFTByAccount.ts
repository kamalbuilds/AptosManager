export const fetchNFTByAccountQuery = (accountAddress: string) => {
  return `
   query MyQuery {
  current_token_ownerships_v2(
    offset: 0
    where: {owner_address: {_eq: "${accountAddress}"}}
  ) {
    amount
    is_fungible_v2
    is_soulbound_v2
    last_transaction_timestamp
    non_transferrable_by_owner
    last_transaction_version
    owner_address
    property_version_v1
    storage_id
    table_type_v1
    token_data_id
    token_properties_mutated_v1
    token_standard
    current_token_data {
      collection_id
      token_name
      current_collection {
        creator_address
        collection_name
        description
        current_supply
        uri
      }
    }
  }
}`
}
