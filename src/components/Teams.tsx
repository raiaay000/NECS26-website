import { useState } from 'react';
import { X } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import imgRadiantVanguard from "figma:asset/89a552dfbe23821f9ddb05fef2a5a6d8d87608d1.png";
import imgMidnightPulse from "figma:asset/e9924b6cc2ad57afd43725356f783a6e5446b3b5.png";
import imgLegacyApex from "figma:asset/1125f01ad0d81daa20897a216109597cdd9304c2.png";
import imgNeonCircuit from "figma:asset/159ede76147efb06ffb96ac690e58cb544a43bc2.png";
import imgTurboDrift from "figma:asset/109ee1d129c15451366169418f88b90e03abbdad.png";
import imgSmashLegion from "figma:asset/fa5beb57d13f69aa6cf097fdd2d9017e03b39a81.png";
import imgEmberfall from "figma:asset/f108e0c8ca28bb006b4331dc8cd5a4b7d40e25a4.png";
import imgApexAscent from "figma:asset/e5ca10f4026c8a502279fda1adf9ba5ef24c58e3.png";
import imgColdfront from "figma:asset/1d2cd256f62c61bdc72f6920a5791df2b9bbd225.png";
import imgThunderAlloy from "figma:asset/4e82d0669721fad732b21db4d47a56d4e935f79e.png";
import imgPrismWardens from "figma:asset/5a3c5fb698c70d8a40366010ffd86135549c2966.png";
import imgGravityPulse from "figma:asset/4581f56c0f1bad3d9c91e7f2d2277684352d17f3.png";

interface Team {
  id: number;
  name: string;
  logo: string;
  region: string;
  game: string;
  founded: number;
  coach: string;
  achievements: string[];
  roster: [string, string, string][];
}

const logos = [imgRadiantVanguard, imgMidnightPulse, imgLegacyApex, imgNeonCircuit, imgTurboDrift, imgSmashLegion, imgEmberfall, imgApexAscent, imgColdfront, imgThunderAlloy, imgPrismWardens, imgGravityPulse];

