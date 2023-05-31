"use client";

import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';


const WalletConnectContainer = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    const [connection, setConnection] = useState(false)
    const [loading, setLoading] = useState(true);
    useAccount({
      onConnect() {
        setConnection(true);
      },
      onDisconnect() {
        setConnection(false);
      },
    });

    useEffect(() => {
      setLoading(false);
    }, []);

    const renderContent = () => {
      if(connection && !loading) {
        return (
          <>
            <div className='flex justify-end mb-10'>
              <ConnectButton />
            </div>
            {children}
          </>
        );
      } else {
        return (
          <div className='flex flex-col gap-5 items-center font-light'>
            <div className='text text-lg'>
              Please connect your wallet in order to create a Deal.
            </div>
           <ConnectButton />
          </div>
        )
      }
    }
  
    return (
          <>
            {renderContent()}
          </>
    );
}

export default WalletConnectContainer;