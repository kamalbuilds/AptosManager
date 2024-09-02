// query MyQuery {
//     token_activities_v2(
//       limit: 5
//       offset: 0
//       where: {event_account_address: {_eq: "0x274c398a921b8e2ba345feac3039e1c8b196a7eb1395cdd3584af3a85eb9ec50"}}
//       order_by: {transaction_version: desc, event_index: desc}
//     ) {
//       transaction_version
//       type
//       transaction_timestamp
//       token_standard
//       token_data_id
//       token_amount
//       to_address
//       from_address
//       event_index
//       event_account_address
//       entry_function_id_str
//       current_token_data {
//         collection_id
//         token_data_id
//           token_name
//          token_uri
//         current_collection {
//           collection_name

//         }
//       }
//     }
//   }
