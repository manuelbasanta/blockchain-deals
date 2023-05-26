import Link from "next/link";

const Button = ({ label, href}) => {
    return (
        <Link href={href} className="py-2 px-3 text-center transition-all duration-200 rounded text-sm font-semibold leading-6 text-gray-900 hover:bg-green-300 border border-gray-900">
            <button>{label}</button>
        </Link>
    )
}

export default Button;