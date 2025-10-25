import React, { useRef } from 'react'
import {useTexture} from "@react-three/drei"
import * as THREE from "three"
import { useFrame } from '@react-three/fiber';
const Scene = () => {
    const tex = useTexture("./Frame1.png");
    const cyl = useRef(null)
    useFrame((state,delta)=>{
        cyl.current.rotation.y += delta
    })
  return (
    <group rotation={[0,1.4,0.5]}>
    <mesh ref={cyl}>
        <cylinderGeometry args={[1 ,1, 1, 80 ,80, true]}/>
        <meshStandardMaterial map={tex} transparent side={THREE.DoubleSide}/>
    </mesh>
    </group>
  )
}

export default Scene