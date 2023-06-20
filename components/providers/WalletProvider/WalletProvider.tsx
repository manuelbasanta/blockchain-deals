import WagmiContainer from './WagmiContainer';

const WalletProvider = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    return (
        <WagmiContainer sepoliaKey={process.env.ALCHEMY_SEPOLIA_ID} mainnetKey={process.env.ALCHEMY_MAINNET_ID}>
            {children}
        </WagmiContainer>
    );
  }

export default WalletProvider;
