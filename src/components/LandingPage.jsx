import React, { useState, useEffect } from 'react';
import HeroSection from './HeroSection';

const LandingPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div>
      <HeroSection />
      {/* Only show the scrollable section for non-mobile devices */}
      {!isMobile && (
        <div className="h-screen bg-black">
        </div>
      )}
    </div>
  );
};

export default LandingPage;
