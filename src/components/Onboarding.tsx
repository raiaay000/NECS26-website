import { useState, useEffect } from 'react';
import { ChevronRight, X, Home, Gamepad2, Users, Calendar, Ticket, ShoppingBag, Video, Music, MapPin, Utensils, HelpCircle, User, Bell, Settings as SettingsIcon } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    id: 1,
    title: "Welcome to NECS 2026",
    description: "Your ultimate destination for the National Esports Championship Series. Experience 5 days of world-class competitive gaming.",
    highlight: "May 6-10, 2026 • Bridgestone Arena, Nashville",
    icon: Home,
    color: "#2f6bff"
  },
  {
    id: 2,
    title: "3 Championship Games",
    description: "Watch the best players compete in Valorant, Rocket League, and Super Smash Bros Ultimate.",
    highlight: "Total Prize Pool: $1,200,000",
    icon: Gamepad2,
    color: "#10b981"
  },
  {
    id: 3,
    title: "Teams",
    description: "Meet the 12 elite teams competing across all games. View full rosters, player stats, and team histories.",
    highlight: "Team Profiles • Rosters • Stats • History",
    icon: Users,
    color: "#fb923c"
  },
  {
    id: 4,
    title: "Smart Schedule System",
    description: "Browse the complete tournament schedule, search for specific matches, and set email reminders for games you don't want to miss.",
    highlight: "Set Reminders • Filter by Game • Track Matchups",
    icon: Calendar,
    color: "#8b5cf6"
  },
  {
    id: 5,
    title: "Get Your Tickets",
    description: "Choose from General Admission ($45), VIP ($180), or Ultimate ($350) packages. Each tier offers exclusive perks and experiences.",
    highlight: "3 Ticket Tiers • Premium Seating • Meet & Greets",
    icon: Ticket,
    color: "#ec4899"
  },
  {
    id: 6,
    title: "Shop",
    description: "Get official NECS 2026 merchandise including team jerseys, limited edition hoodies, and collectibles.",
    highlight: "Jerseys • Apparel • Collectibles • Accessories",
    icon: ShoppingBag,
    color: "#fb923c"
  },
  {
    id: 7,
    title: "Watch Live Coverage",
    description: "Discover 12+ content creators and streamers covering the tournament. Get highlights, analysis, and behind-the-scenes content.",
    highlight: "Twitch Streamers • YouTubers • Live Coverage",
    icon: Video,
    color: "#ef4444"
  },
  {
    id: 8,
    title: "Tournament Playlist & Food",
    description: "Listen to our curated hype music playlist and explore the full VIP food menu featuring appetizers, mains, and desserts.",
    highlight: "20+ Tracks • Complimentary VIP Dining",
    icon: Music,
    color: "#06b6d4"
  },
  {
    id: 9,
    title: "Interactive Venue Map",
    description: "Explore Bridgestone Arena with our detailed interactive map. Find stages, seating sections, concessions, and amenities.",
    highlight: "3 Gaming Stages • VIP Lounges • Facilities",
    icon: MapPin,
    color: "#14b8a6"
  },
  {
    id: 10,
    title: "NECS Bot Assistant",
    description: "Meet NECS Bot, your AI-powered tournament assistant! Ask questions about tickets, schedule, teams, venue, and more - get instant answers 24/7.",
    highlight: "AI Assistant • Instant Answers • Always Available",
    icon: HelpCircle,
    color: "#2f6bff"
  },
  {
    id: 11,
    title: "Your Account Features",
    description: "Create an account to save favorites, manage reminders, track purchases, and customize your NECS 2026 experience.",
    highlight: "Profile • Reminders • Settings • Guest Mode",
    icon: User,
    color: "#8b5cf6"
  }
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(prev => prev + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(prev => prev - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    localStorage.setItem('necs2026_onboarding_completed', 'true');
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        if (currentSlide < slides.length - 1) {
          setIsAnimating(true);
          setTimeout(() => {
            setCurrentSlide(prev => prev + 1);
            setIsAnimating(false);
          }, 300);
        } else {
          handleComplete();
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentSlide > 0) {
          setIsAnimating(true);
          setTimeout(() => {
            setCurrentSlide(prev => prev - 1);
            setIsAnimating(false);
          }, 300);
        }
      } else if (e.key === 'Escape') {
        handleComplete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const slide = slides[currentSlide];
  const Icon = slide.icon;
  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div className={`fixed inset-0 bg-black z-[100] flex items-center justify-center transition-opacity duration-500 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
      {/* Background gradient */}
      <div 
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: `radial-gradient(circle at center, ${slide.color}15 0%, transparent 70%)`
        }}
      />

      {/* Close button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#2f6bff] hover:bg-[#2a2a2a] transition-all flex items-center justify-center group z-10"
        aria-label="Close tutorial"
      >
        <X className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
      </button>

      {/* Main content */}
      <div className="max-w-2xl mx-auto px-8 text-center relative z-10">
        {/* Icon */}
        <div 
          className={`w-20 h-20 rounded-2xl mx-auto mb-8 flex items-center justify-center transition-all duration-500 ${isAnimating ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}
          style={{ 
            background: `linear-gradient(135deg, ${slide.color} 0%, ${slide.color}80 100%)`,
            boxShadow: `0 10px 40px ${slide.color}40`
          }}
        >
          <Icon className="w-10 h-10 text-white" />
        </div>

        {/* Content */}
        <div className={`transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
          <p className="text-xl text-gray-300 mb-6 leading-relaxed max-w-xl mx-auto">
            {slide.description}
          </p>
          <div 
            className="text-lg font-semibold mb-12 inline-block px-4 py-2 rounded-lg"
            style={{ 
              color: slide.color,
              background: `${slide.color}20`,
              border: `1px solid ${slide.color}40`
            }}
          >
            {slide.highlight}
          </div>
        </div>

        {/* Progress indicators */}
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAnimating(true);
                setTimeout(() => {
                  setCurrentSlide(index);
                  setIsAnimating(false);
                }, 300);
              }}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? 'w-8' 
                  : 'w-2 hover:w-4'
              }`}
              style={{
                background: index === currentSlide ? slide.color : '#2a2a2a'
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleSkip}
            className="px-8 py-3 rounded-lg font-semibold bg-[#1a1a1a] border border-[#2a2a2a] hover:bg-[#2a2a2a] hover:border-[#3a3a3a] transition-all text-gray-300"
          >
            Skip
          </button>
          <button
            onClick={handleNext}
            className="px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 hover:scale-105 hover:shadow-xl"
            style={{
              background: slide.color,
              boxShadow: `0 4px 20px ${slide.color}40`
            }}
          >
            {isLastSlide ? "Let's Go!" : "Next"}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide counter */}
        <div className="mt-8 text-sm text-gray-500">
          {currentSlide + 1} of {slides.length}
        </div>
      </div>

      {/* Decorative elements */}
      <div 
        className="absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700"
        style={{ background: slide.color }}
      />
      <div 
        className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none transition-all duration-700"
        style={{ background: slide.color }}
      />
    </div>
  );
}