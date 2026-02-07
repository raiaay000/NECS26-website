import { useState, useEffect, useCallback, useMemo } from 'react';
import imgNecs2026 from "../assets/78350b79fbc777704016bd37db4c592b405fe223.png";
import imgScreenShot from "../assets/421fd19ac29de9957448ff9be4b6863cdbea78a4.png";
import imgMlbb from "../assets/3a4a7af43a18d11045446ecac7b2aaf70d10c6cc.png";
import imgConcert from "../assets/9c294c210ec7c239bb103cd80a9e32794ff549d8.png";
import imgGamingMusic from "../assets/7d1bbe98923c4a56068f02447c3fff42b6028895.png";
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Section } from './shared/Section';
import { CardSection } from './shared/CardSection';

const newsItems = [
  { id: 1, image: "https://images.unsplash.com/photo-1568663469495-b09d5e3c2e07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080", category: "Event", title: "Record-Breaking Attendance Expected", description: "Pre-sale tickets sold out in under 2 hours. Bridgestone Arena prepares for the biggest esports event of 2026." },
  { id: 2, image: "https://images.unsplash.com/photo-1760507388320-2500b019f3ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080", category: "Technology", title: "Cutting-Edge Gaming Setups Revealed", description: "Players will compete on custom-built rigs featuring the latest hardware, ensuring peak performance." },
  { id: 3, image: imgConcert, category: "Entertainment", title: "Live Music All Weekend", description: "Nashville's finest artists perform throughout the event. Music City meets esports in an epic crossover experience." },
  { id: 4, image: "https://images.unsplash.com/photo-1759446334429-bb1f2d1d9f13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080", category: "Prize Pool", title: "$1M Prize Pool Confirmed", description: "One of the largest prize pools in esports history. Winners take home life-changing amounts." },
  { id: 5, image: imgScreenShot, category: "Tournament", title: "Bracket Revealed", description: "Full tournament bracket and matchups announced. See who your favorite teams face in the opening rounds." },
  { id: 6, image: imgMlbb, category: "Teams", title: "Meet the Champions", description: "Get to know the 12 elite teams competing for glory and the $1M prize pool." },
  { id: 7, image: "https://images.unsplash.com/photo-1764493824817-ba770988de79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080", category: "Gear", title: "Official Merchandise Drop", description: "Limited edition jerseys, hoodies, and accessories now available. Show your support in style." }
];

const stats = [
  { value: '12', label: 'Teams', color: 'text-[#2f6bff]' },
  { value: '3', label: 'Games', color: 'text-[#fbbf24]' },
  { value: '5', label: 'Days', color: 'text-[#2f6bff]' },
  { value: '$1M', label: 'Prize Pool', color: 'text-[#fbbf24]' }
];

const scheduleCards = [
  { title: "Valorant Finals", description: "Championship match for the Valorant title", badge: "May 10, 3:00 PM" },
  { title: "Rocket League Semi-Finals", description: "Top 4 teams battle for championship spots", badge: "May 9, 1:00 PM" },
  { title: "Super Smash Bros. Pools", description: "Group stage matches begin", badge: "May 7, 10:00 AM" }
];

const ticketCards = [
  { title: "Single Day Pass", description: "Access to all games and events for one day", price: "$45" },
  { title: "Weekend Pass", description: "All 5 days of championship action", price: "$180", priceColor: "text-[#f59e0b]" },
  { title: "VIP Experience", description: "Premium seating, meet & greets, and exclusive merchandise", price: "$350", priceColor: "text-[#10b981]" }
];

const watchCards = [
  { title: "Main Stage", description: "Primary broadcast with commentary on Twitch", badge: "Upcoming" },
  { title: "Valorant Stream", description: "Dedicated Valorant coverage on Twitch", badge: "Upcoming" }
];

