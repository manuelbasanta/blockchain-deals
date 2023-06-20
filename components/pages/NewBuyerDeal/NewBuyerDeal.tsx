import WalletProvider from "../../providers/WalletProvider/WalletProvider";
import NumberedList from "../../ui/NumberedList/NumberedList";
import WalletConnectContainer from "../../ui/WalletConnectContainer/WalletConnectContainer";
import NewBuyerDealForm from "./NewBuyerDealForm";

const NewBuyerDeal = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 min-w-full">
        <div>
            <div className="text-4xl font-bold">The Trustless Deal</div>
            <span className="text-blue-600 text-lg font-semibold">as Buyer</span>
            <div className="text-lg font-light mt-2 text-gray-600">Make a Deal that needs no trust, just a double deposit.</div>
            <div className="text-base mt-4 text-gray-900 rounded">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit dolore quo vel, saepe eum soluta, vero rerum aliquam veritatis libero nihil quae reprehenderit, aliquid architecto perspiciatis nam ex dolor provident?</div>
            <NumberedList items={[
                'Create the Deal with this form and send it to the seller. You need to put the value of the goods or services the seller will provide and a deposit.',
                'The seller confirms the Deal by making his or her deposit.',
                'You receive the goods/service from the seller and complete the Deal.',
                'You get your deposit back and the seller gets the value + the deposit.'
            ]}/>
        </div>
        <div className="border border-gray-300 rounded p-5 h-fit">
            <WalletProvider>
                <WalletConnectContainer message='Please connect your wallet in order to create a Deal.'>
                    <NewBuyerDealForm />
                </WalletConnectContainer>
            </WalletProvider>
        </div>
    </div>
)

export default NewBuyerDeal;
