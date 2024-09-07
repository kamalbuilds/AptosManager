'use client'

import { useState } from 'react'
import { PlusIcon, TrashIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function AggPortfolio() {
  const [addresses, setAddresses] = useState<string[]>([''])

  const addAddress = () => {
    setAddresses([...addresses, ''])
  }

  const removeAddress = (index: number) => {
    const newAddresses = addresses.filter((_, i) => i !== index)
    setAddresses(newAddresses)
  }

  const handleAddressChange = (index: number, value: string) => {
    const newAddresses = [...addresses]
    newAddresses[index] = value
    setAddresses(newAddresses)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted addresses:', addresses)
    
  }

  return (
    <div className="flex items-center justify-center self-center p-4 mx-auto">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-bold text-center">Aptos Addresses</CardTitle>
            <CardDescription className="text-center">Enter multiple Aptos addresses below</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {addresses.map((address, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    type="text"
                    value={address}
                    onChange={(e) => handleAddressChange(index, e.target.value)}
                    placeholder={`Aptos Address ${index + 1}`}
                    className="flex-grow"
                    aria-label={`Aptos Address ${index + 1}`}
                  />
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeAddress(index)}
                      aria-label={`Remove Address ${index + 1}`}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <div className="flex justify-between pt-2">
                <Button type="button" onClick={addAddress} variant="outline">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Address
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}