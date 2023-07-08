import Link from "next/link";
import WalletProvider from "../../providers/WalletProvider/WalletProvider";
import WalletConnectContainer from "../../ui/WalletConnectContainer/WalletConnectContainer";
import NewBuyerDealForm from "./NewBuyerDealForm";

const NewBuyerDeal = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 min-w-full">
        <div>
            <div className="text-4xl font-bold">The Trustless Deal</div>
            <span className="text-blue-600 text-lg font-semibold">as Buyer</span>
            <div className="text-lg font-light mt-2 text-gray-600">Make a Deal that needs no trust, just a double deposit.</div>
            <div className="text-base mt-4 text-gray-900 rounded">Fill out this form to create a new Deal as the buyer, the seller will have to confirm the Deal and you will be able to follow the Deal changes and take actions on the new Deal information page. The Deal will also appear in your profile, listed under your deals as buyer.</div>
            <div className="mt-4 text-sm text-gray-900">
                <div>
                    <span className="font-bold">Value: </span>This is the value of the good or service. The service fee will be 0.1% of this value.
                </div>
                <div className="mt-2">
                    <span className="font-bold">Sellers&apos;s address: </span>The address of the seller, it has to be a valid address of the selected network.
                </div>
                <div className="mt-2">
                    <span className="font-bold">Seller&apos;s deposit: </span>This is the amount the seller has to store in the contract as collateral. This value can be anything greater than 0, but it is very important to set an amount that will keep the seller honest until the transaction is complete. <span className=" text-blue-600 underline-offset-4 underline"><Link href="/about" >Learn more about deposits</Link></span>
                </div>
                <div className="mt-2">
                    <span className="font-bold">Your deposit: </span>This is the amount you have to store in the contract as collateral. This value can also be anything greater than 0, but you should set an amount that would give the seller the confidece that you will keep your part of the deal.
                </div>
                <div className="mt-2">
                    <span className="font-bold">Select Network: </span>The network the Deal will take place in. It is very important to agree on a network with the counterpart.
                </div>
            </div>
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
