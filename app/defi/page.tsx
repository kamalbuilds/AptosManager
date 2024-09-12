import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DefiComponent } from '@/components/defi'

// This would typically come from an API or database
const protocols = [
  { id: 1, name: 'Aave', borrowed: 1000, lended: 2000, healthFactor: 1.5, tvl: 5000000 },
  { id: 2, name: 'Compound', borrowed: 500, lended: 1500, healthFactor: 2.0, tvl: 3000000 },
  { id: 3, name: 'MakerDAO', borrowed: 2000, lended: 3000, healthFactor: 1.8, tvl: 8000000 },
]

// This would also come from an API or database
const delegatedPools = [
  { id: 1, name: 'Ethereum Staking Pool', amount: 5000 },
  { id: 2, name: 'USDC Lending Pool', amount: 10000 },
]

export default function DeFiDashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">DeFi Dashboard</h1>

      <DefiComponent    />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Delegated Pools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {delegatedPools.map((pool) => (
            <Card key={pool.id}>
              <CardHeader>
                <CardTitle>{pool.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">Amount: ${pool.amount.toLocaleString()}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">DeFi Protocols</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {protocols.map((protocol) => (
            <Card key={protocol.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{protocol.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-2">
                  <p><span className="font-medium">Borrowed:</span> ${protocol.borrowed.toLocaleString()}</p>
                  <p><span className="font-medium">Lended:</span> ${protocol.lended.toLocaleString()}</p>
                  <p><span className="font-medium">Health Factor:</span> {protocol.healthFactor.toFixed(2)}</p>
                  <p><span className="font-medium">TVL:</span> ${protocol.tvl.toLocaleString()}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/defi/${protocol.id}`} passHref>
                  <Button className="w-full">Checkout</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}