import React, { useState } from 'react';
import { User, Mail, Calendar, Shield, Save } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useToast } from './ui/toast';

interface ProfileProps {
  userName: string;
  isGuest: boolean;
}

export function Profile({ userName, isGuest }: ProfileProps) {
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userName,
    email: `${userName.toLowerCase()}@example.com`,
    joinDate: 'February 5, 2026',
    bio: 'Esports enthusiast and NECS 2026 attendee',
  });

  const headerRef = useScrollAnimation();
  const profileCardRef = useScrollAnimation();
  const statsRef = useScrollAnimation();

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const stats = [
    { label: 'Tickets Purchased', value: '2', icon: '🎫' },
    { label: 'Merch Items', value: '5', icon: '🛍️' },
    { label: 'Reminders Set', value: '8', icon: '🔔' },
    { label: 'Favorite Teams', value: '3', icon: '⭐' },
  ];

  if (isGuest) {
    return (
      <div className="min-h-screen pt-20 px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <User className="w-20 h-20 mx-auto mb-6 text-gray-600" />
            <h2 className="text-3xl font-bold mb-4">Guest Profile</h2>
            <p className="text-gray-400 mb-8">
              Create an account to access your full profile and track your NECS 2026 experience
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
          <h1 className="text-5xl font-bold mb-4">My Profile</h1>
          <p className="text-gray-400 mb-8">Manage your NECS 2026 account</p>
        </div>

        {/* Profile Card */}
        <div ref={profileCardRef.ref} className={`transition-all duration-700 ${profileCardRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-8 mb-8">
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-[#2f6bff] to-[#1a4fd6] rounded-full flex items-center justify-center text-4xl font-bold">
                  {formData.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">{formData.name}</h2>
                  <p className="text-gray-400 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {formData.email}
                  </p>
                  <p className="text-gray-500 text-sm flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4" />
                    Joined {formData.joinDate}
                  </p>
                </div>
              </div>
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="bg-[#2f6bff] px-6 py-2 rounded-lg font-semibold hover:bg-[#2557d6] transition-all flex items-center gap-2"
              >
                {isEditing ? (
                  <>
                    <Save className="w-4 h-4" />
                    Save
                  </>
                ) : (
                  'Edit Profile'
                )}
              </button>
            </div>

            {/* Profile Form */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Display Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#2f6bff] focus:outline-none"
                  />
                ) : (
                  <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white">
                    {formData.name}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#2f6bff] focus:outline-none"
                  />
                ) : (
                  <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white">
                    {formData.email}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Bio</label>
                {isEditing ? (
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={3}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#2f6bff] focus:outline-none resize-none"
                  />
                ) : (
                  <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white">
                    {formData.bio}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div ref={statsRef.ref} className={`transition-all duration-700 ${statsRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-bold mb-6">Account Stats</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6 hover:border-[#2f6bff] transition-all"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold mb-1 text-[#2f6bff]">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Security Section */}
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-[#2f6bff]" />
              <h3 className="text-2xl font-bold">Security</h3>
            </div>
            <div className="space-y-4">
              <button className="w-full bg-[#1a1a1a] px-6 py-3 rounded-lg text-left hover:bg-[#2a2a2a] transition-all">
                <div className="font-semibold mb-1">Change Password</div>
                <div className="text-sm text-gray-400">Update your password to keep your account secure</div>
              </button>
              <button className="w-full bg-[#1a1a1a] px-6 py-3 rounded-lg text-left hover:bg-[#2a2a2a] transition-all">
                <div className="font-semibold mb-1">Two-Factor Authentication</div>
                <div className="text-sm text-gray-400">Add an extra layer of security to your account</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}