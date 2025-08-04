import React from 'react';

const PriceCard = ({ plan, gradientColor }) => {
  const hoverColor = `#${gradientColor}`;
  return (
    <div className="relative overflow-hidden text-left bg-secondary rounded-3xl border border-[#5B5B5B] w-full max-w-sm h-[550px] p-7 flex-shrink-0">
      {/* Gradient - custom color for each card */}
      <div
        aria-hidden="true"
        className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-full h-1/2 rounded-full blur-[100px] opacity-60"
        style={{
          backgroundColor: `#${gradientColor}`
        }}
      />
      
      <div className="relative z-10 h-full flex flex-col">
        {/* Plan Name */}
        <h3 className="text-2xl font-source-code-pro text-white mb-8">
          {plan.name}
        </h3>
        
        {/* Price */}
        <div className="mb-12">
          <div className="flex items-baseline">
            <span className="text-6xl font-source-code-pro text-white">
              ${plan.price}
            </span>
            <span className="text-lg font-source-code-pro text-gray-300 ml-2">
              / {plan.unit}
            </span>
          </div>
        </div>
        
        {/* Separator Line */}
        <hr className="border-[#5B5B5B] mb-8" />
        
        {/* Description */}
        <div className="text-base text-gray-300 font-source-code-pro leading-relaxed flex-1 mb-6">
          {plan.description.split('**').map((part, index) => 
            index % 2 === 1 ? (
              <span key={index} className="text-white font-bold">{part}</span>
            ) : (
              <span key={index}>{part}</span>
            )
          )}
        </div>

        {/* Button for paid plans */}
        {plan.buttonText && (
          <button 
            className="border border-gray-300 text-gray-300 py-3 px-6 rounded-[8px] font-source-code-pro text-[14px] transition-all duration-200 w-full hover:shadow-lg"
            style={{
              '--hover-color': hoverColor
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = hoverColor;
              e.target.style.color = hoverColor;
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '';
              e.target.style.color = '';
            }}
          >
            {plan.buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default PriceCard;