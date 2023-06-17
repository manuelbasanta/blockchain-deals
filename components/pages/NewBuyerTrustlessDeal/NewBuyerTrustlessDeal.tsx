import WalletProvider from "../../providers/WalletProvider/WalletProvider";
import WalletConnectContainer from "../../ui/WalletConnectContainer/WalletConnectContainer";
import NewBuyerTrustlessDealForm from "./NewBuyerTrustlessDealForm";

const NewBuyerTrustlessDeal = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 min-w-full">
        <div>
            <div className="text-4xl font-bold">The Trustless Deal</div>
            <div className="text-lg font-light mt-2 text-gray-600">Make a Deal that needs no trust, just a double deposit.</div>
            <div className="text-base mt-4 text-gray-900 rounded">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit dolore quo vel, saepe eum soluta, vero rerum aliquam veritatis libero nihil quae reprehenderit, aliquid architecto perspiciatis nam ex dolor provident?</div>
        </div>
        <div className="border border-gray-300 rounded p-5">
            <WalletProvider>
                <WalletConnectContainer message='Please connect your wallet in order to create a Deal.'>
                    <NewBuyerTrustlessDealForm />
                </WalletConnectContainer>
            </WalletProvider>
        </div>
    </div>
)

export default NewBuyerTrustlessDeal;
