"use client";

import { useAccount, useConnect } from 'wagmi';
import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import useIsMobile from '../../../hooks/useIsMobile';

const WalletConnectContainer = ({
    children,
    message,
  }: {
    children: React.ReactNode;
    message: string
  }) => {
    const [loading, setLoading] = useState(true);
    const { isConnected } = useAccount();
    const { connect, connectors, error } = useConnect();
    const errorObj:any =  error;
    const { isMobile } = useIsMobile();

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
            <div className='flex gap-5 flex-col items-center'>
              <div className='flex gap-5 flex-col'>
                {
                  connectors.map((connector) => {
                    if(connector.id === 'metaMask' && isMobile) return null;
                    return (
                      <Button
                        key={connector.id}
                        onClick={() => connect({ connector })}
                        label={connector.name}
                      />
                    )})
                }
              </div>
              {error && <div>{errorObj.shortMessage || error.message}</div>}
            </div>
          </div>
        )
      }
    }
  
    return renderContent();
}

export default WalletConnectContainer;