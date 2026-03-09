import { PresentationControls } from '@react-three/drei';
import React, { useRef } from 'react'
import  MacBook14  from '../Macbook-14';
import  MacBook16  from '../Macbook-16';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';


const ModelSwitcher = ({scale, ismobile}) => {
        const smallmacbookref = useRef();
    const largemacbookref = useRef();
    const ANIMATION_DURATION = 1;
    const OFSET_DISTANCE = 5;
    const fademesh = (group, opacity) =>{
        if(!group){
            return
        }
        group.traverse((child) => {
            if (child.isMesh) {
              child.material.transparent = true;
         gsap.to(child.material, { opacity: opacity, duration: ANIMATION_DURATION, ease: "power2.inOut" });
            }})
    }

    const moveGroup = (group, x) => {
        if(!group){
            return
        }
        gsap.to(group.position, { x: x, duration: ANIMATION_DURATION, ease: "power2.inOut" });
    }

    useGSAP(() => {
        if(scale === 0.12){
        moveGroup(smallmacbookref.current,-OFSET_DISTANCE);
        moveGroup(largemacbookref.current, 0);
        fademesh(smallmacbookref.current, 0);
        fademesh(largemacbookref.current, 1);}
        else{
            moveGroup(smallmacbookref.current, 0);
            moveGroup(largemacbookref.current, OFSET_DISTANCE);
            fademesh(smallmacbookref.current, 1);
            fademesh(largemacbookref.current, 0);
        }
     }, [scale])


    const controlConfig = {
        snap:true,
        speed:1,
        azimuth:[-Infinity, Infinity],
        polar:[0, Math.PI / 2],
    }

    return (
    <>
    <PresentationControls {...controlConfig} >
    <group ref={smallmacbookref} >
     <MacBook14 scale={0.08} position={[0, -0.5, -1]} />
    </group>
 
    </PresentationControls>
       <PresentationControls {...controlConfig} >
    <group ref={largemacbookref} >
     <MacBook16 scale={0.12} position={[0, -0.5, -1.5]} />
    </group>
 
    </PresentationControls>
    </>
  )
}

export default ModelSwitcher