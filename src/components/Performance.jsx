import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import performancePositions from '../constants/performanceImages';

gsap.registerPlugin(ScrollTrigger);

const Performance = () => {
  const sectionRef = useRef();

  useGSAP(() => {
    // Text animation
    gsap.fromTo('.content', 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, 
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          invalidateOnRefresh: true,
        }
      }
    );

    // Image animations on desktop
    if (window.innerWidth > 1024) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        }
      });

      // Animate images to their positions at time 0
      Object.entries(performancePositions).forEach(([id, pos]) => {
        if (id !== 'p5') {
          tl.fromTo(`.${id}`, 
            { opacity: 0, scale: 0.6, x: 150, y: 150 }, 
            { ...pos, opacity: 1, scale: 1, x: 0, y: 0, position: 'absolute', duration: 0.5 }, 
            0
          );
        }
      });
    }
  }, { scope: sectionRef });

const performanceImages = [
    { id: "p1", src: '/performance1.png' },
    { id: "p2", src: '/performance2.png' },
    { id: "p3", src: '/performance3.png' },
    { id: "p4", src: '/performance4.png' },
    { id: "p5", src: '/performance5.jpg' },
    { id: "p6", src: '/performance6.png' },
    { id: "p7", src: '/performance7.png' },
  ]
  return (
    <section ref={sectionRef} id='performance' className='mb-56'>
        <h2>Next-level graphics performance. Game on. </h2>
        <div className="wrapper">
        {performanceImages.map(({ id, src }) => { return <img key={id} className={id} src={src} alt={`performance ${id}`} />})}
        </div>
        <div className="content">
            Run graphics-intensive workflows with a responsiveness that keeps up with your imagination. The M4 family of chips features a GPU with a second-generation hardware-accelerated ray tracing engine that renders images faster, 
            <span className='text-white'>
            so gaming feels more immersive and realistic than ever.
            </span>
            And Dynamic Caching optimizes fast on-chip memory to dramatically increase average GPU utilization-driving a huge performance boost for the most demanding pro apps and games.
        </div>
    </section>
  )
}

export default Performance