"use client"
import classNames from "classnames";
import Link from "next/link";

const Button = ({ label, href, type = 'secondary', onClick = () => undefined}) => {
    const className = classNames(
        'py-2 px-3 text-center transition-all duration-200 rounded text-sm font-semibold leading-6 min-w-60 min-w-[150px]',
        { 'text-gray-900 hover:text-white hover:bg-gray-900 hover:border-gray-900 border border-gray-900': type === 'secondary' },
        { 'text-gray-900 bg-green-300 border border-green-300 hover:text-green-300 hover:bg-gray-900 hover:border-gray-900': type === 'primary' },
    );
    return (
        <Link href={href} className={className} onClick={onClick} >
            <button>{label}</button>
        </Link>
    )
}

export default Button;