export const teamsData: Team[] = [
  { id: 1, name: "Radiant Vanguard", logo: logos[0], region: "North America", game: "Valorant", founded: 2021, coach: "Michael \"MikeStrat\" Chen", achievements: ["VCT Champions 2024", "Masters Tokyo 2023"], roster: [["Alex \"Phantom\" Rivera", "Duelist", "USA"], ["Sarah \"Sage\" Williams", "Sentinel", "Canada"], ["Jake \"Jett\" Thompson", "Duelist", "USA"], ["Emma \"Viper\" Davis", "Controller", "USA"], ["Luis \"Sova\" Martinez", "Initiator", "Mexico"]] },
  { id: 2, name: "Midnight Pulse", logo: logos[1], region: "Europe", game: "Valorant", founded: 2020, coach: "Andreas \"DarkStorm\" Mueller", achievements: ["EMEA Champions 2023", "VCT Lock-In Winner"], roster: [["Luka \"Reyna\" Novak", "Duelist", "Croatia"], ["Oliver \"Omen\" Schmidt", "Controller", "Germany"], ["Pierre \"Breach\" Dubois", "Initiator", "France"], ["Marco \"Chamber\" Rossi", "Sentinel", "Italy"], ["Ivan \"Fade\" Petrov", "Initiator", "Russia"]] },
  { id: 3, name: "Legacy Apex", logo: logos[2], region: "Asia", game: "Valorant", founded: 2022, coach: "Kim \"Tactician\" Min-jae", achievements: ["APAC Champions 2024", "Pacific Masters Winner"], roster: [["Yuki \"Jett\" Tanaka", "Duelist", "Japan"], ["Jin \"Cypher\" Park", "Sentinel", "South Korea"], ["Wei \"Brimstone\" Zhang", "Controller", "China"], ["Ravi \"Skye\" Sharma", "Initiator", "India"], ["Taro \"Neon\" Yamamoto", "Duelist", "Japan"]] },
  { id: 4, name: "Neon Circuit", logo: logos[3], region: "South America", game: "Valorant", founded: 2021, coach: "Carlos \"Thunder\" Silva", achievements: ["SA Champions 2023", "Americas Playoff Runner-up"], roster: [["Diego \"Raze\" Santos", "Duelist", "Brazil"], ["Felipe \"KAY/O\" Oliveira", "Initiator", "Brazil"], ["Juan \"Killjoy\" Garcia", "Sentinel", "Argentina"], ["Miguel \"Astra\" Torres", "Controller", "Chile"], ["Pedro \"Phoenix\" Costa", "Duelist", "Brazil"]] },
  { id: 5, name: "Turbo Drift", logo: logos[4], region: "North America", game: "Rocket League", founded: 2019, coach: "Ryan \"Boost\" Anderson", achievements: ["RLCS World Champion 2024", "NA Regional Champion"], roster: [["Tyler \"Turbo\" Johnson", "Striker", "USA"], ["Chris \"Nitro\" Lee", "Midfielder", "Canada"], ["Brandon \"Drift\" Walker", "Goalkeeper", "USA"]] },
  { id: 6, name: "Smash Legion", logo: logos[5], region: "Europe", game: "Rocket League", founded: 2020, coach: "Henrik \"Speed\" Larsson", achievements: ["RLCS EU Champion 2023", "Gamers8 Winner"], roster: [["Felix \"Flash\" Berg", "Striker", "Sweden"], ["Lars \"Legion\" Hansen", "Midfielder", "Denmark"], ["Erik \"Ace\" Olsen", "Goalkeeper", "Norway"]] },
  { id: 7, name: "Emberfall", logo: logos[6], region: "Asia", game: "Rocket League", founded: 2021, coach: "Kenji \"Flame\" Ito", achievements: ["APAC Champion 2024", "Asian Cup Winner"], roster: [["Hiroshi \"Ember\" Sato", "Striker", "Japan"], ["Akira \"Blaze\" Nakamura", "Midfielder", "Japan"], ["Takeshi \"Wall\" Suzuki", "Goalkeeper", "Japan"]] },
  { id: 8, name: "Apex Ascent", logo: logos[7], region: "Oceania", game: "Rocket League", founded: 2020, coach: "Jack \"Summit\" Morrison", achievements: ["OCE Champion 2023-2024", "Worlds Qualifier"], roster: [["Dylan \"Apex\" Thompson", "Striker", "Australia"], ["Connor \"Rise\" Wilson", "Midfielder", "New Zealand"], ["Liam \"Peak\" Brown", "Goalkeeper", "Australia"]] },
  { id: 9, name: "Coldfront", logo: logos[8], region: "North America", game: "Super Smash Bros", founded: 2018, coach: "David \"IceKing\" Foster", achievements: ["Genesis 9 Champion", "Summit Winner 2024"], roster: [["Austin \"Frost\" Mitchell", "Fox Main", "USA"], ["Jordan \"Freeze\" Clark", "Falco Main", "USA"], ["Mason \"Arctic\" White", "Captain Falcon Main", "Canada"], ["Ethan \"Blizzard\" Hall", "Marth Main", "USA"]] },
  { id: 10, name: "Thunder Alloy", logo: logos[9], region: "Europe", game: "Super Smash Bros", founded: 2019, coach: "Viktor \"Storm\" Kozlov", achievements: ["EU Circuit Champion 2024", "Valhalla Winner"], roster: [["Leon \"Thunder\" Fischer", "Pikachu Main", "Germany"], ["Hugo \"Bolt\" Moreau", "Wolf Main", "France"], ["Oscar \"Volt\" Karlsson", "Roy Main", "Sweden"], ["Nils \"Spark\" Andersen", "Sheik Main", "Denmark"]] },
  { id: 11, name: "Prism Wardens", logo: logos[10], region: "Asia", game: "Super Smash Bros", founded: 2020, coach: "Takumi \"Rainbow\" Watanabe", achievements: ["APAC Champion 2023", "EVO Japan Winner"], roster: [["Kaito \"Prism\" Yamada", "Peach Main", "Japan"], ["Ryo \"Spectrum\" Kobayashi", "Mario Main", "Japan"], ["Hiro \"Light\" Tanaka", "Link Main", "Japan"], ["Sora \"Crystal\" Kimura", "Zelda Main", "Japan"]] },
  { id: 12, name: "Gravity Pulse", logo: logos[11], region: "South America", game: "Super Smash Bros", founded: 2021, coach: "Ricardo \"Gravity\" Mendez", achievements: ["SA Champion 2024", "Smash Factor Winner"], roster: [["Mateo \"Pulse\" Ramirez", "Donkey Kong Main", "Mexico"], ["Lucas \"Wave\" Fernandez", "Samus Main", "Argentina"], ["Gabriel \"Force\" Silva", "Ganondorf Main", "Brazil"], ["Santiago \"Power\" Morales", "Ness Main", "Chile"]] },
];

