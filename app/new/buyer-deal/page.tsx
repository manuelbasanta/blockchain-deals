import { Metadata } from "next";
import NewBuyerDeal from "../../../components/pages/NewBuyerDeal/NewBuyerDeal";

export const metadata: Metadata = {
    title: 'New Deal as Buyer',
    description: 'Create a new escrow Deal backed by the Ethereum blockchain',
};

export default function Page() {
    return <NewBuyerDeal />;
}