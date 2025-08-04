import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

// Placeholder data - replace with actual content
const installationSteps = [
  {
    id: 1,
    screenshot: "https://via.placeholder.com/800x400/333/fff?text=Step+1+Screenshot",
    title: "Download the Blender Add-on",
    description: "Download the latest version of the Vertex 3D Blender add-on from your dashboard. Make sure to save it in a location you can easily find."
  },
  {
    id: 2,
    screenshot: "https://via.placeholder.com/800x400/333/fff?text=Step+2+Screenshot", 
    title: "Open Blender Preferences",
    description: "In Blender, go to Edit > Preferences (or Blender > Preferences on Mac). This will open the Blender Preferences window where you can manage add-ons."
  },
  {
    id: 3,
    screenshot: "https://via.placeholder.com/800x400/333/fff?text=Step+3+Screenshot",
    title: "Navigate to Add-ons Section",
    description: "Click on the 'Add-ons' tab in the left sidebar of the Preferences window. This is where you can install and manage all your Blender add-ons."
  },
  {
    id: 4,
    screenshot: "https://via.placeholder.com/800x400/333/fff?text=Step+4+Screenshot",
    title: "Install from File",
    description: "Click the 'Install...' button at the top right of the Add-ons section. Browse to the location where you saved the Vertex 3D add-on file and select it."
  },
  {
    id: 5,
    screenshot: "https://via.placeholder.com/800x400/333/fff?text=Step+5+Screenshot",
    title: "Enable the Add-on",
    description: "After installation, search for 'Vertex 3D' in the add-ons list and check the box next to it to enable the add-on. You should now see it in your N-panel in Blender."
  }
];

function InstallationGuide() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }
      setUser(user);
      setLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const nextStep = () => {
    if (currentStep < installationSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  if (loading) {
    return (
      <div className="px-4 py-0.5 max-w-screen-2xl mx-auto h-[calc(100vh-120px)]">
        <div className="relative overflow-hidden bg-secondary rounded-2xl h-full flex items-center justify-center border border-[#5B5B5B]">
          <div className="text-white font-sora">Loading...</div>
        </div>
      </div>
    );
  }

  const currentStepData = installationSteps[currentStep];

  return (
    <div className="px-4 py-0.5 max-w-screen-2xl mx-auto h-[calc(100vh-120px)]">
      <div className="relative overflow-hidden bg-secondary rounded-2xl h-full flex items-center justify-center border border-[#5B5B5B]">
        {/* Centered gradient */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-primary rounded-full blur-[150px]"
        />
        
        {/* Installation Guide content */}
        <div className="relative z-10 w-full h-full flex flex-col px-8 py-8">
          {/* Header with back button only */}
          <div className="flex justify-start mb-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center text-primary hover:text-primary/80 font-sora text-sm transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </button>
          </div>

          {/* Screenshot */}
          <div className="flex-1 flex items-center justify-center mb-6">
            <img
              src={currentStepData.screenshot}
              alt={`Installation step ${currentStep + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg border border-white/10"
            />
          </div>

          {/* Step Content */}
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-white font-sora mb-4">
              {currentStepData.title}
            </h2>
            <p className="text-gray-300 font-sora text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
              {currentStepData.description}
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            {/* Previous Button */}
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-sora text-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            {/* Progress Indicators */}
            <div className="flex space-x-1 md:space-x-2">
              {installationSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToStep(index)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
                    index === currentStep
                      ? 'bg-primary'
                      : index < currentStep
                      ? 'bg-primary/60'
                      : 'bg-white/20'
                  }`}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextStep}
              disabled={currentStep === installationSteps.length - 1}
              className="flex items-center px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-sora text-sm"
            >
              Next
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstallationGuide;