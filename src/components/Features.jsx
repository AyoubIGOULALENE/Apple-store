import { Canvas } from '@react-three/fiber'
import React, { Suspense, useEffect, useRef } from 'react'
import StudioLights from './models/StudioLights'
import { features, featureSequence } from '../constants'
import { Html } from '@react-three/drei'
import { MacBook } from './models/Macbook'
import { useMediaQuery } from 'react-responsive';
import useMackbookStore from '../store'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const ModelScroll = () => {
    const modelRef = useRef();
    const {setTexture} = useMackbookStore();
    const isMobile = useMediaQuery({query: '(max-width: 768px)'});
    
    useEffect(() => {
      featureSequence.forEach((feature) => {
        const video = document.createElement('video');
        Object.assign(video, { src: feature.videoPath, loop: true, muted: true, playsInline: true });
        video.load();
      });
    }, []);

    useGSAP(() => {
      if (!modelRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#features',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        }
      });

      // Ensure feature cards start hidden and offset for a smooth entrance
      gsap.set('.feature-card', { opacity: 0, y: 20 });

      // Rotate the model 360° around its own vertical axis
      tl.to(modelRef.current.rotation, { y: Math.PI * 2, ease: 'power1.inOut' }, 0);

      // Animate the title and feature boxes in sequence
      tl.fromTo('#features h2', { opacity: 0, y: 20 }, { opacity: 1, y: 0, ease: 'power1.out' }, 0);

      featureSequence.forEach((feature, index) => {
        const offset = 0.15 + index * 0.15;
        tl.call(() => setTexture(feature.videoPath), null, offset);
        tl.to(`.feature-card:nth-child(${index + 1})`, { opacity: 1, y: 0, ease: 'power1.out' }, offset);
      });

      // After all cards fade in, animate them to center
      tl.to('.feature-card', { x: 0, ease: 'power1.out' }, '+=0.2');
    }, []);

    return (
        <group ref={modelRef}>
          <group rotation={[Math.PI / 5, 0, 0]}>
            <Suspense fallback={<Html><h1 className='text-white text-3xl uppercase'>Loading...</h1></Html>}>
            <MacBook scale={isMobile ? 0.5 : 1} position={isMobile ? [0, 0, 0] : [0, -10, -10]} />
            </Suspense>
          </group>
        </group>
    )
}

const Features = () => {
  return (
    <section id='features' className="relative">
      <h2 className="relative z-20">See it all in a new light</h2>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <Canvas camera={{ position: [0, 1, 35] }} style={{ height: '600px' }} id='features-canvas'>
            <StudioLights />
            <ambientLight intensity={0.5} />
            <ModelScroll />
          </Canvas>
        </div>

        <div className="space-y-6"> 
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`feature-card opacity-0 translate-y-5 rounded-2xl bg-black/40 p-6 text-white shadow-lg shadow-black/30 transition`}
            >
              <div className="text-sm font-semibold text-primary">{feature.highlight}</div>
              <div className="mt-2 text-sm leading-relaxed">{feature.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features