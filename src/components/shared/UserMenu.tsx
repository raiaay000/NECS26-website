import { User, ChevronDown, Bell, Settings, LogOut } from 'lucide-react';

interface UserMenuProps {
  userName: string;
  isGuest: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function UserMenu({ userName, isGuest, isOpen, onToggle, onNavigate, onLogout }: UserMenuProps) {
  const menuItems = [
    { icon: User, label: 'Profile', page: 'profile' },
    { icon: Bell, label: 'Reminders', page: 'reminders' },
    { icon: Settings, label: 'Settings', page: 'settings', border: true }
  ];

  return (
    <div className="fixed top-4 right-4 z-50">
      <button onClick={onToggle} className="h-12 px-4 bg-[#0a0a0a]/80 backdrop-blur-md border border-[#1a1a1a]/50 rounded-lg flex items-center gap-2 hover:bg-[#1a1a1a]/80 transition-colors">
        <User className="w-5 h-5" />
        <span className="text-sm">{userName}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onToggle} />
          <div className="absolute right-0 mt-2 w-56 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg shadow-xl overflow-hidden z-50 animate-[fadeIn_0.2s_ease-out]">
            <div className="px-4 py-4 border-b border-[#1a1a1a] bg-[#0f0f0f]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#2f6bff] flex items-center justify-center text-white font-bold text-lg">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white truncate">{userName}</div>
                  <div className="text-xs text-gray-400">{isGuest ? 'Guest User' : 'View Profile'}</div>
                </div>
              </div>
            </div>

            {!isGuest && menuItems.map(item => (
              <button
                key={item.page}
                onClick={() => { onToggle(); onNavigate(item.page); }}
                className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-[#1a1a1a] transition-colors text-left ${item.border ? 'border-t border-[#1a1a1a]' : ''}`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}

            <button onClick={onLogout} className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-900/20 transition-colors text-left text-red-400 border-t border-[#1a1a1a]">
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
