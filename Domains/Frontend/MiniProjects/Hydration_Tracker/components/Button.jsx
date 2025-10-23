"use client"
import React from "react";
import { cva } from "class-variance-authority";
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

const buttonClasses = cva(
    "inline-flex items-center justify-center border h-12 rounded-full px-6 font-medium cursor-pointer",
    // Tis is a library that lets you define reusable, customizable component classes with variants
    {
        variants: {
            variant: {
                primary: "bg-blue-300 text-neutral-950 border-blue-300/60 transition-all duration-100 ease-in-out hover:delay-50 hover:bg-blue-200",

                secondary: "border-blue-300 text-white bg-transparent transition-all duration-100 ease-in-out hover:delay-50 hover:bg-blue-100/15",
            },
        },
        defaultVariants: {
            variant: "primary",
        },
    }
);

const Button = ({ children, className, variant, href, onClick }) => {
    const mergedClasses = twMerge(buttonClasses({ variant }), "cursor-pointer", className);
    // Tis a utility from the tailwind-merge library that safely merges multiple tailwind class strings

    if (href) {
        return (
            <Link href={href} className={mergedClasses}>
                {children}
            </Link>
        );
    }

    return (
        <button className={mergedClasses} onClick={onClick}>
            {children}
        </button>

    );
};

export default Button;