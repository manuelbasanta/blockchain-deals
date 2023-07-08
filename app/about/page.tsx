import { Metadata } from "next";
import About from "../../components/pages/About/About";

export const metadata: Metadata = {
    title: 'About Blockchain Deals',
    description: 'About you need to know about Blockchain Deals, double deposit escrows and deposits amounts.',
};

export default function Page() {
    return <About />;
}