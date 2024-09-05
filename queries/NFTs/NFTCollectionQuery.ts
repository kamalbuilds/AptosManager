export const NFTCollectionQueryBasedOnCollectionID = () => {
  return `query MyQuery {
  current_collections_v2(
    where: {collection_id: {_eq: "0x7ac8cecb76edbbd5da40d719bbb9795fc5744e4098ee0ce1be4bb86c90f42301"}}
  ) {
    collection_id
    collection_name
    collection_properties
    creator_address
    current_supply
    description
    max_supply
    total_minted_v2
  }
}`
}

export const getNFTCollectionInfoBasedOnCollectionID = () => {
  return `query MyQuery {
  current_collections_v2_by_pk(
    collection_id: "0x7ac8cecb76edbbd5da40d719bbb9795fc5744e4098ee0ce1be4bb86c90f42301"
  ) {
    collection_id
    collection_name
    collection_properties
    creator_address
    current_supply
    description
    max_supply
    uri
  }
  current_token_datas_v2(
    limit: 15
    offset: 0
    where: {collection_id: {_eq: "0x7ac8cecb76edbbd5da40d719bbb9795fc5744e4098ee0ce1be4bb86c90f42301"}}
  ) {
    token_name
    token_data_id
    token_uri
    current_token_ownerships {
      owner_address
      amount
    }
  }
}
`
}
