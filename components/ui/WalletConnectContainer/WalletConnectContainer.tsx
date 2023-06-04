"use client";

import { useAccount, useConnect, useEnsName, useNetwork } from 'wagmi';
import { useEffect, useState } from 'react';
import Button from '../Button/Button';

const WalletConnectContainer = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    const [loading, setLoading] = useState(true);
    const { address, isConnected } = useAccount();
    const { data: ensName } = useEnsName({ address })
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  
    useEffect(() => {
      setLoading(false);
    }, []);

    const renderContent = () => {
      if(isConnected && !loading) {
        return (
          <>
            {children}
          </>
        );
      } else {
        return (
          <div className='flex flex-col gap-5 items-center font-light'>
            <div className='text text-lg'>
              Please connect your wallet in order to create a Deal.
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