"use client";
import React, {useEffect, useRef, useState} from 'react'
import {useScroll, useTransform, motion} from "framer-motion";
import {twMerge} from "tailwind-merge";

const text = " - it can cause headaches, fatigue, dizziness, dry skin, and trouble concentrating. It also affects your mood, energy, and mental clarity."
const words = text.split(" ");
const Introduction = () => {
    const scrollTarget = useRef(null) // To refer to the div that'll  have scrolling animation

    const {scrollYProgress} = useScroll({target: scrollTarget, offset: ["start end","end end"]}) //scroll y from 0 to 1. start end - starts (0) when the top of the target element reaches the bottom of the viewport - to - end end -ends (1) when the bottom of the target element reaches the bottom of the viewport.

    const [currentWord, setCurrentWord] = useState(0)

    const wordIndex = useTransform(scrollYProgress,[0,1],[0,words.length]) //tells which word to highlight. It maps the scrollYProgress which is 0 to 1 to the word index starting from 0 to words.length

    useEffect(() => {
        wordIndex.on('change',(latest)=>(
            setCurrentWord(latest)
        ))
    }, [wordIndex]); // for reference currentWord will get values like 2.7 , 3.4
    const isComplete = currentWord >= words.length;
    return (
        <section className="py-6 md:px-12 flex justify-center px-3">
            <div className="container px-3 md:w-2/3">
                <div className="text-center sticky top-32 md:top-38 lg:top-40">
                    <h2 className="inline-block px-6 py-4 rounded-full bg-blue-300/10 text-1xl md:text-2xl border border-blue-300/60 text-blue-300 mb-12">
                        Did you know ?
                    </h2>
                    <div className="text-3xl md:text-4xl font-medium">
                        <span>Dehydration doesn’t just make you thirsty</span>
                        <span>{words.map((word,wordIndex)=>(
                            <span
                                key={wordIndex}
                                className={twMerge(("transition duration-500 text-white/5"),wordIndex < currentWord && "text-white")}
                                // if currentWord = 3.2 then words with index 0,1,2 will be rendered.
                            >
                                {`${word} `}</span>
                        ))}</span>
                        <motion.span
                            className="text-blue-300 block mt-8"
                            initial={{opacity: 0}}
                            animate={{opacity: isComplete ? 1 : 0}}
                            transition={{duration: 1}}
                            // only renders once scrolling is complete
                            >
                            To keep your body sharp and your mind clear remember to stay hydrated
                        </motion.span>
                    </div>
                </div>
                <div className="h-[150vh]" ref={scrollTarget}></div>
                {/*
                    The reason why this div exists, is coz it gives the scrollable portion of the viewport. I cant add ref to the words themselves due to them being sticky.
                */}
            </div>
        </section>
    )
}
export default Introduction
