"use client";

import WalletConnectContainer from '../../components/ui/WalletConnectContainer/WalletConnectContainer';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { hardhat, mainnet, sepolia } from 'wagmi/chains'
import { alchemyProvider } from '@wagmi/core/providers/alchemy';
import { publicProvider } from '@wagmi/core/providers/public';

const NewDealLayout = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {

    const { chains, publicClient, webSocketPublicClient } = configureChains(
      [mainnet, sepolia, hardhat],
      [
        alchemyProvider({ apiKey: process.env.alchemySepoliaId }),
        alchemyProvider({ apiKey: process.env.alchemyMainnetId }),
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
      <>
        <WagmiConfig config={wagmiConfig}>
          <WalletConnectContainer>
            {children}
          </WalletConnectContainer>
        </WagmiConfig>
      </>
    );
  }

export default NewDealLayout;
