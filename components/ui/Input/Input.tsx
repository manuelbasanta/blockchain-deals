"use client";
import { useState } from "react";

const Input = ({ label, type, placeholder, prefix = null, info = null}) => {
    const [value, setValue] = useState('');
    return (
        <div>
            <label htmlFor={label} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
            <div className="mt-2">
                <div className="flex w-full items-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-300">
                    { prefix && <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">{prefix}</span>}
                    <input autoComplete={label} type={type} name={label} id={label} className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 truncate" placeholder={placeholder}></input>
                    {
                        info &&
                        <div className="mr-2 text-gray-500" title={info}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Input;