import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import vertexLogo from '../assets/logos/vertex_logo_w_text.png';
import { content } from '../config/content';
import { supabase } from '../lib/supabase';

const Navbar = () => {
  const [showSocials, setShowSocials] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setShowUserMenu(false);
  };

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

  return (
    <div className="p-4 fixed top-0 left-0 right-0 z-50"> 
      <nav className="flex justify-between items-center p-4 bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl h-15 relative">
        <div>
          <Link to="/">
            <img src={vertexLogo} alt="Vertex Logo" className="h-9" /> 
          </Link>
        </div>
        <div className="hidden md:flex space-x-12 absolute left-1/2 transform -translate-x-1/2"> 
          <NavLink 
            to="/features" 
            className={({ isActive }) => 
              `text-gray-300 hover:text-white px-3 font-source-code-pro transition-all ${isActive ? 'text-white border-b-2 border-primary' : ''}`
            }
          >
            {content.navbar.links.features}
          </NavLink>
          <NavLink 
            to="/pricing" 
            className={({ isActive }) => 
              `text-gray-300 hover:text-white px-3 font-source-code-pro transition-all ${isActive ? 'text-white border-b-2 border-primary' : ''}`
            }
          >
            {content.navbar.links.pricing}
          </NavLink>
          <div className="relative">
            <button 
              onClick={() => setShowSocials(!showSocials)}
              onBlur={() => setTimeout(() => setShowSocials(false), 200)}
              className="text-gray-300 hover:text-white px-3 font-source-code-pro flex items-center gap-1"
            >
              {content.navbar.links.socials}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showSocials && (
              <div className="absolute top-full mt-2 w-48 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl py-2 z-50">
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 font-source-code-pro text-sm transition-colors">
                  {content.navbar.socialLinks.tiktok}
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 font-source-code-pro text-sm transition-colors">
                  {content.navbar.socialLinks.x}
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 font-source-code-pro text-sm transition-colors">
                  {content.navbar.socialLinks.linkedin}
                </a>
                <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 font-source-code-pro text-sm transition-colors">
                  {content.navbar.socialLinks.discord}
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden text-gray-300 hover:text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {user ? (
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                onBlur={() => setTimeout(() => setShowUserMenu(false), 200)}
                className="bg-primary text-black hover:bg-primary/80 py-2 px-6 rounded-[8px] font-source-code-pro text-[14px] transition-colors duration-200 flex items-center gap-2"
              >
                {getUserDisplayName(user)}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showUserMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl py-2 z-50">
                  <Link 
                    to="/dashboard" 
                    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 font-source-code-pro text-sm transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 font-source-code-pro text-sm transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink 
              to="/login" 
              className={({ isActive }) => 
                `bg-primary text-black hover:bg-primary/80 py-2 px-6 rounded-[8px] font-source-code-pro text-[14px] transition-colors duration-200 ${isActive ? 'ring-2 ring-white' : ''}`
              }
            >
              {content.navbar.loginButton}
            </NavLink>
          )}
        </div>

        {/* Mobile dropdown menu */}
        {showMobileMenu && (
          <div className="md:hidden absolute top-full left-4 right-4 mt-2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl py-4 z-50">
            <NavLink 
              to="/features" 
              className={({ isActive }) => 
                `block px-6 py-3 text-gray-300 hover:text-white hover:bg-white/10 font-source-code-pro text-sm transition-colors ${isActive ? 'text-white bg-white/10' : ''}`
              }
              onClick={() => setShowMobileMenu(false)}
            >
              {content.navbar.links.features}
            </NavLink>
            <NavLink 
              to="/pricing" 
              className={({ isActive }) => 
                `block px-6 py-3 text-gray-300 hover:text-white hover:bg-white/10 font-source-code-pro text-sm transition-colors ${isActive ? 'text-white bg-white/10' : ''}`
              }
              onClick={() => setShowMobileMenu(false)}
            >
              {content.navbar.links.pricing}
            </NavLink>
            
            {/* Mobile socials section */}
            <div className="px-6 py-2">
              <div className="text-gray-400 font-source-code-pro text-xs mb-2">SOCIALS</div>
              <div className="space-y-1">
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="block py-2 text-gray-300 hover:text-white font-source-code-pro text-sm transition-colors">
                  {content.navbar.socialLinks.tiktok}
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="block py-2 text-gray-300 hover:text-white font-source-code-pro text-sm transition-colors">
                  {content.navbar.socialLinks.x}
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="block py-2 text-gray-300 hover:text-white font-source-code-pro text-sm transition-colors">
                  {content.navbar.socialLinks.linkedin}
                </a>
                <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="block py-2 text-gray-300 hover:text-white font-source-code-pro text-sm transition-colors">
                  {content.navbar.socialLinks.discord}
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
