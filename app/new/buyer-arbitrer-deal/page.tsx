import { Metadata } from "next";
import NewBuyerArbitrerDeal from "../../../components/pages/NewBuyerArbitrerDeal/NewBuyerBuyerArbitrerDeal";

export const metadata: Metadata = {
    title: 'New arbitrer Deal as Buyer',
    description: 'Create a new escrow deal with an arbitrer, backed by the Ethereum blockchain',
};

export default function Page() {
    return <NewBuyerArbitrerDeal />;
}