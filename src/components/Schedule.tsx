import { useState } from 'react';
import { Bell, Search } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useToast } from './ui/toast';
import { teamsData } from './Teams';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

interface Match {
  id: number;
  date: string;
  time: string;
  game: string;
  team1: string;
  team2: string;
  stage: string;
  venue: string;
}

const scheduleData: Match[] = [
  { id: 1, date: "May 6", time: "10:00 AM", game: "Valorant", team1: "Radiant Vanguard", team2: "Midnight Pulse", stage: "Main Stage", venue: "Bridgestone Arena" },
  { id: 2, date: "May 6", time: "1:00 PM", game: "Valorant", team1: "Legacy Apex", team2: "Neon Circuit", stage: "Main Stage", venue: "Bridgestone Arena" },
  { id: 3, date: "May 6", time: "4:00 PM", game: "Rocket League", team1: "Turbo Drift", team2: "Smash Legion", stage: "Stage B", venue: "Bridgestone Arena" },
  { id: 4, date: "May 6", time: "7:00 PM", game: "Rocket League", team1: "Emberfall", team2: "Apex Ascent", stage: "Stage B", venue: "Bridgestone Arena" },
  { id: 5, date: "May 7", time: "10:00 AM", game: "Super Smash Bros", team1: "Coldfront", team2: "Thunder Alloy", stage: "Main Stage", venue: "Bridgestone Arena" },
  { id: 6, date: "May 7", time: "1:00 PM", game: "Super Smash Bros", team1: "Prism Wardens", team2: "Gravity Pulse", stage: "Main Stage", venue: "Bridgestone Arena" },
  { id: 7, date: "May 7", time: "4:00 PM", game: "Valorant", team1: "Radiant Vanguard", team2: "Legacy Apex", stage: "Stage B", venue: "Bridgestone Arena" },
  { id: 8, date: "May 7", time: "7:00 PM", game: "Rocket League", team1: "Turbo Drift", team2: "Emberfall", stage: "Main Stage", venue: "Bridgestone Arena" },
  { id: 9, date: "May 8", time: "11:00 AM", game: "Valorant", team1: "Midnight Pulse", team2: "Neon Circuit", stage: "Main Stage", venue: "Bridgestone Arena" },
  { id: 10, date: "May 8", time: "2:00 PM", game: "Super Smash Bros", team1: "Coldfront", team2: "Prism Wardens", stage: "Stage B", venue: "Bridgestone Arena" },
  { id: 11, date: "May 8", time: "5:00 PM", game: "Rocket League", team1: "Smash Legion", team2: "Apex Ascent", stage: "Main Stage", venue: "Bridgestone Arena" },
  { id: 12, date: "May 8", time: "8:00 PM", game: "Super Smash Bros", team1: "Thunder Alloy", team2: "Gravity Pulse", stage: "Stage B", venue: "Bridgestone Arena" },
  { id: 13, date: "May 9", time: "12:00 PM", game: "Valorant", team1: "Radiant Vanguard", team2: "Midnight Pulse", stage: "Main Stage", venue: "Bridgestone Arena" },
  { id: 14, date: "May 9", time: "3:00 PM", game: "Rocket League", team1: "Turbo Drift", team2: "Smash Legion", stage: "Main Stage", venue: "Bridgestone Arena" },
  { id: 15, date: "May 9", time: "6:00 PM", game: "Super Smash Bros", team1: "Coldfront", team2: "Thunder Alloy", stage: "Main Stage", venue: "Bridgestone Arena" },
  { id: 16, date: "May 10", time: "2:00 PM", game: "Valorant", team1: "TBD", team2: "TBD", stage: "Main Stage", venue: "Bridgestone Arena" },
  { id: 17, date: "May 10", time: "5:00 PM", game: "Rocket League", team1: "TBD", team2: "TBD", stage: "Main Stage", venue: "Bridgestone Arena" },
  { id: 18, date: "May 10", time: "8:00 PM", game: "Super Smash Bros", team1: "TBD", team2: "TBD", stage: "Main Stage", venue: "Bridgestone Arena" }
];

