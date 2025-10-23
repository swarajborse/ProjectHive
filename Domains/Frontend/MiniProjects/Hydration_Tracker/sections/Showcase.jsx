"use client";
import React from 'react'
import HeroExperience from "@/components/HeroModel/HeroExperience";

const Showcase = () => {
    return (
        <section className="container mx-auto flex flex-col items-center pb-12 px-3" id="showcase">
            <figure className="w-full h-[50vh] md:h-[60vh] lg:h-[70vh] mx-auto">
                <HeroExperience />
            </figure>

        </section>
    )
}
export default Showcase
