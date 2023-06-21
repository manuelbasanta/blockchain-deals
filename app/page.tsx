import { Metadata } from "next";
import Home from "../components/pages/Home/Home";

export const metadata: Metadata = {
    title: 'Blockchain Deals',
    description: 'Create escrow Deals backed by the blockchain',
};

export default function Page() {
    return <Home />;
}