"use client";

import { useAccount, useConnect } from 'wagmi';
import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';

const WalletConnectContainer = ({
    children,
    message,
  }: {
    children: React.ReactNode;
    message: string
  }) => {
    const [loading, setLoading] = useState(true);
    const { address, isConnected } = useAccount();
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  
    useEffect(() => {
      setLoading(false);
    }, []);

    const renderContent = () => {
      if(loading) return (
        <div className='h-full w-full flex items-center justify-center'>
          <Loader />
        </div>
      )
      if(isConnected && !loading) {
        return (
          <>
            {children}
          </>
        );
      } else {
        return (
          <div className='flex flex-col gap-5 items-center font-bold'>
            <div className="mt-4 text-red-600 rounded">
              {message}
            </div>
            <div className='flex gap-5'>
              {connectors.map((connector) => (
                <Button
                  key={connector.id}
                  onClick={() => connect({ connector })}
                  label={connector.name}
                />
              ))}
        
              {error && <div>{error.message}</div>}
            </div>
          </div>
        )
      }
    }
  
    return renderContent();
}

export default WalletConnectContainer;