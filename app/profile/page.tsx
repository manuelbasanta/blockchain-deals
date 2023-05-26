import { Metadata } from "next";
import Profile from "../../components/pages/Profile/Profile";

export const metadata: Metadata = {
    title: 'Profile',
    description: 'See and manage your Deals',
};

export default function Page() {
    return <Profile />;
}