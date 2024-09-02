// query MyQuery {
//     fungible_asset_activities(
//       limit: 10
//       offset: 0
//       where: {owner_address: {_eq: "0x3be173d51e3338e21f131459aeccfdbe4f009227943948daba21702d3c1c27e7"}}
//     ) {
//       amount
//       asset_type
//       block_height
//       owner_address
//       entry_function_id_str
//       event_index
//       gas_fee_payer_address
//       is_frozen
//       is_gas_fee
//       is_transaction_success
//       storage_id
//       storage_refund_amount
//       token_standard
//       transaction_timestamp
//       transaction_version
//       type
//       metadata {
//         asset_type
//         name
//         decimals
//         symbol
//       }
//     }
//   }
