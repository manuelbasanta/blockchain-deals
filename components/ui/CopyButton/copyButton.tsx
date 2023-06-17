"use client";

import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";

const CopyButton = ({ label, stringToCopy, useOrigin = false }) => {
    const [copied, setCopied] = useState(false);
    const handleClick = () => {
        navigator.clipboard.writeText(`${useOrigin ? window.location.origin : ''}${stringToCopy}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    };

    const className = classNames(
        'leading-6 text-gray-900 text-sm cursor-pointer font-semibold flex w-full justify-between border rounded py-2 px-3 border-dashed border-gray-900 transition-all duration-200 hover:border-gray-900',
        {'bg-green-300' : copied}
    )

    return (
        <div
            className={className}
            onClick={handleClick}
        >
            {copied ? 'Copied to clipboard!' : label}
            <Image
                src="/icons/copy.svg"
                alt="Copy Deal link"
                height="20"
                width="20"
            />
        </div>
    )
}

export default CopyButton;