export function Home({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const targetDate = useMemo(() => new Date('2026-05-06T00:00:00').getTime(), []);

  useEffect(() => {
    const updateCountdown = () => {
      const difference = targetDate - Date.now();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / 86400000),
          hours: Math.floor((difference % 86400000) / 3600000),
          minutes: Math.floor((difference % 3600000) / 60000),
          seconds: Math.floor((difference % 60000) / 1000),
        });
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => setCurrentSlide(prev => (prev + 1) % newsItems.length), 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const changeSlide = useCallback((dir: number) => {
    setCurrentSlide(prev => (prev + dir + newsItems.length) % newsItems.length);
    setIsAutoPlaying(false);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2f6bff]/20 to-black" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <img src={imgGamingMusic} alt="" className="w-auto h-full max-w-full object-contain scale-150" />
        </div>
        <div className="relative z-10 text-center px-8 animate-[fadeIn_1s_ease-out]">
          <img src={imgNecs2026} alt="NECS 2026" className="w-48 h-auto mx-auto mb-8 animate-[float_3s_ease-in-out_infinite] mix-blend-screen rounded-2xl" />
          <h1 className="text-6xl font-bold mb-4">The Ultimate <span className="text-[#2f6bff] animate-[glow_2s_ease-in-out_infinite]">Championship</span></h1>
          <div className="flex items-center justify-center gap-6 my-8">
            {[
              { value: timeLeft.days, label: 'Days', width: 3 },
              { value: timeLeft.hours, label: 'Hours', width: 2 },
              { value: timeLeft.minutes, label: 'Minutes', width: 2 },
              { value: timeLeft.seconds, label: 'Seconds', width: 2 }
            ].map((item, index, arr) => (
              <div key={item.label} className="flex items-center gap-6">
                <div className="text-center transform transition-all hover:scale-110">
                  <div className="text-5xl font-bold mb-2 bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent">
                    {String(item.value).padStart(item.width, '0')}
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">{item.label}</div>
                </div>
                {index < arr.length - 1 && <div className="text-5xl font-bold text-[#fbbf24]">:</div>}
              </div>
            ))}
          </div>
          <p className="text-xl text-gray-400 mb-8">May 6-10, 2026 at Bridgestone Arena, Nashville</p>
          <button className="bg-gradient-to-r from-[#2f6bff] to-[#1d4ed8] px-8 py-4 rounded-lg font-bold text-lg hover:from-[#2557d6] hover:to-[#1e40af] transition-all transform hover:scale-105 hover:shadow-[0_0_30px_rgba(251,191,36,0.4)]">
            GET TICKETS
          </button>
        </div>
      </section>

      {/* News Carousel */}
      <Section title="Latest" titleAccent="News & Highlights">
        <div className="relative">
          <div className="overflow-hidden rounded-lg">
            <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {newsItems.map(item => (
                <div key={item.id} className="w-full flex-shrink-0">
                  <div className="bg-[#0a0a0a] rounded-lg overflow-hidden border border-[#1a1a1a] hover:border-[#2f6bff] transition-all group">
                    <div className="relative h-96 overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <span className="text-xs text-[#2f6bff] uppercase tracking-wider font-semibold bg-[#2f6bff]/20 px-3 py-1 rounded-full backdrop-blur-sm">{item.category}</span>
                        <h3 className="text-3xl font-bold mt-4 mb-3">{item.title}</h3>
                        <p className="text-gray-300 text-lg">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button 
            onClick={() => changeSlide(-1)} 
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/80 backdrop-blur-sm border border-[#2f6bff]/50 rounded-full flex items-center justify-center hover:bg-[#2f6bff] transition-all transform hover:scale-110 z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => changeSlide(1)} 
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/80 backdrop-blur-sm border border-[#2f6bff]/50 rounded-full flex items-center justify-center hover:bg-[#2f6bff] transition-all transform hover:scale-110 z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="flex justify-center gap-2 mt-6">
            {newsItems.map((_, i) => (
              <button key={i} onClick={() => { setCurrentSlide(i); setIsAutoPlaying(false); }} className={`h-2 rounded-full transition-all ${i === currentSlide ? 'w-8 bg-[#2f6bff]' : 'w-2 bg-gray-600 hover:bg-gray-400'}`} />
            ))}
          </div>
        </div>
      </Section>

      {/* Stats */}
      <Section dark>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className={`text-5xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Schedule, Tickets, Watch, Venue */}
      <Section title="SCHEDULE">
        <CardSection cards={scheduleCards} buttonText="View Full Schedule" onButtonClick={() => onNavigate?.('schedule')} />
      </Section>

      <Section title="TICKETS" dark>
        <CardSection cards={ticketCards} buttonText="View All Tickets" onButtonClick={() => onNavigate?.('tickets')} buttonPrimary />
      </Section>

      <Section title="WATCH">
        <CardSection cards={watchCards} buttonText="View All Content Creators" onButtonClick={() => onNavigate?.('watch')} />
      </Section>

      <Section title="VENUE" dark>
        <div className="bg-[#1a1a1a] border border-[#2a3342] rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">Bridgestone Arena, Nashville</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-gray-400 mb-2">📍 501 Broadway, Nashville, TN 37203</p>
              <p className="text-gray-400 mb-2">📅 May 6-10, 2026</p>
              <p className="text-gray-400 mb-2">👥 17,500+ capacity</p>
            </div>
            <div>
              <p className="text-gray-400 mb-2">🅿️ Free parking available</p>
              <p className="text-gray-400 mb-2">🚌 Public transit: Music City Circuit</p>
              <p className="text-gray-400">🍴 Nearby restaurants & hotels</p>
            </div>
          </div>
          <button onClick={() => onNavigate?.('venue')} className="w-full bg-[#2f6bff] text-white px-6 py-4 rounded-lg font-bold hover:bg-[#2557d6] transition-colors flex items-center justify-center gap-2">
            Learn More <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </Section>
    </div>
  );
}