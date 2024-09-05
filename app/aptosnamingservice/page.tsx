"use client";
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk'
import { useToast } from '@/hooks/use-toast'
import { useWallet } from '@aptos-labs/wallet-adapter-react'

type Policy = 'domain' | 'subdomain:follow-domain' | 'subdomain:independent';

export default function Component() {
  const [loading, setLoading] = useState(false);

  const { signAndSubmitTransaction , account , connected } = useWallet();
  const { toast } = useToast();

  console.log("account", account, connected)

  const config = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(config);

  const handleRegisterName = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string
    const policy = formData.get('policy') as Policy
    try {
      const result = await RegisterName(name, policy)
      toast({ title: "Success", description: result.message })
    } catch (error) {
      toast({ title: "Error", description: "Failed to register name", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleRenewDomain = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string
    try {
      const result = await mockRenewDomain(name)
      toast({ title: "Success", description: result.message })
    } catch (error) {
      toast({ title: "Error", description: "Failed to renew domain", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleSetPrimaryName = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string
    try {
      const result = await mockSetPrimaryName(name)
      toast({ title: "Success", description: result.message })
    } catch (error) {
      toast({ title: "Error", description: "Failed to set primary name", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleSetTargetAddress = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string
    const address = formData.get('address') as string
    try {
      const result = await mockSetTargetAddress(name, address)
      toast({ title: "Success", description: result.message })
    } catch (error) {
      toast({ title: "Error", description: "Failed to set target address", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

// @kamal make this work , the sender is having type conflicts , we have the wallet adapter but
//  how to sign and send with it?
const RegisterName = async (name: string, policy: any) => {
    console.log("i m here")
    const txn = await aptos.registerName({
        sender: account?.address!,
        name: name,
        expiration: {
            policy,

        },
    });

    console.log("txn", txn)

    const pendingtxn = await aptos.signAndSubmitTransaction({
        signer: account?.address!,
        data: txn,
    });


    console.log("txn", pendingtxn)
  return { success: true, message: `Registered ${name} with policy ${policy}` }
}

const mockRenewDomain = async (name: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return { success: true, message: `Renewed ${name} for one year` }
}

const mockSetPrimaryName = async (name: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return { success: true, message: `Set ${name} as primary name` }
}

const mockSetTargetAddress = async (name: string, address: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return { success: true, message: `Set target address for ${name} to ${address}` }
}

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Aptos Name Service Operations</h1>
      
      <Tabs defaultValue="register">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="register">Register Name</TabsTrigger>
          <TabsTrigger value="renew">Renew Domain</TabsTrigger>
          <TabsTrigger value="primary">Set Primary Name</TabsTrigger>
          <TabsTrigger value="target">Set Target Address</TabsTrigger>
        </TabsList>
        
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Register a New Name</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegisterName} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Name</Label>
                  <Input id="register-name" name="name" placeholder="Enter name (e.g., example.apt)" required />
                </div>
                <div className="space-y-2">
                  <Label>Expiration Policy</Label>
                  <RadioGroup defaultValue="domain" name="policy" className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="domain" id="domain" />
                      <Label htmlFor="domain">Domain</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="subdomain:follow-domain" id="follow-domain" />
                      <Label htmlFor="follow-domain">Subdomain: Follow Domain</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="subdomain:independent" id="independent" />
                      <Label htmlFor="independent">Subdomain: Independent</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? "Registering..." : "Register Name"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="renew">
          <Card>
            <CardHeader>
              <CardTitle>Renew Domain</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRenewDomain} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="renew-name">Domain Name</Label>
                  <Input id="renew-name" name="name" placeholder="Enter domain name to renew" required />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? "Renewing..." : "Renew Domain"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="primary">
          <Card>
            <CardHeader>
              <CardTitle>Set Primary Name</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSetPrimaryName} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="primary-name">Name</Label>
                  <Input id="primary-name" name="name" placeholder="Enter name to set as primary" required />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? "Setting..." : "Set Primary Name"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="target">
          <Card>
            <CardHeader>
              <CardTitle>Set Target Address</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSetTargetAddress} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="target-name">Name</Label>
                  <Input id="target-name" name="name" placeholder="Enter name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target-address">Target Address</Label>
                  <Input id="target-address" name="address" placeholder="Enter target address" required />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? "Setting..." : "Set Target Address"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}