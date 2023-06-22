"use client"
import classNames from "classnames";
import Link from "next/link";
import ButtonLoader from "./ButtonLoader";

const Button = ({ label, href = null, type = 'secondary', onClick = null, disabled = false, loading = false}) => {
    const className = classNames(
        'py-2 px-3 text-center transition-all duration-200 rounded text-sm font-semibold leading-6 min-w-60 min-w-[150px]',
        { 'text-gray-900 hover:text-white hover:bg-gray-900 hover:border-gray-900 border border-gray-900': type === 'secondary' },
        { 'border-none bg-red-400 text-white hover:text-white hover:bg-gray-900 hover:border-gray-900 border border-gray-900': type === 'error' },
        { 'border-gray-900 text-gray-900 bg-green-300 border hover:text-green-300 hover:bg-gray-900': type === 'primary' },
        { 'border-gray-900 text-gray-900 bg-blue-300 border hover:text-blue-300 hover:bg-gray-900': type === 'info' },
        { 'flex items-center justify-center hover:text-inherit hover:bg-inherit': loading },
    );

    const handleClick = (event) => {
        if(!loading) onClick(event);
    }

    if (onClick) {
        return <button disabled={disabled} onClick={handleClick} className={className}>{label} {loading && <ButtonLoader />}</button>;
    } else {
        return (
            <Link href={href}>
                <button disabled={disabled} className={className}>
                    {label}
                </button>
            </Link>
        );
    }

}

export default Button;