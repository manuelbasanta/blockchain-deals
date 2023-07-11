import WagmiContainer from './WagmiContainer';

const WalletProvider = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    return (
        <WagmiContainer
          sepoliaKey={process.env.ALCHEMY_SEPOLIA_ID}
          mainnetKey={process.env.ALCHEMY_MAINNET_ID}
          mumbaiKey={process.env.ALCHEMY_MUMBAI_ID}
          projectId={process.env.WALLET_CONNECT_ID}
        >
            {children}
        </WagmiContainer>
    );
  }

export default WalletProvider;
