import WalletConnectContainer from '../../components/ui/WalletConnectContainer/WalletConnectContainer';

export default function NewDealLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    
    return (
        <WalletConnectContainer>
            {children}
        </WalletConnectContainer>
    );
  }