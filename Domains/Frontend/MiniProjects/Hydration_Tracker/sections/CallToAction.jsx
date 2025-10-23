"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
const CallToAction = () => {
    return (
        <section className="py-24">
            <div className="overflow-x-clip p-4 flex">
                {/*overflow-x-clip hides the overflowing content*/}
                <motion.div
                    animate={{
                        x: "-50%",
                    }}

                    //start from -50% of the width to enable animation
                    transition={{
                        duration: 30,
                        ease: "linear",
                        repeat: Infinity,
                    }}

                    className="flex flex-none gap-16 pr-16 text-7xl md:text-8xl font-medium whitespace-nowrap">

                    {/*flex-none is to keep width fixed to prevent it from shrinking
                    Tip: add pr-16 same as gap-16 to account for jumps*/}

                    {Array.from({ length: 10 }).map((_, i) => (
                        //creates an array of 10 items to duplicate it 10 times
                        <div key={i} className="flex items-center gap-8">
                            <Image
                                src="/assets/images/water.svg"
                                alt="water"
                                height={16}
                                width={16}
                                className="w-14 md:w-18"
                            />
                            <span>Sip. Track. Hydraze.</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default CallToAction;