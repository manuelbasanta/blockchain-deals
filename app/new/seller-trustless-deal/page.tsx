import { Metadata } from "next";
import NewSellerTrustlessDeal from "../../../components/pages/NewSellerTrustlessDeal/NewSellerTrustlessDeal";

export const metadata: Metadata = {
    title: 'New trustless Deal as Seller',
    description: 'Create a new trustless escrow deal backed by the Ethereum blockchain',
};

export default function Page() {
    return <NewSellerTrustlessDeal />;
}