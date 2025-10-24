"use client";
import React, { useRef } from 'react'
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { Water } from "@/components/HeroModel/Water";
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const HeroExperience = () => {
    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });

    return (
        <Canvas camera={{ position: [0, 5, 12], fov: 28 }}>
            {/* soft ambient light with the primary blue color */}
            <ambientLight intensity={0.4} color="#16ade0" />

            {/* main light source - matches text glow color */}
            <directionalLight
                position={[0, 10, 0]}
                intensity={2.0}
                color="#16ade0"
            />

            {/* slightly brighter highlight from above */}
            <directionalLight
                position={[4, 6, 6]}
                intensity={2.0}
                color="#47c2ef"
            />

            {/* deep underwater glow from below */}
            <directionalLight
                position={[0, -5, 0]}
                intensity={1.2}
                color="#0c7bb0"
            />

            {/* rim highlight */}
            <directionalLight
                position={[-5, 2, -4]}
                intensity={3.8}
                color="#7ad7ff"
            />

            {/* additional accent light for more water like refraction */}
            <pointLight
                position={[2, 0, 4]}
                intensity={2.5}
                color="#5acbff"
                distance={10}
            />

            <OrbitControls enablePan={!isTablet} enableZoom={false} />
            {/*tis to enable camera movements but only on lg devices and above*/}

            <EffectComposer>
                <Bloom
                    // strength of bloom
                    intensity={2.5}
                    // how bright a pixel should be to glow
                    luminanceThreshold={0.2}  // lower threshold to capture more of the glow
                    // how gently the glow blends out
                    luminanceSmoothing={0.9}  // smoother bloom for water-like effect
                    mipmapBlur // to naturally bloom the edges
                />
            </EffectComposer>

            <Rotating>
                <Water position={[0, -1.5, 0]} />
            </Rotating>
        </Canvas>
    )
}

const Rotating = ({ children }) => {
    const ref = useRef(null)
    useFrame((_, delta) => {
        // useFrame runs code on every frame, usually 60s but depends on browser
        if (ref.current) {
            ref.current.rotation.y += delta * 0.2 // tweak speed here
        }
    })
    return <group ref={ref}>{children}</group>
}

export default HeroExperience