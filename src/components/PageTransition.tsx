import React, { useState, useEffect } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  isActive: boolean;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children, isActive }) => {
  const [mounted, setMounted] = useState(isActive);
  const [display, setDisplay] = useState(isActive);

  useEffect(() => {
    if (isActive) {
      setMounted(true);
      // Trigger animation
      setTimeout(() => setDisplay(true), 10);
    } else {
      setDisplay(false);
      // Wait for fade out before unmounting
      const timer = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  if (!mounted) return null;

  return (
    <div
      style={{
        opacity: display ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
      }}
    >
      {children}
    </div>
  );
};

export default PageTransition;
