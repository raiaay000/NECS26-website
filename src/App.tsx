import React, { useState, useRef, useEffect } from 'react';
import { ToastProvider } from './components/ui/toast';
import { Home } from './components/Home';
import { Games } from './components/Games';
import { ValorantPage } from './components/ValorantPage';
import { RocketLeaguePage } from './components/RocketLeaguePage';
import { SuperSmashBrosPage } from './components/SuperSmashBrosPage';
import { Teams } from './components/Teams';
import { Schedule } from './components/Schedule';
import { Brackets } from './components/Brackets';
import { Merch } from './components/Merch';
import { Tickets } from './components/Tickets';
import { Venue } from './components/Venue';
import { FoodMenu } from './components/FoodMenu';
import { MusicPlaylist } from './components/MusicPlaylist';
import { Watch } from './components/Watch';
import { Help } from './components/Help';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { Profile } from './components/Profile';
import { Reminders } from './components/Reminders';
import { Settings } from './components/Settings';
import { Onboarding } from './components/Onboarding';
import { AuthModal } from './components/shared/AuthModal';
import { UserMenu } from './components/shared/UserMenu';
import { Home as HomeIcon, Users, Calendar, ShoppingBag, MapPin, Utensils, Music, Menu, X, ShoppingCart, Ticket, Trophy, Gamepad2, LogIn, Video, HelpCircle } from 'lucide-react';

interface CartItem { id: string; name: string; price: number; quantity: number; type: 'ticket' | 'merch'; }

const navItems = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'games', label: 'Games', icon: Gamepad2 },
  { id: 'teams', label: 'Teams', icon: Users },
  { id: 'schedule', label: 'Schedule', icon: Calendar },
  { id: 'brackets', label: 'Brackets', icon: Trophy },
  { id: 'tickets', label: 'Tickets', icon: Ticket },
  { id: 'merch', label: 'Shop', icon: ShoppingBag },
  { id: 'venue', label: 'Venue', icon: MapPin },
  { id: 'food', label: 'Complimentary Food', icon: Utensils },
  { id: 'music', label: 'Music', icon: Music },
  { id: 'watch', label: 'Watch', icon: Video },
  { id: 'help', label: 'Help', icon: HelpCircle },
];

const gameMap: Record<string, string> = {
  'Valorant': 'valorant',
  'Rocket League': 'rocketleague',
  'Super Smash Bros': 'supersmashbros'
};

