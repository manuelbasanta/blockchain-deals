"use client"
import classNames from "classnames";
import Link from "next/link";

const Button = ({ label, href = null, type = 'secondary', onClick = (event) => null, disabled = false}) => {
    const className = classNames(
        'py-2 px-3 text-center transition-all duration-200 rounded text-sm font-semibold leading-6 min-w-60 min-w-[150px]',
        { 'text-gray-900 hover:text-white hover:bg-gray-900 hover:border-gray-900 border border-gray-900': type === 'secondary' },
        { 'text-gray-900 bg-green-300 border border-green-300 hover:text-green-300 hover:bg-gray-900 hover:border-gray-900': type === 'primary' },
    );

    if (href) {
        return (
            <Link href={href}>
                <button disabled={disabled} className={className}>{label}</button>
            </Link>
        );
    } else {
        return <button disabled={disabled} onClick={onClick} className={className}>{label}</button>;
    }

}

export default Button;