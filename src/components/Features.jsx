import React from 'react';
import { content } from '../config/content';
import FeatureCard from './FeatureCard';

const Features = () => {
  return (
    <div className="min-h-[calc(100vh-120px)] md:h-[calc(100vh-120px)] bg-black text-white px-4 flex flex-col">
      <div className="w-full h-full flex flex-col max-w-screen-2xl mx-auto">
        {/* Features Layout */}
        <div className="flex-1 flex flex-col gap-4 md:gap-6 pt-4 md:pt-6 pb-6 md:pb-0">
          {/* Large Feature Card */}
          <FeatureCard 
            feature={content.features.mainFeature}
            size="large"
            gradientColors={["EB25CE", "FFE058"]}
          />
          
          {/* Two Smaller Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 md:flex-1">
            <FeatureCard 
              feature={content.features.subFeatures[0]}
              size="small"
              gradientColors={["3B82F6", "8B5CF6"]}
            />
            <FeatureCard 
              feature={content.features.subFeatures[1]}
              size="small"
              gradientColors={["10B981", "06B6D4"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;