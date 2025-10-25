"use client";
import React, { useEffect, useState } from "react";

const hydrationFacts = [
    "Your body is about 60% water.",
    "Even mild dehydration (1-2%) can impair mood and concentration.",
    "Drinking water can help boost your metabolism temporarily.",
    "Thirst is often mistaken for hunger-drink first!",
    "Staying hydrated improves skin elasticity.",
    "Water cushions joints and protects spinal cord tissue.",
    "Proper hydration regulates body temperature through sweat.",
    "Drinking enough water helps prevent kidney stones.",
    "A dehydrated brain shrinks, leading to headaches.",
    "Water aids digestion and nutrient absorption.",
    "Hydration supports cardiovascular health and circulation.",
    "Well‑hydrated muscles work more efficiently.",
    "Drinking water may help with weight management.",
    "Hydration keeps your mouth moist and reduces cavities.",
    "Fluid balance affects energy levels throughout the day.",
    "Cold water can cool the body faster after exercise.",
    "Bodies lose water while sleeping-drink when you wake up.",
    "Air travel dehydrates you-drink extra on flights.",
    "Electrolytes like sodium and potassium help retain water.",
];

const Card4 = ({ className }) => {
    const [fact, setFact] = useState(() => hydrationFacts[0]);

    useEffect(() => {
        const changeFact = () => {
            const next = hydrationFacts[Math.floor(Math.random() * hydrationFacts.length)];
            setFact(next);
        };
        changeFact();
        const id = setInterval(changeFact, 20000);
        return () => clearInterval(id);
    }, []);

    return (
        <main className={className}>
            <h2 className="text-blue-300 font-semibold text-lg">Did you know ?</h2>
            <p className="text-white/75 px-2">{fact}</p>
        </main>
    );
};

export default Card4;