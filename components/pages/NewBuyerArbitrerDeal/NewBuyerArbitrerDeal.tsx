import WalletProvider from "../../providers/WalletProvider/WalletProvider";
import WalletConnectContainer from "../../ui/WalletConnectContainer/WalletConnectContainer";
import NewBuyerArbitrerDealForm from "./NewBuyerArbitrerDealForm";

const NewBuyerArbitrerDeal = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 min-w-full">
        <div>
            <div className="text-4xl font-bold">The Arbitrer Deal</div>
            <span className="text-blue-600 text-lg font-semibold">as Buyer</span>
            <div className="text-lg font-light mt-2 text-gray-600">Choose an arbitrer you trust to approve your deal.</div>
            <div className="text-base mt-4 text-gray-900 rounded">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit dolore quo vel, saepe eum soluta, vero rerum aliquam veritatis libero nihil quae reprehenderit, aliquid architecto perspiciatis nam ex dolor provident?</div>
        </div>
        <div className="border border-gray-300 rounded p-5 h-fit">
            <WalletProvider>
                <WalletConnectContainer message='Please connect your wallet in order to create a Deal.'>
                    <NewBuyerArbitrerDealForm />
                </WalletConnectContainer>
            </WalletProvider>
        </div>
    </div>
);

export default NewBuyerArbitrerDeal;