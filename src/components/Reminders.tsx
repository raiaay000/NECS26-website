import React, { useState } from 'react';
import { Bell, Trash2, Clock, Calendar, Users } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useToast } from './ui/toast';

interface Reminder {
  id: number;
  matchId: number;
  date: string;
  time: string;
  game: string;
  team1: string;
  team2: string;
  stage: string;
  notifyTime: string;
  email: string;
}

const mockReminders: Reminder[] = [
  {
    id: 1,
    matchId: 1,
    date: 'May 6',
    time: '10:00 AM',
    game: 'Valorant',
    team1: 'Radiant Vanguard',
    team2: 'Midnight Pulse',
    stage: 'Main Stage',
    notifyTime: '30 minutes before',
    email: 'user@example.com',
  },
  {
    id: 2,
    matchId: 13,
    date: 'May 9',
    time: '12:00 PM',
    game: 'Valorant',
    team1: 'Radiant Vanguard',
    team2: 'Midnight Pulse',
    stage: 'Main Stage',
    notifyTime: '1 hour before',
    email: 'user@example.com',
  },
  {
    id: 3,
    matchId: 5,
    date: 'May 7',
    time: '10:00 AM',
    game: 'Super Smash Bros',
    team1: 'Coldfront',
    team2: 'Thunder Alloy',
    stage: 'Main Stage',
    notifyTime: '30 minutes before',
    email: 'user@example.com',
  },
  {
    id: 4,
    matchId: 16,
    date: 'May 10',
    time: '2:00 PM',
    game: 'Valorant',
    team1: 'TBD',
    team2: 'TBD',
    stage: 'Main Stage',
    notifyTime: '1 hour before',
    email: 'user@example.com',
  },
  {
    id: 5,
    matchId: 8,
    date: 'May 7',
    time: '7:00 PM',
    game: 'Rocket League',
    team1: 'Turbo Drift',
    team2: 'Emberfall',
    stage: 'Main Stage',
    notifyTime: '30 minutes before',
    email: 'user@example.com',
  },
  {
    id: 6,
    matchId: 14,
    date: 'May 9',
    time: '3:00 PM',
    game: 'Rocket League',
    team1: 'Turbo Drift',
    team2: 'Smash Legion',
    stage: 'Main Stage',
    notifyTime: '1 hour before',
    email: 'user@example.com',
  },
  {
    id: 7,
    matchId: 10,
    date: 'May 8',
    time: '2:00 PM',
    game: 'Super Smash Bros',
    team1: 'Coldfront',
    team2: 'Prism Wardens',
    stage: 'Stage B',
    notifyTime: '30 minutes before',
    email: 'user@example.com',
  },
  {
    id: 8,
    matchId: 18,
    date: 'May 10',
    time: '8:00 PM',
    game: 'Super Smash Bros',
    team1: 'TBD',
    team2: 'TBD',
    stage: 'Main Stage',
    notifyTime: '1 hour before',
    email: 'user@example.com',
  },
];

interface RemindersProps {
  isGuest: boolean;
}

export function Reminders({ isGuest }: RemindersProps) {
  const toast = useToast();
  const [reminders, setReminders] = useState<Reminder[]>(mockReminders);
  const [selectedGame, setSelectedGame] = useState('All');

  const headerRef = useScrollAnimation();
  const statsRef = useScrollAnimation();
  const listRef = useScrollAnimation();

  const games = ['All', 'Valorant', 'Rocket League', 'Super Smash Bros'];

  const filteredReminders = reminders.filter(
    reminder => selectedGame === 'All' || reminder.game === selectedGame
  );

  const handleDeleteReminder = (id: number) => {
    setReminders(reminders.filter(r => r.id !== id));
    toast.success('Reminder deleted');
  };

  const handleDeleteAll = () => {
    setReminders([]);
    toast.success('All reminders deleted');
  };

  if (isGuest) {
    return (
      <div className="min-h-screen pt-20 px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <Bell className="w-20 h-20 mx-auto mb-6 text-gray-600" />
            <h2 className="text-3xl font-bold mb-4">Guest Access</h2>
            <p className="text-gray-400 mb-8">
              Create an account to set and manage event reminders
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
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef.ref} className={`transition-all duration-700 ${headerRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-5xl font-bold mb-4">My Reminders</h1>
              <p className="text-gray-400">Never miss a match with email notifications</p>
            </div>
            {reminders.length > 0 && (
              <button
                onClick={handleDeleteAll}
                className="bg-red-900/20 text-red-400 px-6 py-3 rounded-lg font-semibold hover:bg-red-900/30 transition-all"
              >
                Delete All
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef.ref} className={`transition-all duration-700 ${statsRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6">
              <Bell className="w-8 h-8 text-[#2f6bff] mb-3" />
              <div className="text-3xl font-bold mb-1">{reminders.length}</div>
              <div className="text-sm text-gray-400">Active Reminders</div>
            </div>
            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6">
              <Calendar className="w-8 h-8 text-[#fb923c] mb-3" />
              <div className="text-3xl font-bold mb-1">
                {new Set(reminders.map(r => r.date)).size}
              </div>
              <div className="text-sm text-gray-400">Event Days</div>
            </div>
            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6">
              <Users className="w-8 h-8 text-green-500 mb-3" />
              <div className="text-3xl font-bold mb-1">
                {new Set(reminders.flatMap(r => [r.team1, r.team2])).size}
              </div>
              <div className="text-sm text-gray-400">Teams Followed</div>
            </div>
          </div>

          {/* Filter */}
          <div className="flex gap-4 mb-8">
            {games.map(game => (
              <button
                key={game}
                onClick={() => setSelectedGame(game)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedGame === game
                    ? 'bg-[#2f6bff] text-white'
                    : 'bg-[#1a1a1a] text-gray-400 hover:text-white'
                }`}
              >
                {game}
              </button>
            ))}
          </div>
        </div>

        {/* Reminders List */}
        <div ref={listRef.ref} className={`transition-all duration-700 ${listRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {filteredReminders.length === 0 ? (
            <div className="text-center py-20">
              <Bell className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <p className="text-gray-400 text-lg mb-4">
                {reminders.length === 0 
                  ? 'No reminders set yet'
                  : 'No reminders for this game'}
              </p>
              <p className="text-gray-500 text-sm">
                Go to the Schedule page to set reminders for upcoming matches
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReminders.map((reminder, index) => (
                <div
                  key={reminder.id}
                  className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6 hover:border-[#2f6bff] transition-all"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-[#2f6bff]/20 rounded-lg flex items-center justify-center">
                          <Bell className="w-5 h-5 text-[#2f6bff]" />
                        </div>
                        <div>
                          <div className="font-semibold text-lg">
                            {reminder.team1} vs {reminder.team2}
                          </div>
                          <div className="text-sm text-[#2f6bff]">{reminder.game}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>{reminder.date}, 2026</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>{reminder.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Bell className="w-4 h-4" />
                          <span>Notify {reminder.notifyTime}</span>
                        </div>
                      </div>

                      <div className="mt-3 text-sm text-gray-500">
                        {reminder.stage} • Email: {reminder.email}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteReminder(reminder.id)}
                      className="bg-[#1a1a1a] p-3 rounded-lg hover:bg-red-900/20 hover:text-red-400 transition-all"
                      title="Delete Reminder"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}