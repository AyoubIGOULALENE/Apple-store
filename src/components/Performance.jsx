import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import performancePositions from '../constants/performanceImages';

gsap.registerPlugin(ScrollTrigger);

const Performance = () => {
  const sectionRef = useRef();

  useGSAP(() => {
    const isMobile = window.innerWidth <= 768;
    const vw = window.innerWidth;


    const leftImages  = ['p1', 'p3'];

    const rightImages = ['p2', 'p4', 'p6', 'p7'];

    gsap.set('.p5', {
      position: 'absolute',
      top:  isMobile ? '35%' : '50%',
      left: '50%',
      xPercent: -50,
      yPercent: -50,
      zIndex: 10,
    });


    gsap.fromTo('.content',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          invalidateOnRefresh: true,
        }
      }
    );

    Object.entries(performancePositions).forEach(([id, pos]) => {
      gsap.set(`.${id}`, {
        position: 'absolute',
        top:    pos.top    ?? 'auto',
        bottom: pos.bottom ?? 'auto',
        left:   pos.left   ?? 'auto',
        right:  pos.right  ?? 'auto',
        scale:  parseFloat(pos.transform.match(/scale\(([\d.]+)\)/)?.[1] ?? 1),
        rotation: parseFloat(pos.transform.match(/rotate\(([-\d.]+)deg\)/)?.[1] ?? 0),
        opacity: 0,
      });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: isMobile ? 'top 75%' : 'top bottom',
        end:   isMobile ? 'center center' : 'center center',
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });


    leftImages.forEach((id) => {
      tl.fromTo(`.${id}`,
        { x: isMobile ? -vw * 0.6 : -vw * 0.45, opacity: 0 },
        { x: 0, opacity: 1, scale: 1, rotation: 0, ease: 'power1.out' },
        0
      );
    });

  
    rightImages.forEach((id) => {
      tl.fromTo(`.${id}`,
        { x: isMobile ? vw * 0.6 : vw * 0.45, opacity: 0 },
        { x: 0, opacity: 1, scale: 1, rotation: 0, ease: 'power1.out' },
        0
      );
    });

  }, { scope: sectionRef });

  const performanceImages = [
    { id: "p1", src: '/performance1.png' },
    { id: "p2", src: '/performance2.png' },
    { id: "p3", src: '/performance3.png' },
    { id: "p4", src: '/performance4.png' },
    { id: "p5", src: '/performance5.jpg' },
    { id: "p6", src: '/performance6.png' },
    { id: "p7", src: '/performance7.png' },
  ];

  return (
    <section ref={sectionRef} id='performance' className='mb-56 relative'>
      <h2>Next-level graphics performance. Game on.</h2>
      <div className="wrapper" style={{ position: 'relative' }}>
        {performanceImages.map(({ id, src }) => (
          <img key={id} className={id} src={src} alt={`performance ${id}`} />
        ))}
      </div>
      <div className="content">
        Run graphics-intensive workflows with a responsiveness that keeps up with your imagination.
        The M4 family of chips features a GPU with a second-generation hardware-accelerated ray
        tracing engine that renders images faster,{' '}
        <span className='text-white'>
          so gaming feels more immersive and realistic than ever.
        </span>{' '}
        And Dynamic Caching optimizes fast on-chip memory to dramatically increase average GPU
        utilization-driving a huge performance boost for the most demanding pro apps and games.
      </div>
    </section>
  );
}

export default Performance;