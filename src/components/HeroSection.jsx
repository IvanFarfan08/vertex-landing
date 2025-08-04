import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { content } from '../config/content';

const HeroSection = () => {
  const [videoPlayed, setVideoPlayed] = useState(false);

  const handleCloseVideo = (e) => {
    e.stopPropagation();
    setVideoPlayed(false);
  };

  return (
    <div className="px-4 py-0.5 max-w-screen-2xl mx-auto h-[calc(100vh-120px)]">
      <div className="relative overflow-hidden py-12 md:py-18 text-center bg-secondary rounded-2xl h-full">
        <div
          aria-hidden="true"
          className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-full h-1/2 bg-primary rounded-full blur-[100px] opacity-60"
        />

        <div className={`relative z-10 flex flex-col h-full transition-opacity duration-500 ease-in-out ${videoPlayed ? 'opacity-0' : 'opacity-100'}`}>
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
              onClick={() => setVideoPlayed(true)}
            >
              <div className="relative aspect-video bg-[#242222]/70 border border-[#5B5B5B] rounded-xl flex items-center justify-center overflow-hidden">
                {videoPlayed ? (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setVideoPlayed(false);
                      }}
                      className="absolute top-4 right-4 z-30 text-white hover:text-gray-300 bg-black/50 rounded-full p-2"
                      aria-label="Close video"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                    <iframe
                      src={`https://iframe.videodelivery.net/${content.hero.videoId}?controls=true&autoplay=true&muted=true`}
                      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                      allowFullScreen
                      className="w-full h-full"
                      style={{ border: 'none', width: '100%', height: '100%' }}
                    />
                  </>
                ) : (
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
                )}
              </div>
            </div>
          </div>
        </div>

        {videoPlayed && (
          <div 
            className="fixed inset-0 z-20 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setVideoPlayed(false)}
          >
            <div 
              className="relative w-full max-w-5xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setVideoPlayed(false)}
                className="absolute top-4 right-4 z-30 text-white hover:text-gray-300 bg-black/50 rounded-full p-2"
                aria-label="Close video"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
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
