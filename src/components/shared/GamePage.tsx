import { ArrowLeft, Trophy, Users, Target } from 'lucide-react';
import { teamsData } from '../Teams';

interface GamePageProps {
  game: 'Valorant' | 'Rocket League' | 'Super Smash Bros';
  image: string;
  tips: string[];
  onBack: () => void;
}

const gameColors = {
  'Valorant': { primary: '#10b981', secondary: '#059669' },
  'Rocket League': { primary: '#f59e0b', secondary: '#d97706' },
  'Super Smash Bros': { primary: '#8b5cf6', secondary: '#7c3aed' }
};

export function GamePage({ game, image, tips, onBack }: GamePageProps) {
  const teams = teamsData.filter(team => team.game === game);
  const colors = gameColors[game];

  return (
    <div className="min-h-screen pt-20 px-8 pb-8">
      <div className="max-w-7xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Games
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h1 className="text-5xl font-bold mb-6" style={{ color: colors.primary }}>{game}</h1>
            <p className="text-gray-400 text-lg mb-6">
              {game === 'Valorant' && 'A tactical 5v5 FPS where precise gunplay meets unique agent abilities.'}
              {game === 'Rocket League' && 'High-octane vehicular soccer combining driving and acrobatic aerial maneuvers.'}
              {game === 'Super Smash Bros' && 'The ultimate platform fighter featuring iconic characters in explosive battles.'}
            </p>
            <div className="flex gap-8">
              <div className="text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2" style={{ color: colors.primary }} />
                <div className="text-2xl font-bold">$333K</div>
                <div className="text-sm text-gray-400">Prize Pool</div>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 mx-auto mb-2" style={{ color: colors.primary }} />
                <div className="text-2xl font-bold">{teams.length}</div>
                <div className="text-sm text-gray-400">Teams</div>
              </div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img src={image} alt={game} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-6 h-6" style={{ color: colors.primary }} />
              <h2 className="text-2xl font-bold">Pro Tips</h2>
            </div>
            <ul className="space-y-3">
              {tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-xl" style={{ color: colors.primary }}>•</span>
                  <span className="text-gray-300">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Competing Teams</h2>
            <div className="grid grid-cols-2 gap-4">
              {teams.map(team => (
                <div key={team.id} className="bg-[#1a1a1a] border border-[#2a3342] rounded-lg p-4 hover:border-[#2f6bff] transition-colors">
                  <img src={team.logo} alt={team.name} className="w-16 h-16 object-contain mx-auto mb-3" />
                  <h3 className="text-sm font-semibold text-center">{team.name}</h3>
                  <p className="text-xs text-gray-400 text-center">{team.region}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
