"use client";
import { useEffect, useRef, useState } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import Navbar from "@/sections/Navbar";
import Hero from "@/sections/Hero";
import Showcase from "@/sections/Showcase";
import Features from "@/sections/Features";
import Introduction from "@/sections/Introduction";
import GetStarted from "@/sections/GetStarted";
import CallToAction from "@/sections/CallToAction";
import Footer from "@/sections/Footer";

const Page = () => {
    const showcaseRef = useRef(null);
    const introductionRef = useRef(null);

    const [hideForShowcase, setHideForShowcase] = useState(false);
    const [hideForIntro, setHideForIntro] = useState(false);

    useEffect(() => {
        const showcaseObserver = new IntersectionObserver(
            ([entry]) => {
                setHideForShowcase(entry.isIntersecting);
            },
            {
                threshold: 0.6,
            }
        );

        const introObserver = new IntersectionObserver(
            ([entry]) => {
                setHideForIntro(entry.isIntersecting);
            },
            {
                threshold: 0.1,
            }
        );

        const showcaseEl = showcaseRef.current;
        const introEl = introductionRef.current;

        if (showcaseEl) showcaseObserver.observe(showcaseEl);
        if (introEl) introObserver.observe(introEl);

        return () => {
            if (showcaseEl) showcaseObserver.unobserve(showcaseEl);
            if (introEl) introObserver.unobserve(introEl);
        };
    }, []);

    const showNavbar = !(hideForShowcase || hideForIntro);

    return (
        <ErrorBoundary>
            <Navbar className={showNavbar ? "opacity-100" : "opacity-0"} />
            <Hero />
            <div ref={showcaseRef}>
                <Showcase />
            </div>
            <div ref={introductionRef}>
                <Introduction />
            </div>
            <Features />
            <CallToAction />
            <GetStarted />
            <Footer />
        </ErrorBoundary>
    );
};

export default Page;