import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Moon, Globe, Lock, Eye, EyeOff, Trash2 } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useToast } from './ui/toast';

interface SettingsProps {
  isGuest: boolean;
}

export function Settings({ isGuest }: SettingsProps) {
  const toast = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [reminderTime, setReminderTime] = useState('30');
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('en');
  const [showPassword, setShowPassword] = useState(false);

  const headerRef = useScrollAnimation();
  const notificationsRef = useScrollAnimation();
  const appearanceRef = useScrollAnimation();
  const securityRef = useScrollAnimation();
  const dangerRef = useScrollAnimation();

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  if (isGuest) {
    return (
      <div className="min-h-screen pt-20 px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <SettingsIcon className="w-20 h-20 mx-auto mb-6 text-gray-600" />
            <h2 className="text-3xl font-bold mb-4">Guest Access</h2>
            <p className="text-gray-400 mb-8">
              Create an account to customize your settings and preferences
            </p>
            <button className="bg-[#2f6bff] px-8 py-3 rounded-lg font-bold hover:bg-[#2557d6] transition-all">
              Create Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-8 pb-8">
      <div className="max-w-4xl mx-auto">
        <div ref={headerRef.ref} className={`transition-all duration-700 ${headerRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl font-bold mb-4">Settings</h1>
          <p className="text-gray-400 mb-8">Manage your account preferences and settings</p>
        </div>

        {/* Notifications Settings */}
        <div ref={notificationsRef.ref} className={`transition-all duration-700 mb-8 ${notificationsRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6 text-[#2f6bff]" />
              <h2 className="text-2xl font-bold">Notifications</h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold mb-1">Email Notifications</div>
                  <div className="text-sm text-gray-400">Receive match reminders via email</div>
                </div>
                <button
                  onClick={() => {
                    setEmailNotifications(!emailNotifications);
                    toast.success(`Email notifications ${!emailNotifications ? 'enabled' : 'disabled'}`);
                  }}
                  className={`relative w-14 h-8 rounded-full transition-all ${
                    emailNotifications ? 'bg-[#2f6bff]' : 'bg-[#1a1a1a]'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      emailNotifications ? 'translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold mb-1">Push Notifications</div>
                  <div className="text-sm text-gray-400">Get browser push notifications</div>
                </div>
                <button
                  onClick={() => {
                    setPushNotifications(!pushNotifications);
                    toast.success(`Push notifications ${!pushNotifications ? 'enabled' : 'disabled'}`);
                  }}
                  className={`relative w-14 h-8 rounded-full transition-all ${
                    pushNotifications ? 'bg-[#2f6bff]' : 'bg-[#1a1a1a]'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      pushNotifications ? 'translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="block font-semibold mb-3">Default Reminder Time</label>
                <select
                  value={reminderTime}
                  onChange={(e) => {
                    setReminderTime(e.target.value);
                    handleSave();
                  }}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#2f6bff] focus:outline-none"
                >
                  <option value="15">15 minutes before</option>
                  <option value="30">30 minutes before</option>
                  <option value="60">1 hour before</option>
                  <option value="120">2 hours before</option>
                  <option value="1440">1 day before</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div ref={appearanceRef.ref} className={`transition-all duration-700 mb-8 ${appearanceRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Moon className="w-6 h-6 text-[#2f6bff]" />
              <h2 className="text-2xl font-bold">Appearance</h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold mb-1">Dark Mode</div>
                  <div className="text-sm text-gray-400">Use dark theme across the site</div>
                </div>
                <button
                  onClick={() => {
                    setDarkMode(!darkMode);
                    toast.success(`Dark mode ${!darkMode ? 'enabled' : 'disabled'}`);
                  }}
                  className={`relative w-14 h-8 rounded-full transition-all ${
                    darkMode ? 'bg-[#2f6bff]' : 'bg-[#1a1a1a]'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      darkMode ? 'translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="block font-semibold mb-3 flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value);
                    handleSave();
                  }}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#2f6bff] focus:outline-none"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="ja">日本語</option>
                  <option value="ko">한국어</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div ref={securityRef.ref} className={`transition-all duration-700 mb-8 ${securityRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-[#2f6bff]" />
              <h2 className="text-2xl font-bold">Security & Privacy</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block font-semibold mb-3">Change Password</label>
                <div className="space-y-3">
                  <input
                    type="password"
                    placeholder="Current password"
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#2f6bff] focus:outline-none"
                  />
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="New password"
                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 pr-12 text-white focus:border-[#2f6bff] focus:outline-none"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#2f6bff] focus:outline-none"
                  />
                  <button
                    onClick={() => toast.success('Password updated successfully!')}
                    className="bg-[#2f6bff] px-6 py-2 rounded-lg font-semibold hover:bg-[#2557d6] transition-all"
                  >
                    Update Password
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-[#1a1a1a]">
                <button
                  onClick={() => toast.success('Two-factor authentication setup coming soon!')}
                  className="w-full bg-[#1a1a1a] px-6 py-4 rounded-lg text-left hover:bg-[#2a2a2a] transition-all"
                >
                  <div className="font-semibold mb-1">Enable Two-Factor Authentication</div>
                  <div className="text-sm text-gray-400">Add an extra layer of security to your account</div>
                </button>
              </div>

              <div>
                <button
                  onClick={() => toast.info('Privacy settings coming soon!')}
                  className="w-full bg-[#1a1a1a] px-6 py-4 rounded-lg text-left hover:bg-[#2a2a2a] transition-all"
                >
                  <div className="font-semibold mb-1">Privacy Settings</div>
                  <div className="text-sm text-gray-400">Manage your data and privacy preferences</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div ref={dangerRef.ref} className={`transition-all duration-700 ${dangerRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-[#0a0a0a] border border-red-900/30 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Trash2 className="w-6 h-6 text-red-400" />
              <h2 className="text-2xl font-bold text-red-400">Danger Zone</h2>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to clear all your data? This action cannot be undone.')) {
                    toast.success('All data cleared');
                  }
                }}
                className="w-full bg-red-900/20 border border-red-900/30 px-6 py-4 rounded-lg text-left hover:bg-red-900/30 transition-all"
              >
                <div className="font-semibold mb-1 text-red-400">Clear All Data</div>
                <div className="text-sm text-gray-400">Remove all your reminders, purchases, and preferences</div>
              </button>

              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                    toast.error('Account deleted');
                  }
                }}
                className="w-full bg-red-900/20 border border-red-900/30 px-6 py-4 rounded-lg text-left hover:bg-red-900/30 transition-all"
              >
                <div className="font-semibold mb-1 text-red-400">Delete Account</div>
                <div className="text-sm text-gray-400">Permanently delete your account and all associated data</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}