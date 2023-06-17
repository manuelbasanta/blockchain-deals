import { Metadata } from "next";
import NewSellerArbitrerDeal from "../../../components/pages/NewSellerArbitrerDeal/NewSellerArbitrerDeal";

export const metadata: Metadata = {
    title: 'New arbitrer Deal as Seller',
    description: 'Create a new escrow deal with an arbitrer, backed by the Ethereum blockchain',
};

export default function Page() {
    return <NewSellerArbitrerDeal />;
}