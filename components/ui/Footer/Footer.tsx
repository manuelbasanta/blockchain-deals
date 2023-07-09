import Link from "next/link";
import { pt_serif } from "../../../fonts/fonts";

const Footer = () => {
    return (
        <footer className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 border-t border-t-gray-300 w-full">
            <ul className="list-none font-semibold text-sm">
                <li><Link href="/about">About Blockchain Deals</Link></li>
                <li><Link href="/new">Create new deal</Link></li>
                <li><Link href="/profile">Your profile</Link></li>
            </ul>
            <Link href="/" className="text-xl"><span className={pt_serif.className}>BD</span></Link>
        </footer>
    )
}

export default Footer;