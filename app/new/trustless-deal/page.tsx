import { Metadata } from "next";
import NewTrustlessDeal from "../../../components/pages/NewTrustlessDeal/NewTrustlessDeal";

export const metadata: Metadata = {
    title: 'New trustless Deal',
    description: 'Create a new trustless escrow deal backed by the Ethereum blockchain',
};

export default function Page() {
    return <NewTrustlessDeal />;
}