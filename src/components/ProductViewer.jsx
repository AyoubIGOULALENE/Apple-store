import React from 'react'
import useMackbookStore from '../store'
import clsx from 'clsx';
import { Canvas } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';
import MacBook14 from './models/Macbook-14';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import StudioLights from './models/StudioLights';
import ModelSwitcher from './models/three/ModelSwitcher';
const ProductViewer = () => {
  const {color, setColor, scale, setScale} = useMackbookStore();
  return (
    <section id='product-viewer'>
      <h2>Take a closer look at the new macbook</h2>
      <div className='controls'>
        <p className='info'>Makbook {scale === 0.12 ? '16' : '14'} pro in silver / Space Gray</p>
        <div className='flex justify-center items-center gap-8 mt-5'>
          <div className="color-control flex gap-3">
            <button onClick={() => setColor("#abd5bd")} className={`w-8 h-8 rounded-full ${clsx({ 'bg-neutral-300': color === "#abd5bd" })} border-2 border-gray-300 hover:border-blue-500 transition-colors`} />
            <button onClick={() => setColor("#2e2c2e")} className={`w-8 h-8 rounded-full ${clsx({ 'bg-neutral-900': color === "#2e2c2e" })} border-2 border-gray-300 hover:border-blue-500 transition-colors`} />
          </div>
          <div className="size-control flex gap-3">
            <button onClick={() => setScale(0.08)} className='px-6 py-3 bg-neutral-300 rounded-lg border-2 border-gray-300 hover:border-blue-500 transition-colors text-sm font-medium'>14"</button>
            <button onClick={() => setScale(0.12)} className='px-6 py-3 bg-neutral-900 rounded-lg border-2 border-gray-300 hover:border-blue-500 transition-colors text-sm font-medium text-white'>16"</button>
          </div>
        </div>
      </div>
<Canvas camera={{position: [0, 1, 3]}} id='canvas' style={{width:window.width}}>
   <StudioLights  />
  <directionalLight position={[5, 5, 5]} intensity={2} />
  <ModelSwitcher scale={scale} />
<EffectComposer>
  <Bloom 
    intensity={3}
    luminanceThreshold={0}
    luminanceSmoothing={0.9}
    mipmapBlur
  />
</EffectComposer>
</Canvas>
    </section>
  )
}

export default ProductViewer