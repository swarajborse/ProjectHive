"use client";
import React from 'react'
import Image from "next/image";
import Link from "next/link";

const footerLinks = [
    {href: '/about#about', label: 'About'},
    {href: '/about#contact', label: 'Contact'},
    {href: '/about#terms', label: 'Terms and Conditions'},
];

const Footer = () => {
    return (
        <section className="py-16 px-3">
            <div className="w-full">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <Image
                            src="/assets/images/icon.svg"
                            alt="logo"
                            width={16}
                            height={16}
                            className="h-9 w-auto md:h-auto md:max-h-11"
                        />
                    </div>
                    <div>
                        <nav className="flex gap-6">
                            {footerLinks.map(link => (
                                <Link href={link.href}
                                      key={link.href}
                                      className="text-white/70
                                    hover:text-blue-300 transition-colors duration-300">
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer;