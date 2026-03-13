import React from 'react'

const Hero = () => {
  return (
    <section id='hero' className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">MacBook Pro</h1>
        <img src="/title.png" alt="MacBook Pro" className="mx-auto mb-4 max-w-xs md:max-w-md" />
      </div>

      <div className="relative w-full max-w-4xl mx-auto mb-8">
        <video
          src="/videos/hero.mp4"
          autoPlay
          playsInline
          muted
          className="w-full h-auto rounded-lg shadow-lg"
        ></video>
      </div>

      <div className="text-center">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full mb-4 transition-colors">
          Buy me
        </button>
        <p className="text-lg md:text-xl text-gray-300">from $1,999 to $2,499</p>
      </div>
    </section>
  )
}

export default Hero