import React from 'react';

const FeatureCard = ({ feature, size = "small", gradientColors = ["EB25CE", "FFE058"], image = null }) => {
  const sizeClasses = size === "large" 
    ? "h-80 md:h-80" 
    : "h-60 md:h-72";

  if (size === "large" && image) {
    // Large card with image layout
    return (
      <div className={`relative overflow-hidden bg-secondary rounded-2xl border border-[#5B5B5B] ${sizeClasses}`}>
        {/* Gradient - same style as pricing cards */}
        <div
          aria-hidden="true"
          className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-full h-1/2 rounded-full blur-[100px] opacity-60"
          style={{
            background: `linear-gradient(to right, #${gradientColors[0]}, #${gradientColors[1]})`
          }}
        />
        
        {/* Content with image layout */}
        <div className="relative z-10 h-full flex">
          {/* Left side - Content */}
          <div className="flex-1 p-4 md:p-8 flex flex-col justify-center md:pr-4">
            <h3 className="text-lg md:text-2xl font-source-code-pro text-white mb-2 md:mb-4 font-semibold">
              {feature.title}
            </h3>
            <div className="text-sm md:text-base text-gray-300 font-source-code-pro leading-relaxed">
              {feature.description.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/).map((part, index) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  // Handle bold text with potential links
                  const boldContent = part.slice(2, -2);
                  const linkMatch = boldContent.match(/\[(.*?)\]\((.*?)\)/);
                  if (linkMatch) {
                    return (
                      <a 
                        key={index} 
                        href={linkMatch[2]} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white font-bold hover:text-primary transition-colors underline"
                      >
                        {linkMatch[1]}
                      </a>
                    );
                  }
                  return <span key={index} className="text-white font-bold">{boldContent}</span>;
                } else if (part.match(/\[.*?\]\(.*?\)/)) {
                  // Handle regular links
                  const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
                  return (
                    <a 
                      key={index} 
                      href={linkMatch[2]} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-white transition-colors underline"
                    >
                      {linkMatch[1]}
                    </a>
                  );
                }
                return <span key={index}>{part}</span>;
              })}
            </div>
          </div>
          
          {/* Right side - Image (hidden on mobile, visible on desktop) */}
          <div className="hidden md:block absolute bottom-0 right-2 w-2/5 h-[70%] overflow-hidden">
            <img 
              src={image} 
              alt="GTA5-Mods catalog showing vehicle variety"
              className="w-full h-[150%] object-cover object-left opacity-80 hover:opacity-90 transition-opacity rounded-t-xl"
            />
            {/* Subtle overlay to blend with card */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-secondary/20 rounded-t-xl" />
          </div>
        </div>
      </div>
    );
  }

  // Regular card layout (small cards or large without image)
  return (
    <div className={`relative overflow-hidden bg-secondary rounded-2xl border border-[#5B5B5B] ${sizeClasses} p-4 md:p-8`}>
      {/* Gradient - same style as pricing cards */}
      <div
        aria-hidden="true"
        className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-full h-1/2 rounded-full blur-[100px] opacity-60"
        style={{
          background: `linear-gradient(to right, #${gradientColors[0]}, #${gradientColors[1]})`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center">
        <h3 className="text-lg md:text-2xl font-source-code-pro text-white mb-2 md:mb-4 font-semibold">
          {feature.title}
        </h3>
        <div className="text-sm md:text-base text-gray-300 font-source-code-pro leading-relaxed">
          {feature.description.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/).map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              // Handle bold text with potential links
              const boldContent = part.slice(2, -2);
              const linkMatch = boldContent.match(/\[(.*?)\]\((.*?)\)/);
              if (linkMatch) {
                return (
                  <a 
                    key={index} 
                    href={linkMatch[2]} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white font-bold hover:text-primary transition-colors underline"
                  >
                    {linkMatch[1]}
                  </a>
                );
              }
              return <span key={index} className="text-white font-bold">{boldContent}</span>;
            } else if (part.match(/\[.*?\]\(.*?\)/)) {
              // Handle regular links
              const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
              return (
                <a 
                  key={index} 
                  href={linkMatch[2]} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-white transition-colors underline"
                >
                  {linkMatch[1]}
                </a>
              );
            }
            return <span key={index}>{part}</span>;
          })}
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;