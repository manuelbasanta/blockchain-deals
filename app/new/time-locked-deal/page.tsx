import { Metadata } from "next";
import NewTimeLockedDeal from "../../../components/pages/NewTimeLockedDeal/NewTimeLockedDeal";

export const metadata: Metadata = {
    title: 'New time locked Deal',
    description: 'Create a new time locked escrow deal backed by the Ethereum blockchain',
};

export default function Page() {
    return <NewTimeLockedDeal />;
}