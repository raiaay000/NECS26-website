import { Trophy, ChevronDown, ChevronUp, Gamepad2 } from 'lucide-react';
import { teamsData } from './Teams';
import { useState, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const teamsWithStats = teamsData.map((t, i) => ({ ...t, skillRating: 98 - (i * 2), wins: 24 - i, losses: 3 + i }));

<<<<<<< HEAD
// Tree structure for tournament bracket
const bracketTree = {
  "Valorant": {
    quarterFinals: [
      { team1: "Radiant Vanguard", team2: "Midnight Pulse", winner: null },
      { team1: "Legacy Apex", team2: "Neon Circuit", winner: null }
    ],
    semiFinals: [
      { team1: "TBD", team2: "TBD", winner: null }
    ],
    finals: { team1: "TBD", team2: "TBD", winner: null }
  },
  "Rocket League": {
    quarterFinals: [
      { team1: "Turbo Drift", team2: "Smash Legion", winner: null },
      { team1: "Emberfall", team2: "Apex Ascent", winner: null }
    ],
    semiFinals: [
      { team1: "TBD", team2: "TBD", winner: null }
    ],
    finals: { team1: "TBD", team2: "TBD", winner: null }
  },
  "Super Smash Bros": {
    quarterFinals: [
      { team1: "Coldfront", team2: "Thunder Alloy", winner: null },
      { team1: "Prism Wardens", team2: "Gravity Pulse", winner: null }
    ],
    semiFinals: [
      { team1: "TBD", team2: "TBD", winner: null }
    ],
    finals: { team1: "TBD", team2: "TBD", winner: null }
  }
};

const games = ["Valorant", "Rocket League", "Super Smash Bros"];
=======
const matches = [
  { id: 1, round: "Quarter Finals", team1: "Radiant Vanguard", team2: "Midnight Pulse", scheduled: "May 8, 2:00 PM", game: "Valorant" },
  { id: 2, round: "Quarter Finals", team1: "Legacy Apex", team2: "Neon Circuit", scheduled: "May 8, 3:30 PM", game: "Valorant" },
  { id: 3, round: "Quarter Finals", team1: "Turbo Drift", team2: "Smash Legion", scheduled: "May 8, 5:00 PM", game: "Rocket League" },
  { id: 4, round: "Quarter Finals", team1: "Emberfall", team2: "Apex Ascent", scheduled: "May 8, 6:30 PM", game: "Rocket League" },
  { id: 5, round: "Quarter Finals", team1: "Coldfront", team2: "Thunder Alloy", scheduled: "May 8, 8:00 PM", game: "Super Smash Bros" },
  { id: 6, round: "Quarter Finals", team1: "Prism Wardens", team2: "Gravity Pulse", scheduled: "May 8, 9:30 PM", game: "Super Smash Bros" },
  { id: 7, round: "Semi Finals", team1: "TBD", team2: "TBD", scheduled: "May 9, 2:00 PM", game: "Valorant" },
  { id: 8, round: "Semi Finals", team1: "TBD", team2: "TBD", scheduled: "May 9, 5:00 PM", game: "Rocket League" },
  { id: 9, round: "Semi Finals", team1: "TBD", team2: "TBD", scheduled: "May 9, 8:00 PM", game: "Super Smash Bros" },
  { id: 10, round: "Grand Finals", team1: "TBD", team2: "TBD", scheduled: "May 10, 3:00 PM", game: "Cross-Game Championship" },
];

const rounds = [
  { name: "Round of 16", date: "May 7", color: "text-[#10b981]" },
  { name: "Quarter Finals", date: "May 8", color: "text-[#2f6bff]" },
  { name: "Semi Finals", date: "May 9", color: "text-[#10b981]" },
  { name: "Grand Finals", date: "May 10", color: "text-[#fb923c]" }
];

const games = ["All", "Valorant", "Rocket League", "Super Smash Bros"];
>>>>>>> ed37ba7e5134ef60801ee7d8b3ff4540e6400f5e

const gameColors: Record<string, string> = {
  "Valorant": "bg-[#ff4655]/20 text-[#ff4655] border-[#ff4655]/50",
  "Rocket League": "bg-[#2f6bff]/20 text-[#2f6bff] border-[#2f6bff]/50",
  "Super Smash Bros": "bg-[#fb923c]/20 text-[#fb923c] border-[#fb923c]/50"
};

<<<<<<< HEAD
interface TeamBoxProps {
  teamName: string;
  isWinner?: boolean;
}

function TeamBox({ teamName, isWinner }: TeamBoxProps) {
  const team = teamsWithStats.find(t => t.name === teamName);
  
  return (
    <div className={`flex items-center gap-2 p-3 bg-[#0a0a0a] rounded-lg border transition-all ${
      isWinner 
        ? 'border-[#fb923c] bg-[#fb923c]/10' 
        : teamName === "TBD" 
          ? 'border-[#2a2a2a] opacity-50' 
          : 'border-[#1a1a1a] hover:border-[#2f6bff]'
    }`}>
      {team?.logo ? (
        <img src={team.logo} alt={teamName} className="w-8 h-8 object-contain" />
      ) : (
        <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center text-xs">?</div>
      )}
      <span className={`font-semibold text-sm ${teamName === "TBD" ? 'text-gray-500' : ''}`}>{teamName}</span>
      {isWinner && <Trophy className="w-4 h-4 text-[#fb923c] ml-auto" />}
    </div>
  );
}

interface MatchupProps {
  team1: string;
  team2: string;
  winner?: string | null;
}

function Matchup({ team1, team2, winner }: MatchupProps) {
  return (
    <div className="flex flex-col gap-2">
      <TeamBox teamName={team1} isWinner={winner === team1} />
      <div className="text-center text-[#fb923c] font-bold text-xs">VS</div>
      <TeamBox teamName={team2} isWinner={winner === team2} />
=======
interface MatchCardProps {
  match: typeof matches[0];
  index: number;
}

function MatchCard({ match, index }: MatchCardProps) {
  const t1 = teamsWithStats.find(t => t.name === match.team1);
  const t2 = teamsWithStats.find(t => t.name === match.team2);
  
  return (
    <div 
      className="bg-[#1a1a1a] border border-[#2a3342] rounded-lg p-6 hover:border-[#2f6bff] hover:shadow-[0_0_20px_rgba(47,107,255,0.3)] transition-all duration-300 transform hover:scale-[1.02] animate-[fadeInUp_0.6s_ease-out] opacity-0"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${gameColors[match.game] || 'bg-gray-700 text-gray-300'}`}>
          {match.game}
        </span>
        <p className="text-xs text-gray-400">{match.scheduled}</p>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 bg-[#0a0a0a] rounded-lg hover:bg-[#2f6bff]/10 transition-colors group">
          {t1?.logo ? (
            <img src={t1.logo} alt={match.team1} className="w-10 h-10 object-contain group-hover:scale-110 transition-transform" />
          ) : (
            <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">?</div>
          )}
          <span className="font-bold flex-1">{match.team1}</span>
          {t1 && <span className="text-xs text-gray-400">{t1.region}</span>}
        </div>
        
        <div className="flex items-center justify-center">
          <div className="text-[#fb923c] font-bold">VS</div>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-[#0a0a0a] rounded-lg hover:bg-[#2f6bff]/10 transition-colors group">
          {t2?.logo ? (
            <img src={t2.logo} alt={match.team2} className="w-10 h-10 object-contain group-hover:scale-110 transition-transform" />
          ) : (
            <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">?</div>
          )}
          <span className="font-bold flex-1">{match.team2}</span>
          {t2 && <span className="text-xs text-gray-400">{t2.region}</span>}
        </div>
      </div>
>>>>>>> ed37ba7e5134ef60801ee7d8b3ff4540e6400f5e
    </div>
  );
}

export function Brackets() {
  const [showAll, setShowAll] = useState(false);
<<<<<<< HEAD
  const [selectedGame, setSelectedGame] = useState<string>("Valorant");
  const [animatedRatings, setAnimatedRatings] = useState<number[]>(teamsWithStats.map(() => 0));
  
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: treeRef, isVisible: treeVisible } = useScrollAnimation();
  const { ref: leaderboardRef, isVisible: leaderboardVisible } = useScrollAnimation();

=======
  const [selectedGame, setSelectedGame] = useState("All");
  const [animatedRatings, setAnimatedRatings] = useState<number[]>(teamsWithStats.map(() => 0));
  
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: leaderboardRef, isVisible: leaderboardVisible } = useScrollAnimation();

  const filteredMatches = selectedGame === "All" 
    ? matches 
    : matches.filter(m => m.game === selectedGame);

>>>>>>> ed37ba7e5134ef60801ee7d8b3ff4540e6400f5e
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

<<<<<<< HEAD
  const currentBracket = bracketTree[selectedGame as keyof typeof bracketTree];

=======
>>>>>>> ed37ba7e5134ef60801ee7d8b3ff4540e6400f5e
  return (
    <div className="min-h-screen pt-20 px-8 pb-8">
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className={`transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl font-bold mb-4">Tournament Brackets</h1>
<<<<<<< HEAD
          <p className="text-gray-400 mb-12">NECS 2026 Championship Path - Tree Structure</p>
=======
          <p className="text-gray-400 mb-12">NECS 2026 Championship Path</p>
>>>>>>> ed37ba7e5134ef60801ee7d8b3ff4540e6400f5e
        </div>

        {/* Game Filter Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {games.map(game => (
            <button
              key={game}
              onClick={() => setSelectedGame(game)}
              className={`px-6 py-3 rounded-lg font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                selectedGame === game
                  ? 'bg-[#2f6bff] text-white shadow-[0_0_20px_rgba(47,107,255,0.4)] scale-105'
                  : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a3342] hover:text-white'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              {game}
            </button>
          ))}
        </div>

<<<<<<< HEAD
        {/* Tournament Tree Structure */}
        <div ref={treeRef} className={`mb-16 transition-all duration-700 ${treeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-8 overflow-x-auto">
            <div className="flex items-center justify-between gap-8 min-w-[900px]">
              {/* Quarter Finals */}
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-6 text-[#10b981] flex items-center gap-2 justify-center">
                  <Trophy className="w-5 h-5" />
                  Quarter Finals
                </h3>
                <div className="flex flex-col gap-8">
                  {currentBracket.quarterFinals.map((match, idx) => (
                    <div key={idx} className="relative">
                      <Matchup team1={match.team1} team2={match.team2} winner={match.winner} />
                      {/* Connecting line to semi-finals */}
                      <div className="absolute top-1/2 -right-4 w-4 h-0.5 bg-[#2a2a2a]" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Vertical connector lines */}
              <div className="relative w-8 flex items-center justify-center">
                <div className="absolute top-[25%] bottom-[25%] w-0.5 bg-[#2a2a2a]" />
                <div className="absolute top-1/2 w-full h-0.5 bg-[#2a2a2a]" style={{ transform: 'translateY(-50%)' }} />
              </div>

              {/* Semi Finals */}
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-6 text-[#2f6bff] flex items-center gap-2 justify-center">
                  <Trophy className="w-5 h-5" />
                  Semi Finals
                </h3>
                <div className="flex flex-col justify-center" style={{ minHeight: '300px' }}>
                  {currentBracket.semiFinals.map((match, idx) => (
                    <div key={idx} className="relative">
                      <Matchup team1={match.team1} team2={match.team2} winner={match.winner} />
                      {/* Connecting line to finals */}
                      <div className="absolute top-1/2 -right-4 w-4 h-0.5 bg-[#2a2a2a]" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Connector to Finals */}
              <div className="w-8 flex items-center justify-center">
                <div className="w-full h-0.5 bg-[#2a2a2a]" />
              </div>

              {/* Finals */}
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-6 text-[#fb923c] flex items-center gap-2 justify-center">
                  <Trophy className="w-5 h-5" />
                  Finals
                </h3>
                <div className="flex flex-col justify-center" style={{ minHeight: '300px' }}>
                  <div className="relative">
                    <Matchup 
                      team1={currentBracket.finals.team1} 
                      team2={currentBracket.finals.team2} 
                      winner={currentBracket.finals.winner} 
                    />
                  </div>
                </div>
              </div>

              {/* Champion */}
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-6 text-[#fb923c] flex items-center gap-2 justify-center">
                  <Trophy className="w-5 h-5" />
                  Champion
                </h3>
                <div className="flex flex-col justify-center items-center" style={{ minHeight: '300px' }}>
                  <div className="w-full max-w-[200px] bg-gradient-to-br from-[#fb923c]/20 to-[#2f6bff]/20 border-2 border-[#fb923c] rounded-xl p-6 text-center">
                    <Trophy className="w-16 h-16 text-[#fb923c] mx-auto mb-3" />
                    <div className="font-bold text-lg text-[#fb923c]">TBD</div>
                    <div className="text-xs text-gray-400 mt-2">May 10, 2026</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tournament Schedule */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#10b981]/10 border border-[#10b981]/30 rounded-lg p-4">
              <h4 className="text-[#10b981] font-bold mb-2 flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Quarter Finals
              </h4>
              <p className="text-sm text-gray-400">May 8, 2026 • 2:00 PM - 9:30 PM</p>
            </div>
            <div className="bg-[#2f6bff]/10 border border-[#2f6bff]/30 rounded-lg p-4">
              <h4 className="text-[#2f6bff] font-bold mb-2 flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Semi Finals
              </h4>
              <p className="text-sm text-gray-400">May 9, 2026 • 2:00 PM - 8:00 PM</p>
            </div>
            <div className="bg-[#fb923c]/10 border border-[#fb923c]/30 rounded-lg p-4">
              <h4 className="text-[#fb923c] font-bold mb-2 flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Grand Finals
              </h4>
              <p className="text-sm text-gray-400">May 10, 2026 • 3:00 PM</p>
            </div>
          </div>
        </div>

        {/* Team Power Rankings */}
=======
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Bracket Overview</h2>
          {rounds.map((round) => {
            const roundMatches = filteredMatches.filter(m => m.round === round.name);
            if (roundMatches.length === 0) return null;
            
            return (
              <div key={round.name} className="mb-12">
                <h3 className={`text-2xl font-bold mb-6 ${round.color} flex items-center gap-3`}>
                  <Trophy className="w-6 h-6" />
                  {round.name} - {round.date}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {roundMatches.map((m, idx) => (
                    <MatchCard key={m.id} match={m} index={idx} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

>>>>>>> ed37ba7e5134ef60801ee7d8b3ff4540e6400f5e
        <div ref={leaderboardRef} className={`transition-all duration-700 ${leaderboardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Team Power Rankings</h2>
            <button onClick={() => setShowAll(!showAll)} className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] rounded-lg hover:bg-[#2f6bff] transition-all duration-300 hover:scale-105">
              {showAll ? <><ChevronUp className="w-4 h-4" /> Show Less</> : <><ChevronDown className="w-4 h-4" /> Show All</>}
            </button>
          </div>
          <div className="space-y-3">
            {teamsWithStats.slice(0, showAll ? teamsWithStats.length : 5).map((team, i) => (
              <div 
                key={team.id} 
                className="bg-[#1a1a1a] border border-[#2a3342] rounded-lg p-6 hover:border-[#2f6bff] hover:shadow-[0_0_20px_rgba(47,107,255,0.2)] transition-all duration-300 hover:scale-[1.02] animate-[fadeInUp_0.6s_ease-out] opacity-0"
                style={{ animationDelay: `${i * 0.05}s`, animationFillMode: 'forwards' }}
              >
                <div className="flex items-center gap-6">
                  <div className={`text-3xl font-bold ${i < 3 ? 'text-[#fb923c]' : 'text-gray-400'} min-w-[50px]`}>
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                  </div>
                  <img src={team.logo} alt={team.name} className="w-12 h-12 object-contain hover:scale-110 transition-transform" />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{team.name}</h3>
                    <p className="text-sm text-gray-400 mb-2">{team.region} • {team.game}</p>
                    {/* Animated Progress Bar */}
                    <div className="w-full bg-[#0a0a0a] rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#2f6bff] to-[#fb923c] rounded-full transition-all duration-1000"
                        style={{ width: `${(animatedRatings[i] / 100) * 100}%` }}
                      />
                    </div>
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
<<<<<<< HEAD
}
=======
}
>>>>>>> ed37ba7e5134ef60801ee7d8b3ff4540e6400f5e
