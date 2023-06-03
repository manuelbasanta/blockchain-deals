"use client";

import WalletConnectContainer from '../../components/ui/WalletConnectContainer/WalletConnectContainer';
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { hardhat, mainnet, sepolia } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public';

const NewDealLayout = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {

    const { chains, publicClient } = configureChains(
      [mainnet, sepolia, hardhat],
      [
        publicProvider()
      ]
    );
    
    const { connectors } = getDefaultWallets({
      appName: 'Blockchain Deals',
      projectId: process.env.walletConnectId,
      chains
    });
    
    const wagmiConfig = createConfig({
      autoConnect: true,
      connectors,
      publicClient
    })
    
    return (
      <>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <WalletConnectContainer>
              {children}
            </WalletConnectContainer>
          </RainbowKitProvider>
        </WagmiConfig>
      </>
    );
  }

export default NewDealLayout;