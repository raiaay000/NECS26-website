import { Trophy, ChevronDown, ChevronUp } from 'lucide-react';
import { teamsData } from './Teams';
import { useState, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const teamsWithStats = teamsData.map((t, i) => ({ ...t, skillRating: 98 - (i * 2), wins: 24 - i, losses: 3 + i }));

const matches = [
  { id: 1, round: "Quarter Finals", team1: "Radiant Vanguard", team2: "Apex Ascent", scheduled: "May 8, 2:00 PM" },
  { id: 2, round: "Quarter Finals", team1: "Midnight Pulse", team2: "Emberfall", scheduled: "May 8, 3:30 PM" },
  { id: 3, round: "Quarter Finals", team1: "Legacy Apex", team2: "Smash Legion", scheduled: "May 8, 5:00 PM" },
  { id: 4, round: "Quarter Finals", team1: "Neon Circuit", team2: "Turbo Drift", scheduled: "May 8, 6:30 PM" },
  { id: 5, round: "Semi Finals", team1: "TBD", team2: "TBD", scheduled: "May 9, 2:00 PM" },
  { id: 6, round: "Semi Finals", team1: "TBD", team2: "TBD", scheduled: "May 9, 5:00 PM" },
  { id: 7, round: "Grand Finals", team1: "TBD", team2: "TBD", scheduled: "May 10, 3:00 PM" },
];

const rounds = [
  { name: "Quarter Finals", date: "May 8", color: "text-[#2f6bff]" },
  { name: "Semi Finals", date: "May 9", color: "text-[#10b981]" },
  { name: "Grand Finals", date: "May 10", color: "text-[#fbbf24]" }
];

export function Brackets() {
  const [showAll, setShowAll] = useState(false);
  const [animatedRatings, setAnimatedRatings] = useState<number[]>(teamsWithStats.map(() => 0));
  
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: leaderboardRef, isVisible: leaderboardVisible } = useScrollAnimation();

  useEffect(() => {
    if (leaderboardVisible) {
      const duration = 1500;
      const steps = 60;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        setAnimatedRatings(teamsWithStats.map(t => Math.floor(t.skillRating * (currentStep / steps))));
        if (currentStep >= steps) {
          clearInterval(timer);
          setAnimatedRatings(teamsWithStats.map(t => t.skillRating));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [leaderboardVisible]);

  return (
    <div className="min-h-screen pt-20 px-8 pb-8">
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className={`transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl font-bold mb-4">Tournament Brackets</h1>
          <p className="text-gray-400 mb-12">NECS 2026 Championship Path</p>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Bracket Overview</h2>
          {rounds.map((round, idx) => {
            const roundMatches = matches.filter(m => m.round === round.name);
            return (
              <div key={round.name} className="mb-12">
                <h3 className={`text-2xl font-bold mb-6 ${round.color}`}>{round.name} - {round.date}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {roundMatches.map(m => {
                    const t1 = teamsWithStats.find(t => t.name === m.team1);
                    const t2 = teamsWithStats.find(t => t.name === m.team2);
                    return (
                      <div key={m.id} className="bg-[#1a1a1a] border border-[#2a3342] rounded-lg p-6 hover:border-[#2f6bff] transition-colors">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              {t1?.logo && <img src={t1.logo} alt={m.team1} className="w-10 h-10 object-contain" />}
                              <span className="font-bold">{m.team1}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              {t2?.logo && <img src={t2.logo} alt={m.team2} className="w-10 h-10 object-contain" />}
                              <span className="font-bold">{m.team2}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-400">{m.scheduled}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div ref={leaderboardRef} className={`transition-all duration-700 ${leaderboardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Team Power Rankings</h2>
            <button onClick={() => setShowAll(!showAll)} className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] rounded-lg hover:bg-[#2f6bff] transition-colors">
              {showAll ? <><ChevronUp className="w-4 h-4" /> Show Less</> : <><ChevronDown className="w-4 h-4" /> Show All</>}
            </button>
          </div>
          <div className="space-y-3">
            {teamsWithStats.slice(0, showAll ? teamsWithStats.length : 5).map((team, i) => (
              <div key={team.id} className="bg-[#1a1a1a] border border-[#2a3342] rounded-lg p-6 hover:border-[#2f6bff] transition-all">
                <div className="flex items-center gap-6">
                  <div className={`text-3xl font-bold ${i < 3 ? 'text-[#fbbf24]' : 'text-gray-400'} min-w-[50px]`}>
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                  </div>
                  <img src={team.logo} alt={team.name} className="w-12 h-12 object-contain" />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{team.name}</h3>
                    <p className="text-sm text-gray-400">{team.region} • {team.game}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#2f6bff]">{animatedRatings[i]}</div>
                    <p className="text-xs text-gray-400">Skill Rating</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm"><span className="text-[#10b981]">{team.wins}W</span> - <span className="text-[#ef4444]">{team.losses}L</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
