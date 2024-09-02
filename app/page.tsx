"use client";

import { useState, useContext } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarComponent } from '@/components/sidebar';
import { GlobalContext } from '@/context/GlobalContext';
import { Overview } from '@/components/overview';
import { Portfolio } from '@/components/portfolio';
import { CoinsComponent } from '@/components/coins';
import { NFTsComponent } from '@/components/nfts';
import { TransferComponent } from '@/components/transfers';
import { DefiComponent } from '@/components/defi';

export default function Component() {
  const [address, setAddress] = useState('')

  const { activeTab, setActiveTab } = useContext(GlobalContext);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/fetchTokenActivities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await res.json();

      if (json.errors) {
        console.log("Errors in fetcing token activities", json.errors);

      } else {
        console.log("Successfull fetching", json);

      }
    } catch (error) {
      console.log("Error", error);

    } finally {
      console.log("Success");

    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SidebarComponent />

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        <header className="mb-8">
          <h1 className="mb-4 text-3xl font-bold">Aptos Explorer</h1>
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder="Enter Aptos address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-96"
            />
            <Button>Explore</Button>
          </div>
        </header>

        {activeTab === 'overview' && <Overview />}
        {activeTab === 'portfolio' && <Portfolio />}
        {activeTab === 'coins' && <CoinsComponent />}
        {activeTab === 'nfts' && <NFTsComponent />}
        {activeTab === 'transfers' && <TransferComponent />}
        {activeTab === 'defi' && <DefiComponent />}

      </div>
    </div>
  )
}