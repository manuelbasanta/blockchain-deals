import { Metadata } from "next";
import NewBuyerTrustlessDeal from "../../../components/pages/NewBuyerTrustlessDeal/NewBuyerTrustlessDeal";

export const metadata: Metadata = {
    title: 'New trustless Deal as Buyer',
    description: 'Create a new trustless escrow deal backed by the Ethereum blockchain',
};

export default function Page() {
    return <NewBuyerTrustlessDeal />;
}