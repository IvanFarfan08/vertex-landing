import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { content } from '../config/content';

const HeroSection = () => {
  const [videoState, setVideoState] = useState({
    isPlaying: false,
    triggeredByScroll: false
  });
  const [isClosing, setIsClosing] = useState(false);

  const closeVideo = useCallback((source = 'unknown') => {
    // console.log('=== CLOSE VIDEO CALLED ===');
    // console.log('Source:', source);
    // console.log('Current videoState:', videoState);
    // console.log('isPlaying before close:', videoState.isPlaying);
    
    if (!videoState.isPlaying || isClosing) {
      // console.log('⚠️ Video already closed or closing, ignoring');
      return;
    }
    
    // console.log('🔒 Setting isClosing to true');
    setIsClosing(true);
    
    // console.log('🔄 Setting state to closed first...');
    setVideoState({
      isPlaying: false,
      triggeredByScroll: false
    });
    
    // console.log('📜 Scrolling to top...');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Reset isClosing after scroll completes
    setTimeout(() => {
      // console.log('🔓 Resetting isClosing to false');
      setIsClosing(false);
    }, 1500); // Wait longer for smooth scroll to complete
    
    // console.log('=== CLOSE VIDEO END ===');
  }, [videoState, isClosing]);

  const openVideo = useCallback((fromScroll = false) => {
    // console.log('=== OPEN VIDEO CALLED ===');
    // console.log('fromScroll:', fromScroll);
    // console.log('Current videoState:', videoState);
    
    setVideoState({
      isPlaying: true,
      triggeredByScroll: fromScroll
    });
    // console.log('=== OPEN VIDEO END ===');
  }, [videoState]);

  useEffect(() => {
    let isScrolling = false;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerPoint = 50;
      const sectionHeight = window.innerHeight; // Full viewport height for the section
      
      // console.log('Scroll event - scrollY:', scrollY, 'isClosing:', isClosing, 'videoState:', videoState);
      
      // If user scrolls down past trigger point, snap to the section and open video
      if (scrollY > triggerPoint && scrollY < sectionHeight && !videoState.triggeredByScroll && !videoState.isPlaying && !isClosing && !isScrolling) {
        // console.log('✅ Snapping to section and triggering video!');
        isScrolling = true;
        
        // Snap to the section
        window.scrollTo({
          top: sectionHeight,
          behavior: 'smooth'
        });
        
        // Open video after scroll completes
        setTimeout(() => {
          openVideo(true);
          isScrolling = false;
        }, 500);
      } else if (scrollY > triggerPoint && isClosing) {
        // console.log('❌ Would trigger video but isClosing=true, preventing');
      }
    };

    const handleWheel = (e) => {
      const scrollY = window.scrollY;
      const sectionHeight = window.innerHeight;
      
      // If we're at the top and user scrolls down, prevent default and snap to section
      if (scrollY < 50 && e.deltaY > 0 && !isScrolling && !videoState.isPlaying) {
        e.preventDefault();
        isScrolling = true;
        
        // console.log('🔄 Wheel down detected, snapping to section');
        window.scrollTo({
          top: sectionHeight,
          behavior: 'smooth'
        });
        
        setTimeout(() => {
          openVideo(true);
          isScrolling = false;
        }, 500);
      }
      // If we're at the section and user scrolls up, snap back to top
      else if (scrollY >= sectionHeight - 100 && e.deltaY < 0 && !isScrolling && videoState.isPlaying) {
        e.preventDefault();
        closeVideo('wheel-up');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [videoState, openVideo, isClosing, closeVideo]);

  // Add state change logging
  // useEffect(() => {
  //   console.log('🔄 VideoState changed to:', videoState);
  // }, [videoState]);

  return (
    <div className="px-4 py-0.5 max-w-screen-2xl mx-auto h-[calc(100vh-120px)]">
      <div className="relative overflow-hidden py-12 md:py-18 text-center bg-secondary rounded-2xl h-full">
        <div
          aria-hidden="true"
          className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-full h-1/2 bg-primary rounded-full blur-[100px] opacity-60"
        />

        <div className={`relative z-10 flex flex-col h-full transition-all duration-700 ease-in-out ${videoState.isPlaying ? 'opacity-0 transform -translate-y-8' : 'opacity-100 transform translate-y-0'}`}>
          <div className="flex-1 flex flex-col justify-center items-center text-center px-4 pb-8 md:pb-12">
            <h1 className="text-4xl md:text-7xl font-sora font-semibold text-white mb-6">
              {content.hero.title}
            </h1>
            <p className="text-md md:text-xl font-sora font-semibold text-gray-text mb-6">
              {content.hero.subtitle}
            </p>
            <Link 
              to="/features"
              className="border-1 border-primary text-gray-300 hover:text-white py-2 px-4 rounded-[8px] font-source-code-pro inline-block transition-colors"
            >
              {content.hero.ctaButton}
            </Link>
          </div>
          
          <div className="pb-8 md:pb-12 px-4">
            <div 
              className="w-[95%] md:w-full max-w-5xl mx-auto cursor-pointer"
              onClick={() => openVideo(false)}
            >
              <div className="relative aspect-video bg-[#242222]/70 border border-[#5B5B5B] rounded-xl flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full">
                  <img 
                    src={`https://videodelivery.net/${content.hero.videoId}/thumbnails/thumbnail.jpg?time=3s&height=720&fit=crop`}
                    alt="Video preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center hover:bg-black/40 transition-colors">
                    <div className="bg-black/60 rounded-full p-4 hover:bg-black/70 transition-colors">
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {videoState.isPlaying && (
          <div 
            className="fixed inset-0 z-20 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={(e) => {
              // console.log('🖱️ Backdrop clicked');
              // console.log('e.target:', e.target);
              // console.log('e.currentTarget:', e.currentTarget);
              // console.log('Are they equal?', e.target === e.currentTarget);
              
              if (e.target === e.currentTarget) {
                // console.log('✅ Valid backdrop click, closing video');
                closeVideo('backdrop');
              } else {
                // console.log('❌ Invalid backdrop click, ignoring');
              }
            }}
          >
            <div 
              className="relative w-full max-w-5xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={(e) => {
                  // console.log('🖱️ Close button clicked');
                  e.preventDefault();
                  e.stopPropagation();
                  closeVideo('close-button');
                }}
                className="absolute top-4 right-4 z-30 text-white hover:text-gray-300 bg-black/50 rounded-full p-2 transition-colors duration-200"
                aria-label="Close video"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <iframe
                src={`https://iframe.videodelivery.net/${content.hero.videoId}?controls=true&autoplay=true&muted=true`}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                allowFullScreen
                className="w-full h-full rounded-xl"
                style={{ border: 'none', width: '100%', height: '100%' }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