export function Schedule() {
  const toast = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState('All');
  const [reminderMatch, setReminderMatch] = useState<Match | null>(null);
  const [email, setEmail] = useState('');

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: searchRef, isVisible: searchVisible } = useScrollAnimation();
  const { ref: scheduleRef, isVisible: scheduleVisible } = useScrollAnimation();

  const games = ["All", "Valorant", "Rocket League", "Super Smash Bros"];

  const filteredMatches = scheduleData.filter(match => {
    const matchesSearch = [match.team1, match.team2, match.game, match.date].some(field => 
      field.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchesSearch && (selectedGame === 'All' || match.game === selectedGame);
  });

  const groupedByDate = filteredMatches.reduce((acc, match) => {
    (acc[match.date] = acc[match.date] || []).push(match);
    return acc;
  }, {} as Record<string, Match[]>);

  const getTeamLogo = (teamName: string) => teamsData.find(t => t.name === teamName)?.logo;

  const handleSetReminder = () => {
    if (!email || !reminderMatch) return;
    toast.success(`Reminder set! You'll receive an email at ${email} before the match.`);
    setReminderMatch(null);
    setEmail('');
  };

  return (
    <div className="min-h-screen pt-20 px-8 pb-8">
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className={`transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl font-bold mb-4">Five Days of Competition</h1>
          <p className="text-gray-400 mb-8">Detailed Match Schedule</p>
        </div>

        <div ref={searchRef} className={`mb-8 space-y-4 transition-all duration-700 ${searchVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search teams, games, or dates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-[#2f6bff] focus:outline-none"
            />
          </div>
          <div className="flex gap-4">
            {games.map(game => (
              <button
                key={game}
                onClick={() => setSelectedGame(game)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedGame === game ? 'bg-[#2f6bff] text-white' : 'bg-[#1a1a1a] text-gray-400 hover:text-white'
                }`}
              >
                {game}
              </button>
            ))}
          </div>
        </div>

        <div ref={scheduleRef} className={`space-y-8 transition-all duration-700 ${scheduleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {Object.entries(groupedByDate).map(([date, matches]) => (
            <div key={date}>
              <h2 className="text-2xl font-bold mb-4 text-[#2f6bff]">{date}, 2026</h2>
              <div className="space-y-4">
                {matches.map(match => (
                  <div key={match.id} className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6 hover:border-[#2f6bff] transition-all">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <div className="text-gray-400 font-mono text-sm min-w-[80px]">{match.time}</div>
                        <div className="flex items-center gap-6">
                          {[match.team1, match.team2].map((team, i) => (
                            <div key={i} className="flex items-center gap-3 min-w-[200px]">
                              {getTeamLogo(team) && <img src={getTeamLogo(team)} alt={team} className="w-10 h-10 object-contain" />}
                              <span className="font-semibold">{team}</span>
                              {i === 0 && <span className="text-gray-500 font-bold mx-2">VS</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-xs text-[#2f6bff] font-semibold">{match.game}</div>
                          <div className="text-xs text-gray-400">{match.stage}</div>
                        </div>
                        <button
                          onClick={() => setReminderMatch(match)}
                          className="bg-[#1a1a1a] p-3 rounded-lg hover:bg-[#2f6bff] transition-colors"
                          title="Set Reminder"
                        >
                          <Bell className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredMatches.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No matches found matching your search.</p>
          </div>
        )}
      </div>

      <Dialog open={!!reminderMatch} onOpenChange={() => setReminderMatch(null)}>
        <DialogContent className="bg-[#0a0a0a] border-[#1a1a1a] text-white">
          <DialogHeader>
            <DialogTitle>Set Event Reminder</DialogTitle>
            <DialogDescription className="text-gray-400">Get notified before the match starts</DialogDescription>
          </DialogHeader>
          {reminderMatch && (
            <div className="space-y-4">
              <div className="p-4 bg-[#1a1a1a] rounded-lg">
                <p className="text-sm text-gray-400 mb-2">{reminderMatch.date} at {reminderMatch.time}</p>
                <p className="font-semibold">{reminderMatch.team1} vs {reminderMatch.team2}</p>
                <p className="text-sm text-[#2f6bff]">{reminderMatch.game} - {reminderMatch.stage}</p>
              </div>
              <div>
                <label className="block text-sm mb-2">Email Address</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#1a1a1a] border-[#2a2a2a]"
                />
              </div>
              <Button onClick={handleSetReminder} className="w-full bg-[#2f6bff] hover:bg-[#2557d6]">
                Set Reminder
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
