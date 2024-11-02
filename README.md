# AptosManager - Powered by Nodit

AptosManager is a comprehensive portfolio management and DeFi analytics platform for the Aptos blockchain. It serves as a one-stop solution for managing multiple wallets, tracking assets, and monitoring DeFi positions across various protocols.

## Features

### 1. Multi-Wallet Management
- Aggregate and track multiple Aptos wallets in one interface
- View combined portfolio value across all connected wallets
- Real-time balance updates and transaction monitoring

### 2. Asset Tracking
- **Tokens**
  - View all fungible tokens across wallets
  - Track token balances and values in real-time
  - Search tokens by name or symbol
  - Detailed token information including decimals and contract addresses

- **NFTs**
  - Complete NFT portfolio visualization
  - Collection-wise NFT grouping
  - NFT metadata and ownership history
  - Floor price tracking
  - Transfer history and activity logs

### 3. DeFi Protocol Integration

Currently supported protocols:
- Aries Markets
- Amnis Finance
- Thala
- TruStake
- Ecleron Market

Features include:

- Position monitoring
- Liquidity pool tracking
- Lending/Borrowing status
- Health factor monitoring
- Yield tracking
- Cross-protocol analytics


### 4. Aptos Name Service (ANS)
- Register and manage Aptos domain names
- Set primary names for wallets
- Configure domain settings
- Manage subdomains
- Track domain expiration

I'll help you add a section about Nodit Integration to the README. Based on the codebase, I can see that Nodit is used for GraphQL queries and data fetching. Here's the additional section to add to the README:

```markdown
## Nodit Integration

AptosManager leverages Nodit's powerful GraphQL API for efficient blockchain data querying and management. The integration provides:

### GraphQL Endpoints
- Mainnet: Accessible through custom endpoints for production environment
- Testnet: Dedicated endpoint for testing and development
```typescript:config/url.config.ts
startLine: 1
endLine: 4
```

### Key Features
1. **Account Data Fetching**
   - Token balances and transfers
   - NFT ownership and activities
   - Fungible asset tracking
```typescript:app/api/fetchAccountData/route.ts
startLine: 1
endLine: 41
```

2. **Collection Management**
   - NFT collection details
   - Token metadata
   - Transfer history
```typescript:queries/NFTCollections/NFTCollections.query.ts
startLine: 1
endLine: 66
```

3. **Token Analytics**
   - Real-time price data
   - Token details by name/symbol
   - Historical transaction data

### Benefits
- High-performance GraphQL queries
- Real-time data updates
- Comprehensive blockchain data access
- Scalable infrastructure


## Technical Stack

- **Frontend**: Next.js 13+ with App Router
- **Styling**: TailwindCSS
- **State Management**: React Query
- **Wallet Integration**: 
  - Pontem Wallet
  - Martian Wallet
  - OKX Wallet
  - Bitget Wallet

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/kamalbuilds/AptosManager.git
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

4. Run the development server
```bash
npm run dev
```

## API Integration

The platform integrates with multiple APIs:

1. Aptos Mainnet API for blockchain data
2. Sonar Watch API for DeFi analytics
3. Custom GraphQL endpoints for detailed token and NFT data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Acknowledgments

- Aptos Foundation
- Sonar Watch
- All integrated DeFi protocols

## Roadmap

- [ ] Floor price and 24hr volume tracking
- [ ] Enhanced balance calculations including NFT floor prices
- [ ] Expanded coins page functionality
- [ ] Integration of Eclion Market SDK
- [ ] Additional DeFi protocol integrations

## Support

For support, please open an issue in the GitHub repository or reach out to the maintainers.
```