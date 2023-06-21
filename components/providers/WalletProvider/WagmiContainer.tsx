"use client";

import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygonMumbai, sepolia } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from '@wagmi/core/providers/public';
import { PublicClientContext } from './PublicClientContext';

const WagmiContainer =  ({
    sepoliaKey,
    mainnetKey,
    mumbaiKey,
    children,
  }: {
    sepoliaKey: string,
    mainnetKey: string,
    mumbaiKey: string,
    children: React.ReactNode;
  }) => {
    const { chains, publicClient, webSocketPublicClient } = configureChains(
        [mainnet, sepolia, polygonMumbai],
        [
          alchemyProvider({ apiKey: sepoliaKey }),
          alchemyProvider({ apiKey: mainnetKey }),
          alchemyProvider({ apiKey: mumbaiKey }),
          publicProvider()
        ],
      );
    
    const wagmiConfig = createConfig({
      autoConnect: true,
      connectors: [
        new MetaMaskConnector ({ chains }),
        new CoinbaseWalletConnector({
          chains,
          options: {
            appName: 'wagmi',
          },
        }),
      ],
      publicClient,
      webSocketPublicClient,
    })

    return (
        <WagmiConfig config={wagmiConfig}>
            <PublicClientContext.Provider value={publicClient}>
              {children}
            </PublicClientContext.Provider>
        </WagmiConfig>
    );
  }

export default WagmiContainer;
