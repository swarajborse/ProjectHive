"use client";
import React from 'react'
import Button from "@/components/Button";
const Hero = () => {
    return (
        <section className="py-24 flex justify-center items-center px-3">
            <div className="container">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-medium text-center mx-auto">Stay Hydrated, <span className="text-blue-300">Stay Healthy</span></h1>
                <p className="text-center text-xl md:text-2xl text-white/70 max-w-2xl mt-8 mx-auto">Track your daily water intake, build healthy habits, and keep your body refreshed one sip at a time.</p>
                <div className="flex justify-center items-center mt-8">
                    <Button variant="primary" href="#showcase">Let's Go</Button>
                </div>
            </div>
        </section>
    )
}
export default Hero
