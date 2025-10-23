"use client";
import React from 'react';
import { FaGithub, FaEnvelope } from 'react-icons/fa';
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";

const AboutPage = () => {
    return (
        <>
            <Navbar />
            <section id="about" className="py-20 px-4 max-w-4xl mx-auto text-center scroll-mt-48">
                <h1 className="text-white text-5xl font-semibold mb-8">About Hydration Tracker</h1>
                <p className="text-lg text-white/75 mb-6">
                    Hydration Tracker is a simple tool I built to help you stay hydrated throughout the day.
                    With everything moving so fast around us, it's surprisingly easy to forget to drink enough water.
                </p>
                <p className="text-lg text-white/75 mb-6">
                    The idea was to make hydration tracking minimal and useful. The app offers basic but helpful features
                    like daily water tracking, weather-based hydration suggestions, and fun facts to keep you motivated.
                </p>
                <p className="text-lg text-white/75">
                    It's designed with simplicity in mind, using modern web technologies and a focus on a clean user experience.
                </p>
            </section>

            <section id="contact" className="py-20 px-4 max-w-4xl mx-auto text-center scroll-mt-12">
                <h2 className="text-white text-4xl font-semibold mb-6">Get In Touch</h2>
                <p className="text-white/75 mb-10 text-lg">
                    Have questions, suggestions, or just want to connect?
                </p>

                <div className="mb-10">
                    <div className="flex justify-center text-blue-300 mb-2 text-3xl">
                        <FaEnvelope />
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">Email Me</h3>
                    <p className="text-white/75 mb-1">
                        Feel free to reach out for anything - support, ideas, or feedback.
                    </p>
                    <p className="text-blue-300">mahirabd.official@gmail.com</p>
                </div>

                <div>
                    <div className="flex justify-center text-blue-300 mb-2 text-3xl">
                        <FaGithub />
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">Open Source</h3>
                    <p className="text-white/75  mb-1">
                        The project is open source - feel free to explore or contribute.
                    </p>
                    <a
                        href="https://github.com/mahir-m01/Hydration_Tracker"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-300 underline"
                    >
                        View on GitHub
                    </a>
                </div>
            </section>


            <section id="terms" className="py-16 px-4 max-w-4xl mx-auto text-center">
                <h2 className="text-white text-3xl font-semibold mb-4">Terms & Conditions</h2>
                <p className="text-white/75  text-lg">
                    This app is provided as-is under an open-source license. Use it freely for personal or educational purposes.
                    While contributions are welcome, there's no guarantee of support or maintenance. Please respect the project’s
                    license when using or redistributing any part of the codebase.
                </p>
            </section>

            <Footer />
        </>
    );
};

export default AboutPage;