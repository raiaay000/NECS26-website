import { X, LogIn, User } from 'lucide-react';
import { useState } from 'react';

interface AuthModalProps {
  onLogin: (email: string, password: string) => void;
  onSignup: (email: string, password: string, name: string) => void;
  onGuest: () => void;
  onClose: () => void;
}

export function AuthModal({ onLogin, onSignup, onGuest, onClose }: AuthModalProps) {
  const [showSignup, setShowSignup] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (showSignup) {
      onSignup(
        formData.get('email') as string,
        formData.get('password') as string,
        formData.get('name') as string
      );
    } else {
      onLogin(
        formData.get('email') as string,
        formData.get('password') as string
      );
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-8 w-full max-w-md relative animate-[fadeIn_0.2s_ease-out]">
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-[#1a1a1a] rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">{showSignup ? 'Create Account' : 'Welcome Back'}</h2>
            <p className="text-gray-400">{showSignup ? 'Join NECS 2026 today' : 'Login to your NECS 2026 account'}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4 mb-6">
              {showSignup && (
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Name</label>
                  <input type="text" name="name" required className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#2f6bff] focus:outline-none transition-colors" placeholder="Your name" />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                <input type="email" name="email" required className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#2f6bff] focus:outline-none transition-colors" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Password</label>
                <input type="password" name="password" required minLength={showSignup ? 8 : 0} className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#2f6bff] focus:outline-none transition-colors" placeholder={showSignup ? "At least 8 characters" : "••••••••"} />
              </div>
            </div>

            <button type="submit" className="w-full bg-[#2f6bff] py-3 rounded-lg font-bold hover:bg-[#2557d6] transition-all flex items-center justify-center gap-2">
              {showSignup ? <User className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
              {showSignup ? 'Create Account' : 'Login'}
            </button>

            <button type="button" onClick={onGuest} className="w-full mt-3 bg-[#1a1a1a] py-3 rounded-lg font-bold hover:bg-[#2a2a2a] transition-all">
              Continue as Guest
            </button>

            {!showSignup && (
              <div className="mt-6 text-center">
                <button type="button" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Forgot password?
                </button>
              </div>
            )}

            <div className="mt-4 text-center text-sm text-gray-400">
              {showSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button type="button" onClick={() => setShowSignup(!showSignup)} className="text-[#2f6bff] hover:text-[#2557d6] transition-colors">
                {showSignup ? 'Sign in' : 'Sign up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