const games = ["All", "Valorant", "Rocket League", "Super Smash Bros"];

export function Teams() {
  const [selectedGame, setSelectedGame] = useState("All");
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const filteredTeams = selectedGame === "All" ? teamsData : teamsData.filter(t => t.game === selectedGame);
  
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: filtersRef, isVisible: filtersVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen pt-20 px-8 pb-8">
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className={`transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl font-bold mb-4">Competing Teams</h1>
          <p className="text-gray-400 mb-8">One Champion</p>
        </div>
        <div ref={filtersRef} className={`flex gap-4 mb-12 transition-all duration-700 ${filtersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {games.map(g => (
            <button 
              key={g} 
              onClick={() => setSelectedGame(g)} 
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${selectedGame === g ? 'bg-[#2f6bff] text-white' : 'bg-[#1a1a1a] text-gray-400 hover:text-white'}`}
            >
              {g}
            </button>
          ))}
        </div>
        <div ref={gridRef} className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-all duration-700 ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {filteredTeams.map(t => (
            <div key={t.id} onClick={() => setSelectedTeam(t)} className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6 hover:border-[#2f6bff] transition-all cursor-pointer group">
              <div className="w-24 h-24 mx-auto mb-4 group-hover:scale-110 transition-transform">
                <img src={t.logo} alt={t.name} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-center font-bold mb-2">{t.name}</h3>
              <p className="text-center text-sm text-gray-400">{t.region}</p>
              <div className="mt-2 text-center">
                <span className="text-xs bg-[#1a1a1a] px-3 py-1 rounded-full text-[#2f6bff]">{t.game}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTeam && (
        <>
          <div className="fixed inset-0 bg-black/80 z-50" onClick={() => setSelectedTeam(null)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-[#0a0a0a] border-b border-[#1a1a1a] p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={selectedTeam.logo} alt={selectedTeam.name} className="w-16 h-16 object-contain" />
                  <div>
                    <h2 className="text-3xl font-bold">{selectedTeam.name}</h2>
                    <p className="text-gray-400">{selectedTeam.region} • {selectedTeam.game}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedTeam(null)} className="p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#1a1a1a] rounded-lg p-4">
                    <h3 className="text-sm text-gray-400 mb-1">Founded</h3>
                    <p className="text-xl font-bold">{selectedTeam.founded}</p>
                  </div>
                  <div className="bg-[#1a1a1a] rounded-lg p-4">
                    <h3 className="text-sm text-gray-400 mb-1">Coach</h3>
                    <p className="text-xl font-bold">{selectedTeam.coach}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Achievements</h3>
                  <div className="space-y-2">
                    {selectedTeam.achievements.map((a, i) => (
                      <div key={i} className="bg-[#1a1a1a] rounded-lg p-4 flex items-center gap-3">
                        <span className="text-2xl">🏆</span>
                        <span>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Roster</h3>
                  <div className="space-y-2">
                    {selectedTeam.roster.map((player, i) => (
                      <div key={i} className="bg-[#1a1a1a] rounded-lg p-4 flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{player[0]}</p>
                          <p className="text-sm text-gray-400">{player[1]}</p>
                        </div>
                        <span className="text-xs bg-[#0a0a0a] px-3 py-1 rounded-full">{player[2]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
