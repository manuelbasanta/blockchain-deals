import Link from "next/link";
import { pt_serif } from "../../../fonts/fonts";
import Button from "../Button/Button";

const Header = () => {
    return (
        <header className="bg-white/50 backdrop-blur sticky top-0 z-50">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex items-center justify-between flex-1">
                    <Link className="text-2xl font-bold" href="/" >
                        <span className={pt_serif.className}>Blockchain Deals</span>
                    </Link>
                    <div className="flex flex-1 gap-x-3 md:gap-x-5 justify-end">
                        <span className="hidden md:flex">
                            <Button label="Create a new Deal" href="/new" />
                        </span>
                        <div className="md:hidden flex lg:justify-end">
                            <Link href="/new" className="p-2 duration-200 rounded text-sm font-semibold leading-6 text-gray-900">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </Link>
                        </div>
                        <div className="flex lg:justify-end">
                            <Link href="/profile" className="p-2 duration-200 rounded text-sm font-semibold leading-6 text-gray-900">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
