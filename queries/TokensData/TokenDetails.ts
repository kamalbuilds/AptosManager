export const getTokenDetailsQuery = (coinType: string) => {
  return `
    query MyQuery {
  coin_activities(
    where: {coin_type: {_eq: "${coinType}"}}
    limit: 20
    order_by: {transaction_timestamp: desc}
  ) {
    activity_type
    amount
    coin_type
    transaction_version
    transaction_timestamp
    owner_address
    is_transaction_success
  }
}

    `
}
