
export async function POST(req) {
    const operationsDoc = `
      query MyQuery {
        token_activities_v2(
          limit: 5
          offset: 0
          where: {
            event_account_address: {
              _eq: "0x274c398a921b8e2ba345feac3039e1c8b196a7eb1395cdd3584af3a85eb9ec50"
            }
          }
          order_by: { transaction_version: desc, event_index: desc }
        ) {
          transaction_version
          type
          transaction_timestamp
          token_standard
          token_data_id
          token_amount
          to_address
          from_address
          event_index
          event_account_address
          entry_function_id_str
          before_value
          is_fungible_v2
          property_version_v1
          after_value
          current_token_data {
            collection_id
            decimals
            description
            is_deleted_v2
            is_fungible_v2
            largest_property_version_v1
            last_transaction_version
            token_data_id
            token_name
            token_standard
            token_uri
            token_properties
            supply
            maximum
            last_transaction_timestamp
          }
        }
      }
    `;

    try {
        const response = await fetch('https://aptos-mainnet.nodit.io/~lblOF6iP-mDXUBAN1dji0xdnLTQ0Z0K/v1/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: operationsDoc,
                variables: {},
                operationName: "MyQuery",
            }),
        });

        const result = await response.json();

        if (result.errors) {
            return new Response(JSON.stringify({ errors: result.errors }), { status: 400 });
        }

        return new Response(JSON.stringify({ data: result.data }), { status: 200 });
    } catch (error) {
        console.error('Fetch error:', error);
        return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
    }
}
