export const getNFTCollectionDataByCollectionNameQuery = (
  collectionName: string
) => {
  return `
    query MyQuery {
    current_collections_v2(where: {collection_name: {_regex: "${collectionName}"}}) {
      collection_id
      collection_name
      collection_properties
      creator_address
      current_supply
      description
      max_supply
      total_minted_v2
    }
  }
    `
}
