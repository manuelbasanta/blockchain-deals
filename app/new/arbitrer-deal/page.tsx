import { Metadata } from "next";
import NewArbitrerDeal from "../../../components/pages/NewArbitrerDeal/NewArbitrerDeal";

export const metadata: Metadata = {
    title: 'New arbitrer Deal',
    description: 'Create a new escrow deal with an arbitrer, backed by the Ethereum blockchain',
};

export default function Page() {
    return <NewArbitrerDeal />;
}