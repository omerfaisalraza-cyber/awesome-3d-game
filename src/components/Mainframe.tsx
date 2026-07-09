import React, { useState, useRef, useEffect } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4';
const SENSITIVITY = 0.8;

const Mainframe: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [hamburgerRotate, setHamburgerRotate] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const prevXRef = useRef<number>(0);
  const targetTimeRef = useRef<number>(0);

  const { displayed, done } = useTypewriter({
    text: 'Glad you stopped in. Good taste tends to find us. Now, what are we building?',
    speed: 38,
    startDelay: 600,
  });

  // Show action buttons after 400ms
  useEffect(() => {
    const timer = setTimeout(() => setShowButtons(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const toggleNav = () => {
    setNavOpen(!navOpen);
    setHamburgerRotate(!hamburgerRotate);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const currentX = e.clientX;
    const delta = currentX - prevXRef.current;
    prevXRef.current = currentX;

    const video = videoRef.current;
    if (!video) return;

    const offset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
    targetTimeRef.current = Math.max(0, Math.min(video.duration, targetTimeRef.current + offset));

    if (!video.seeking) {
      video.currentTime = targetTimeRef.current;
    }
  };

  const handleSeeked = () => {
    const video = videoRef.current;
    if (!video) return;

    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.1) {
      video.currentTime = targetTimeRef.current;
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    const video = videoRef.current;
    if (video) {
      video.addEventListener('seeked', handleSeeked);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (video) {
        video.removeEventListener('seeked', handleSeeked);
      }
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@mainframe.co');
  };

  return (
    <div
      style={{
        '--font-body': "'HelveticaNowDisplay', 'Helvetica Neue', Arial, sans-serif",
        '--font-heading': "'HelveticaNowDisplay-Medium', 'Helvetica Neue', Arial, sans-serif",
        fontFamily: "var(--font-body)",
      } as React.CSSProperties}
    >
      {/* Background Video */}
      <video
        ref={videoRef}
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

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span
            className="text-xl sm:text-2xl tracking-tight text-black font-medium"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Mainframe(R)
          </span>
          <span
            className="text-2xl sm:text-3xl text-black select-none"
            style={{ letterSpacing: '-0.02em' }}
          >
            ✳︎
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1 text-2xl text-black">
          <a href="#" className="hover:opacity-60 transition-opacity">
            Labs
          </a>
          <span>, </span>
          <a href="#" className="hover:opacity-60 transition-opacity">
            Studio
          </a>
          <span>, </span>
          <a href="#" className="hover:opacity-60 transition-opacity">
            Openings
          </a>
          <span>, </span>
          <a href="#" className="hover:opacity-60 transition-opacity">
            Shop
          </a>
        </div>

        {/* Desktop CTA */}
        <a
          href="#"
          className="hidden md:block text-2xl text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
        >
          Get in touch
        </a>

        {/* Mobile Hamburger */}
        <button className="md:hidden flex flex-col gap-[5px]" onClick={toggleNav}>
          <div
            className="w-6 h-[2px] bg-black transition-all duration-300"
            style={{
              transform: hamburgerRotate ? 'translateY(7px) rotate(45deg)' : 'none',
            }}
          />
          <div
            className="w-6 h-[2px] bg-black transition-opacity duration-300"
            style={{
              opacity: hamburgerRotate ? 0 : 1,
            }}
          />
          <div
            className="w-6 h-[2px] bg-black transition-all duration-300"
            style={{
              transform: hamburgerRotate ? 'translateY(-7px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* Mobile Overlay */}
      {navOpen && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-9 flex flex-col items-start justify-center gap-8 px-8 pointer-events-auto">
          <a href="#" className="text-4xl font-medium text-black">
            Labs
          </a>
          <a href="#" className="text-4xl font-medium text-black">
            Studio
          </a>
          <a href="#" className="text-4xl font-medium text-black">
            Openings
          </a>
          <a href="#" className="text-4xl font-medium text-black">
            Shop
          </a>
          <button className="text-4xl font-medium text-black underline underline-offset-2">
            Get in touch
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section
        className="relative h-screen w-full flex flex-col px-5 sm:px-8 md:px-10 overflow-hidden z-1"
        style={{
          justifyContent: 'flex-end',
          paddingBottom: 'clamp(3rem, 5vw, 12rem)',
        }}
      >
        <div className="max-w-xl relative z-10">
          {/* Blurred Intro Label */}
          <div
            className="pointer-events-none select-none mb-5 sm:mb-6"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.3,
              fontWeight: 400,
              color: '#000',
              filter: 'blur(4px)',
            }}
          >
            <div>Hey there, meet A.R.I.A,</div>
            <div>Mainframe's Adaptive Response Interface Agent</div>
          </div>

          {/* Typewriter Text */}
          <p
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.35,
              fontWeight: 400,
              color: '#000',
              minHeight: '54px',
              marginBottom: 'clamp(1.25rem, 2vw, 1.5rem)',
            }}
          >
            {displayed}
            {!done && <span className="typewriter-cursor" />}
          </p>

          {/* Action Pills */}
          <div
            className="flex flex-wrap gap-y-1"
            style={{
              opacity: showButtons ? 1 : 0,
              transform: showButtons ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            {['Pitch us an idea', 'Come work here', 'Send a brief hello', 'See how we operate'].map(
              (label) => (
                <button
                  key={label}
                  className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-xs sm:text-sm px-4 sm:px-5 py-px mx-px mb-1 whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200"
                  style={{
                    padding: 'clamp(0.3em, 1vw, 0.5em) clamp(1rem, 2vw, 1.25rem)',
                  }}
                >
                  {label}
                </button>
              }
            )}

            {/* Email Pill */}
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center justify-center bg-transparent text-white border border-white rounded-full text-xs sm:text-sm px-4 sm:px-5 gap-2 sm:gap-3 mx-px mb-1 whitespace-nowrap hover:bg-white hover:text-black transition-colors duration-200"
              style={{
                padding: 'clamp(0.3em, 1vw, 0.5em) clamp(1rem, 2vw, 1.25rem)',
              }}
            >
              <span>
                Reach us: <u>hello@mainframe.co</u>
              </span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mainframe;