function AppContent() {
  const [page, setPage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkout, setCheckout] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isGuest, setIsGuest] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [mainFadeIn, setMainFadeIn] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hasCompleted = localStorage.getItem('necs2026_onboarding_completed');
    if (!hasCompleted) setShowOnboarding(true);
    else setMainFadeIn(true);
  }, []);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, checkout]);

  const nav = (id: string) => { setPage(id); setSidebarOpen(false); setCheckout(false); setCartOpen(false); };
  
  const addToCart = (item: { id: string; name: string; price: number; type: 'ticket' | 'merch'; quantity: number }) => {
    const existing = cart.find(c => c.id === item.id);
    setCart(existing ? cart.map(c => c.id === item.id ? { ...c, quantity: c.quantity + item.quantity } : c) : [...cart, item]);
  };

  const updateQty = (id: string, quantity: number) => setCart(cart.map(i => i.id === id ? { ...i, quantity } : i));
  const removeItem = (id: string) => setCart(cart.filter(i => i.id !== id));
  const clearCart = () => setCart([]);
  const handleCheckout = () => { setCheckout(true); setCartOpen(false); };
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogin = (email: string) => {
    setIsLoggedIn(true);
    setUserName(email.split('@')[0]);
    setLoginOpen(false);
  };

  const handleSignup = (email: string, _password: string, name: string) => {
    setIsLoggedIn(true);
    setUserName(name || email.split('@')[0]);
    setLoginOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsGuest(false);
    setUserName('');
    setUserMenuOpen(false);
  };

  const handleGuest = () => {
    setIsGuest(true);
    setUserName('Guest');
    setLoginOpen(false);
  };

  const pages: Record<string, JSX.Element> = {
    home: <Home onNavigate={nav} />,
    games: <Games onGameSelect={(game) => nav(gameMap[game])} />,
    teams: <Teams />,
    schedule: <Schedule />,
    tickets: <Tickets onAddToCart={addToCart} />,
    merch: <Merch onAddToCart={addToCart} />,
    venue: <Venue />,
    food: <FoodMenu />,
    music: <MusicPlaylist />,
    brackets: <Brackets />,
    valorant: <ValorantPage onBack={() => nav('games')} />,
    rocketleague: <RocketLeaguePage onBack={() => nav('games')} />,
    supersmashbros: <SuperSmashBrosPage onBack={() => nav('games')} />,
    profile: <Profile userName={userName} isGuest={isGuest} />,
    reminders: <Reminders isGuest={isGuest} />,
    settings: <Settings isGuest={isGuest} />,
    watch: <Watch />,
    help: <Help />
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {showOnboarding && <Onboarding onComplete={() => { setShowOnboarding(false); setTimeout(() => setMainFadeIn(true), 100); }} />}
      
      <div className={`contents transition-opacity duration-700 ${mainFadeIn ? 'opacity-100' : 'opacity-0'}`}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="fixed top-4 left-4 z-50 w-12 h-12 bg-[#0a0a0a]/80 backdrop-blur-md border border-[#1a1a1a]/50 rounded-lg flex items-center justify-center hover:bg-[#1a1a1a]/80 transition-colors">
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {isLoggedIn || isGuest ? (
          <UserMenu 
            userName={userName}
            isGuest={isGuest}
            isOpen={userMenuOpen}
            onToggle={() => setUserMenuOpen(!userMenuOpen)}
            onNavigate={nav}
            onLogout={handleLogout}
          />
        ) : (
          <button onClick={() => setLoginOpen(true)} className="fixed top-4 right-4 z-50 h-12 px-6 bg-[#2f6bff] hover:bg-[#2557d6] rounded-lg flex items-center gap-2 transition-all font-semibold">
            <LogIn className="w-5 h-5" />
            <span>Login</span>
          </button>
        )}

        {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30" onClick={() => setSidebarOpen(false)} />}
        {cartOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setCartOpen(false)} />}

        {loginOpen && <AuthModal onLogin={handleLogin} onSignup={handleSignup} onGuest={handleGuest} onClose={() => setLoginOpen(false)} />}

        <div className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#0a0a0a] border-l border-[#1a1a1a] z-50 transition-transform duration-300 ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <Cart cart={cart} onUpdateQuantity={updateQty} onRemoveItem={removeItem} onCheckout={handleCheckout} onClose={() => setCartOpen(false)} />
        </div>

        <aside className={`fixed h-full bg-[#0a0a0a] border-r border-[#1a1a1a] flex flex-col py-8 gap-2 z-40 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-64`}>
          <div className="mb-8 px-4 flex items-center justify-center">
            <div className="text-[#2f6bff] font-bold text-xl text-center">NECS 2026</div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <button key={item.id} onClick={() => nav(item.id)} className={`mx-4 h-12 rounded-lg flex items-center gap-3 px-4 transition-all mb-2 ${page === item.id ? 'bg-[#2f6bff] text-white' : 'text-gray-500 hover:text-white hover:bg-[#1a1a1a]'}`} title={item.label}>
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-auto pt-4 border-t border-[#1a1a1a] px-4">
            <button onClick={() => setCartOpen(true)} className="w-full h-12 rounded-lg flex items-center gap-3 px-4 bg-[#1a1a1a] hover:bg-[#2f6bff] text-white transition-all relative">
              <ShoppingCart className="w-5 h-5 flex-shrink-0" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="ml-auto bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto" ref={mainRef}>
          {checkout ? <Checkout cart={cart} onBack={() => setCheckout(false)} onClearCart={clearCart} /> : pages[page] || pages.home}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}