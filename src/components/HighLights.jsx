import React from 'react'
import { useMediaQuery } from 'react-responsive'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
const HighLights = () => {
  const isMobile = useMediaQuery({query: '(max-width: 1024px)'});
  useGSAP(() => {
    gsap.set(['.left-column','.right-column'], { opacity: 0, y: 20 });
    gsap.to(['.left-column','.right-column'],{
      scrollTrigger: {
        trigger: '#highlights',
        start: isMobile ? 'bottom bottom' : 'top top',
        end: 'bottom 60%',
        scrub: 1,
        invalidateOnRefresh: true,
      },
      opacity: 1,
      y: 0,
      ease: 'power1.out',
      duration: 1,
    })
  })
  return (
    <section id='highlights'>
      <h2>There's never been a better time to upgrade</h2>
      <h3>Here's what you get with the new macBook pro</h3>
      <div className="masonry">
        <div className="left-column">
          <div>
            <img src="/laptop.png" alt="" />
            <p>Fly through demanding taks up to 9.8x faster</p>
          </div>
            <div>
            <img src="/sun.png" alt="" />
            <p>A stunning <br /> liquid retina XDR <br /> display</p>
          </div>
        </div>
          <div className="right-column">
          <div className='apple-gradient'>
            <img src="/ai.png" alt="" />
            <p>Built for <br /> <span>Apple intelligence</span></p>
          </div>
            <div>
            <img src="/battery.png" alt="" />
            <p>Up to <span className='green-gradient'>{''}14 more hours</span> battery life. <span className='text-dark-100'>{''}(Up to 24 hours total.)</span></p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HighLights