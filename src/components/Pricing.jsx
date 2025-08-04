import React from 'react';
import { content } from '../config/content';
import PriceCard from './PriceCard';

const Pricing = () => {
  return (
    <div className="h-[calc(100vh-120px)] bg-black text-white px-4 flex flex-col overflow-hidden">
      <div className="w-full h-full flex flex-col">
        {/* Title aligned all the way to the left */}
        <div className="text-left mb-6 pt-6">
          <h1 className="text-3xl md:text-5xl font-sora font-semibold text-white">
            {content.pricing.title}
          </h1>
        </div>
        
        {/* Price Cards */}
        <div className="flex justify-center gap-8 flex-nowrap flex-1 items-center overflow-x-auto">
          <PriceCard 
            plan={content.pricing.plans[0]} 
            gradientColor="EB25CE"
          />
          <PriceCard 
            plan={content.pricing.plans[1]} 
            gradientColor="FFE058"
          />
          <PriceCard 
            plan={content.pricing.plans[2]} 
            gradientColor="9DD089"
          />
        </div>
      </div>
    </div>
  );
};

export default Pricing;