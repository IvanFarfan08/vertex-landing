import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEmailSuccess, setShowEmailSuccess] = useState(false);
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
      
      // Check if user just confirmed their email
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('type') === 'signup' || urlParams.get('confirmed') === 'true') {
        setShowEmailSuccess(true);
        // Show success message for a few seconds
        setTimeout(() => {
          setShowEmailSuccess(false);
          // Clean up URL parameters
          window.history.replaceState({}, document.title, window.location.pathname);
        }, 5000);
      }
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate('/login');
      } else if (session?.user) {
        setUser(session.user);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const getUserDisplayName = (user) => {
    if (!user) return '';
    
    // Check if user signed up with Discord and has username in metadata
    if (user.app_metadata?.provider === 'discord' && user.user_metadata?.user_name) {
      return user.user_metadata.user_name;
    }
    
    // Check alternative Discord username fields
    if (user.app_metadata?.provider === 'discord' && user.user_metadata?.preferred_username) {
      return user.user_metadata.preferred_username;
    }
    
    // Check for display name or full name
    if (user.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    
    // Fallback to email
    return user.email;
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

  return (
    <div className="px-4 py-0.5 max-w-screen-2xl mx-auto h-[calc(100vh-120px)]">
      <div className="relative overflow-hidden bg-secondary rounded-2xl h-full flex items-center justify-center border border-[#5B5B5B]">
        {/* Centered gradient */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-primary rounded-full blur-[150px]"
        />
        
        {/* Dashboard content */}
        <div className="relative z-10 text-center space-y-8 max-w-2xl mx-auto px-8">
          {/* Email verification success banner */}
          {showEmailSuccess && (
            <div className="bg-green-900/20 backdrop-blur border border-green-500/30 rounded-xl p-6 mb-8 animate-fade-in">
              <div className="flex items-center justify-center mb-3">
                <div className="bg-green-500 rounded-full p-2 mr-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-400 font-sora">
                  {new URLSearchParams(window.location.search).get('type') === 'recovery' 
                    ? 'Password Reset Complete!' 
                    : 'Email Verified Successfully!'}
                </h3>
              </div>
              <p className="text-green-300 font-sora">
                {new URLSearchParams(window.location.search).get('type') === 'recovery'
                  ? 'Your password has been successfully updated. You can now use your new password to sign in.'
                  : 'Welcome to Vertex 3D! Your account is now fully activated and ready to use.'}
              </p>
            </div>
          )}
          
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white font-sora mb-4">
              Hello, {getUserDisplayName(user)}
            </h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="bg-black/30 backdrop-blur border border-white/10 rounded-xl p-6 hover:border-primary/30 transition-colors cursor-pointer">
              <h3 className="text-xl font-bold text-white font-sora mb-2">
                Manage Subscription
              </h3>
              <p className="text-gray-400 font-sora">
                View and manage your billing
              </p>
            </div>
            
            <Link to="/dashboard/installation-guide" className="bg-black/30 backdrop-blur border border-white/10 rounded-xl p-6 hover:border-primary/30 transition-colors cursor-pointer block">
              <h3 className="text-xl font-bold text-white font-sora mb-2">
                Installation Guide
              </h3>
              <p className="text-gray-400 font-sora">
                Learn how to install the Blender add-on
              </p>
            </Link>
            
            <div className="bg-black/30 backdrop-blur border border-white/10 rounded-xl p-6 hover:border-primary/30 transition-colors cursor-pointer">
              <h3 className="text-xl font-bold text-white font-sora mb-2">
                See API Key
              </h3>
              <p className="text-gray-400 font-sora">
                Access your API credentials
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;