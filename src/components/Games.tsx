import { Trophy, Users, Calendar, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import imgValorant from 'figma:asset/214f858ba251f9bcf5f3c196d820d721da1d6ed5.png';
import imgRocketLeague from 'figma:asset/1bc58fae54dcca7b552df144447f3018f33509c6.png';
import imgSmashBros from 'figma:asset/0677a2e1a1b5b1194c9e093e8a8081294729057c.png';

const games = [
  { id: 1, name: "Valorant", description: "5v5 character-based tactical shooter", image: imgValorant, teams: 4, format: "Best of 3", prizePool: "$400,000" },
  { id: 2, name: "Rocket League", description: "High-powered hybrid of arcade soccer and driving", image: imgRocketLeague, teams: 4, format: "Best of 5", prizePool: "$350,000" },
  { id: 3, name: "Super Smash Bros", description: "Crossover fighting game featuring Nintendo characters", image: imgSmashBros, teams: 4, format: "Best of 5", prizePool: "$250,000" }
];

const infoCards = [
  { icon: Trophy, title: "$1M Total Prize Pool", desc: "Split across three epic competitions", color: "from-[#2f6bff] to-[#1a4ed6]", iconColor: "text-[#fb923c]" },
  { icon: Users, title: "12 Elite Teams", desc: "The best players from around the world", color: "from-purple-600 to-purple-700", iconColor: "text-white" },
  { icon: Calendar, title: "5 Days of Action", desc: "May 6-10, 2026 at Bridgestone Arena", color: "from-green-600 to-green-700", iconColor: "text-white" }
];

const formatSections = [
  { title: "Group Stage", color: "text-[#2f6bff]", bulletColor: "text-[#2f6bff]", items: ["May 6-7: All teams compete in round-robin format", "Top 8 teams advance to playoffs", "Seeding determined by group stage performance"] },
  { title: "Playoffs", color: "text-[#2f6bff]", bulletColor: "text-[#fb923c]", items: ["May 8: Quarter Finals - Single elimination", "May 9: Semi Finals - Best of 5", "May 10: Grand Finals - Best of 7"] }
];

export function Games({ onGameSelect }: { onGameSelect?: (game: string) => void }) {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gamesGridRef, isVisible: gamesVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { ref: formatRef, isVisible: formatVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen pt-20 px-8 pb-8">
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className={`transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl font-bold mb-4">Featured Games</h1>
          <p className="text-gray-400 mb-12">Three epic competitions, one ultimate champion</p>
        </div>

        <div ref={gamesGridRef} className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transition-all duration-700 ${gamesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {games.map(game => (
            <div key={game.id} className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg overflow-hidden hover:border-[#2f6bff] transition-all group">
              <div className="relative h-48 overflow-hidden">
                <img src={game.image} alt={game.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{game.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{game.description}</p>
                <div className="space-y-2">
                  {[[["Teams", game.teams, "text-[#2f6bff]"], ["Format", game.format, ""], ["Prize Pool", game.prizePool, "text-[#fb923c]"]].map(([label, value, color]) => (
                    <div key={label} className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">{label}</span>
                      <span className={`font-bold ${color}`}>{value}</span>
                    </div>
                  ))]}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div ref={statsRef} className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {infoCards.map((card, i) => (
            <div key={i} className={`bg-gradient-to-br ${card.color} rounded-lg p-6`}>
              <card.icon className={`w-10 h-10 mb-3 ${card.iconColor}`} />
              <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              <p className="text-sm opacity-90">{card.desc}</p>
            </div>
          ))}
        </div>

        <div ref={formatRef} className={`mt-16 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-8 transition-all duration-700 ${formatVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl font-bold mb-6">Tournament Format</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {formatSections.map(section => (
              <div key={section.title}>
                <h3 className={`text-xl font-bold mb-4 ${section.color}`}>{section.title}</h3>
                <ul className="space-y-2 text-gray-400">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className={`${section.bulletColor} mt-1`}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}