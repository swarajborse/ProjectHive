"use client";
import React from "react";
import FeatureCard from "@/components/FeatureCard";
import { MdLightbulbOutline } from "react-icons/md";
import { LuGlassWater } from "react-icons/lu";
import { WiDayCloudy } from "react-icons/wi";

const Features = () => {
    return (
        <section
            id="features"
            className="py-24 md:mt-12 flex flex-col items-center justify-center"
        >
            <div className="container flex flex-col items-center p-12 md:p-6">
                <h2 className="text-6xl font-medium text-center mt-6">
                    Hydraze makes tracking{" "}
                    <span className="text-blue-300 block">convenient</span>
                </h2>

                <div className="mt-24 grid grid-cols-1 gap-14 md:grid-cols-4 lg:grid-cols-3 text-center">
                    <FeatureCard
                        title="Suggestions & Facts"
                        description="Get actionable tips and fun hydration facts every time you open the app"
                        image={<MdLightbulbOutline size={72} className="text-blue-300 mx-auto" />}
                        className="md:col-span-2 lg:col-span-1"
                    />

                    <FeatureCard
                        title="Track Water Consumption"
                        description="Log every sip with fully customisable quick‑add buttons"
                        image={<LuGlassWater size={72} className="text-blue-300 mx-auto" />}
                        className="md:col-span-2 lg:col-span-1"
                    />

                    <FeatureCard
                        title="Weather‑Based Suggestions"
                        description="Dynamic intake recommendations based on your local weather"
                        image={<WiDayCloudy size={80} className="text-blue-300 mx-auto" />}
                        className="md:col-span-2 lg:col-span-1 md:col-start-2 lg:col-start-auto"
                    />
                </div>
            </div>
        </section>
    );
};

export default Features;