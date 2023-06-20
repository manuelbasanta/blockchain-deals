import { Metadata } from "next";
import NewSellerDeal from "../../../components/pages/NewSellerDeal/NewSellerDeal";

export const metadata: Metadata = {
    title: 'New Deal as Seller',
    description: 'Create a new escrow Deal backed by the Ethereum blockchain',
};

export default function Page() {
    return <NewSellerDeal />;
}