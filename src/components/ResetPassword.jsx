import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validSession, setValidSession] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has a valid session for password reset
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // No session means invalid or expired reset link
        navigate('/login');
        return;
      }
      
      setValidSession(true);
    };

    checkSession();
  }, [navigate]);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;
      
      // Redirect to dashboard with success message
      navigate('/dashboard?type=recovery&confirmed=true');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!validSession) {
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
      <div className="relative overflow-hidden bg-secondary rounded-2xl h-full flex border border-[#5B5B5B]">
        {/* Left section with gradient - 33% */}
        <div className="relative w-1/3 h-full overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute top-1/2 -left-1/2 -translate-y-1/2 w-full h-1/2 bg-primary rounded-full blur-[150px]"
          />
        </div>
        
        {/* Vertical divider */}
        <div className="w-[1px] h-full bg-[#5B5B5B]" />
        
        {/* Right section with form - 66% */}
        <div className="relative flex-1 h-full flex items-center justify-center">
          <div className="max-w-md w-full px-8 space-y-8">
            <div>
              <h2 className="text-center text-3xl font-extrabold text-white font-sora">
                Set New Password
              </h2>
              <p className="mt-2 text-center text-sm text-gray-400 font-sora">
                Enter your new password below
              </p>
            </div>
            
            <form className="space-y-6" onSubmit={handlePasswordUpdate}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="password" className="sr-only">
                    New Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-white/10 placeholder-gray-400 text-white rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-black/30 backdrop-blur"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="sr-only">
                    Confirm New Password
                  </label>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-white/10 placeholder-gray-400 text-white rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-black/30 backdrop-blur"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-md bg-red-900/20 p-4 border border-red-500/20">
                  <p className="text-sm text-red-400 font-sora">{error}</p>
                </div>
              )}

              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="font-sora">{loading ? 'Updating password...' : 'Update Password'}</span>
                </button>
                
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="text-sm text-gray-400 hover:text-white font-sora transition-colors"
                  >
                    Back to login
                  </button>
                </div>
              </div>

              <div className="bg-green-900/20 backdrop-blur border border-green-500/20 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-green-400 font-sora mb-2">
                  Password Requirements:
                </h3>
                <ul className="text-xs text-green-300 font-sora space-y-1">
                  <li>• At least 6 characters long</li>
                  <li>• Use a mix of letters, numbers, and symbols</li>
                  <li>• Don't reuse old passwords</li>
                  <li>• Make it unique and memorable</li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;