import WalletProvider from "../../components/providers/WalletProvider/WalletProvider";
import WalletConnectContainer from "../../components/ui/WalletConnectContainer/WalletConnectContainer";

const ProfileLayout = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    return (
      <WalletProvider>
          <WalletConnectContainer message='Connect your wallet to see your Deals.'>
              {children}
          </WalletConnectContainer>
      </WalletProvider>
    );
}

export default ProfileLayout;