import React, { useContext } from 'react';
import { Button } from '../ui/button';
import { GlobalContext } from '@/context/GlobalContext';
import { BarChart, Wallet, Coins, Image, ArrowUpDown, PieChart, TrendingUp, Activity } from 'lucide-react'

const SidebarComponent = () => {

    const { activeTab, setActiveTab } = useContext(GlobalContext);
    return (
        <div className="w-64 bg-white shadow-md">
            <div className="p-4">
                <h2 className="mb-4 text-xl font-bold">Aptos Explorer</h2>
                <nav>
                    <Button
                        variant={activeTab === 'overview' ? "default" : "ghost"}
                        className="mb-2 w-full justify-start"
                        onClick={() => setActiveTab('overview')}
                    >
                        <BarChart className="mr-2 size-4" />
                        Overview
                    </Button>
                    <Button
                        variant={activeTab === 'portfolio' ? "default" : "ghost"}
                        className="mb-2 w-full justify-start"
                        onClick={() => setActiveTab('portfolio')}
                    >
                        <PieChart className="mr-2 size-4" />
                        Portfolio
                    </Button>
                    <Button
                        variant={activeTab === 'coins' ? "default" : "ghost"}
                        className="mb-2 w-full justify-start"
                        onClick={() => setActiveTab('coins')}
                    >
                        <Coins className="mr-2 size-4" />
                        Coins
                    </Button>
                    <Button
                        variant={activeTab === 'nfts' ? "default" : "ghost"}
                        className="mb-2 w-full justify-start"
                        onClick={() => setActiveTab('nfts')}
                    >
                        <Image className="mr-2 size-4" alt='NFTs' />
                        NFTs
                    </Button>
                    <Button
                        variant={activeTab === 'transfers' ? "default" : "ghost"}
                        className="mb-2 w-full justify-start"
                        onClick={() => setActiveTab('transfers')}
                    >
                        <ArrowUpDown className="mr-2 size-4" />
                        Transfers
                    </Button>
                    <Button
                        variant={activeTab === 'defi' ? "default" : "ghost"}
                        className="mb-2 w-full justify-start"
                        onClick={() => setActiveTab('defi')}
                    >
                        <TrendingUp className="mr-2 size-4" />
                        DeFi
                    </Button>
                </nav>
            </div>


        </div>
    );
};

export { SidebarComponent };