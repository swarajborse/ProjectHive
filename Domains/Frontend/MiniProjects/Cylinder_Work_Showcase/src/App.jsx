import {Canvas} from "@react-three/fiber"
import React from 'react'
import "./style.css";
import {OrbitControls} from "@react-three/drei"
import { Bloom, EffectComposer, ToneMapping } from '@react-three/postprocessing'
import Scene from "./Scene";
const App = () => {
  
  return(
    <>
    <Canvas flat camera={{fov:25}}>
    <OrbitControls enableZoom={false}/>
    <ambientLight/>
    <Scene/>
    <EffectComposer>
    {<Bloom
      mimapBlur
      intensity={8.0} // The bloom intensity.
      luminanceThreshold={0} // luminance threshold. Raise this value to mask out darker elements in the scene.
      luminanceSmoothing={0} // smoothness of the luminance threshold. Range is [0, 1]
    />}
    </EffectComposer>
    </Canvas>
    <div className="w-full bg-black py-32 flex justify-center">
      <h1 className="text-white font-bold text-4xl">This is a simple ThreeJS Cylinder Showcase</h1>
    </div>
    </>
  ) 
}

export default App