"use client";

import { useAccount, useNetwork } from 'wagmi';
import { useEffect, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { createPublicClient, createWalletClient, http } from 'viem';
import { ClientContext } from './ClientContext';

const WalletConnectContainer = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [walletClient, setWalletClient] = useState(null);
    const [publicClient, setPublicClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const { chain } = useNetwork();
  
    const { address } = useAccount({
      onConnect({address}) {
        setIsConnected(true);
        setWalletClient(createWalletClient({ 
          account: address, 
          chain,
          transport: http()
        }));

        setPublicClient(createPublicClient({
          chain,
          transport: http(),
        }));
      },
      onDisconnect() {
        setIsConnected(false);
      },
    });

    useEffect(() => {
      setLoading(false);
      console.log(address)
      if(isConnected && chain) {
        setWalletClient(createWalletClient({ 
          account: address, 
          chain,
          transport: http()
        }));
        setPublicClient(createPublicClient({
          chain,
          transport: http(),
        }));
      }
    }, [chain, address]);

    const renderContent = () => {
      if(isConnected && !loading) {
        return (
          <>
            <div className='flex justify-end mb-10'>
              <ConnectButton showBalance={false}  chainStatus="none" />
            </div>
            <ClientContext.Provider value={{walletClient, publicClient}}>
              {children}
            </ClientContext.Provider>
          </>
        );
      } else {
        return (
          <div className='flex flex-col gap-5 items-center font-light'>
            <div className='text text-lg'>
              Please connect your wallet in order to create a Deal.
            </div>
           <ConnectButton showBalance={false} />
          </div>
        )
      }
    }
  
    return renderContent();
}

export default WalletConnectContainer;