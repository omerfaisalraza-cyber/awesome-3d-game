import React, { useState, useRef } from 'react';

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4';

const Velorah: React.FC = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [hamburgerRotate, setHamburgerRotate] = useState(false);

  const toggleNav = () => {
    setNavOpen(!navOpen);
    setHamburgerRotate(!hamburgerRotate);
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        '--font-display': "'Instrument Serif', serif",
      } as React.CSSProperties}
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="fixed inset-0 w-full h-full object-cover z-0"
        style={{
          objectPosition: '70% center',
        }}
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span
            className="text-3xl tracking-tight text-white font-semibold"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Velorah<sup className="text-xs">®</sup>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm text-white hover:text-white/80 transition-colors">
            Home
          </a>
          <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">
            Studio
          </a>
          <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">
            About
          </a>
          <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">
            Journal
          </a>
          <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">
            Reach Us
          </a>
        </div>

        {/* Desktop CTA */}
        <button className="hidden md:block liquid-glass text-white text-sm rounded-full px-6 py-2.5 hover:scale-[1.03] transition-transform">
          Begin Journey
        </button>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px]"
          onClick={toggleNav}
        >
          <div
            className="w-6 h-[2px] bg-white transition-all duration-300"
            style={{
              transform: hamburgerRotate ? 'translateY(7px) rotate(45deg)' : 'none',
            }}
          />
          <div
            className="w-6 h-[2px] bg-white transition-opacity duration-300"
            style={{
              opacity: hamburgerRotate ? 0 : 1,
            }}
          />
          <div
            className="w-6 h-[2px] bg-white transition-all duration-300"
            style={{
              transform: hamburgerRotate ? 'translateY(-7px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* Mobile Overlay */}
      {navOpen && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-8 px-8">
          <a href="#" className="text-3xl font-medium text-black">
            Home
          </a>
          <a href="#" className="text-3xl font-medium text-black">
            Studio
          </a>
          <a href="#" className="text-3xl font-medium text-black">
            About
          </a>
          <a href="#" className="text-3xl font-medium text-black">
            Journal
          </a>
          <a href="#" className="text-3xl font-medium text-black">
            Reach Us
          </a>
          <button className="text-3xl font-medium text-black underline underline-offset-2">
            Get in touch
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center px-6 pt-32 pb-40 md:pb-0 z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* H1 */}
          <h1
            className="animate-fade-rise text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-tight font-normal text-white"
            style={{
              fontFamily: "'Instrument Serif', serif",
              letterSpacing: '-2.46px',
            }}
          >
            Where dreams rise through <em className="not-italic text-white/60">the silence.</em>
          </h1>

          {/* Subtext */}
          <p className="animate-fade-rise-delay text-base sm:text-lg text-white/60 max-w-2xl mx-auto mt-8 leading-relaxed">
            We're designing tools for deep thinkers, bold creators, and quiet rebels. Amid the chaos, we build digital
            spaces for sharp focus and inspired work.
          </p>

          {/* CTA Button */}
          <button className="animate-fade-rise-delay-2 liquid-glass text-white text-base rounded-full px-14 py-5 hover:scale-[1.03] transition-transform mt-12 cursor-pointer">
            Begin Journey
          </button>
        </div>
      </section>
    </div>
  );
};

export default Velorah;
