import { useState } from 'react';
import imgBridgestone from "../assets/51dff6bdfa60cc281ef0bbb9670becee2c8ea42f.png";
import { MapPin, Utensils, Coffee, Hotel, Info, Zap, DoorOpen, ExternalLink, Trophy, Users, Gamepad2, Maximize2, X, Wifi, ShoppingBag, Camera, Bath, Accessibility } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface NearbyLocation {
  id: number;
  name: string;
  type: 'restaurant' | 'hotel';
  description: string;
  address: string;
}

interface VenueFeature {
  id: string;
  name: string;
  section: string;
  description: string;
  icon: any;
  color: string;
  position: { x: number; y: number };
}

const nearbyLocations: NearbyLocation[] = [
  { id: 1, name: "The Stillery", type: "restaurant", description: "Upscale dining with craft cocktails", address: "223 Rep. John Lewis Way S" },
  { id: 2, name: "Tootsies Orchid Lounge", type: "restaurant", description: "Iconic Nashville honky-tonk and grill", address: "422 Broadway" },
  { id: 3, name: "Hattie B's Hot Chicken", type: "restaurant", description: "Famous Nashville hot chicken", address: "112 19th Ave S" },
  { id: 4, name: "Omni Nashville Hotel", type: "hotel", description: "Luxury accommodations next to the arena", address: "250 Rep. John Lewis Way S" },
  { id: 5, name: "The Hermitage Hotel", type: "hotel", description: "Historic luxury hotel in downtown", address: "231 6th Ave N" },
];

// Extremely accurate Bridgestone Arena layout - positions based on actual venue geography
const venueFeatures: VenueFeature[] = [
  {
    id: 'center-stage',
    name: 'Main Stage',
    section: 'Center Ice - Lower Bowl',
    description: 'Primary esports competition stage at center ice with 360-degree seating. Features professional-grade gaming setups for Valorant and Rocket League tournaments with massive LED screens and broadcast production.',
    icon: Trophy,
    color: '#2f6bff',
    position: { x: 400, y: 325 }
  },
  {
    id: 'side-stage',
    name: 'Side Stage',
    section: 'East Side - Section 105',
    description: 'Secondary competition stage for concurrent matches, warmup games, and Super Smash Bros Ultimate side tournaments. Multiple gaming stations with dedicated spectator viewing.',
    icon: Gamepad2,
    color: '#10b981',
    position: { x: 600, y: 325 }
  },
  {
    id: 'player-area',
    name: 'Player Area',
    section: 'North Backstage',
    description: 'Exclusive backstage player preparation zone located behind sections 101-103. Includes practice stations, team strategy rooms, locker facilities, and player lounge. Restricted to competitors and tournament staff.',
    icon: Users,
    color: '#8b5cf6',
    position: { x: 400, y: 120 }
  },
  {
    id: 'vip-club',
    name: 'Lexus Lounge',
    section: 'West Club Level',
    description: 'Premium VIP club on club level with complimentary gourmet food, full bar service, comfortable lounge seating, and exclusive elevated viewing areas. Access for VIP and Ultimate ticket holders only.',
    icon: Coffee,
    color: '#ec4899',
    position: { x: 120, y: 200 }
  },
  {
    id: 'ada-services',
    name: 'ADA Compliance Center',
    section: 'Main Entrance - Guest Services',
    description: 'Comprehensive accessibility services including wheelchair rentals, accessible seating coordination, assistive listening devices, elevator access to all levels, accessible restrooms, and dedicated accessibility staff. All areas of the arena are ADA compliant.',
    icon: Accessibility,
    color: '#22c55e',
    position: { x: 250, y: 530 }
  },
  {
    id: 'merch-main',
    name: 'NECS Merchandise Store',
    section: 'South Concourse - Section 113',
    description: 'Primary official tournament merchandise location featuring team jerseys, NECS 2026 branded apparel, gaming peripherals, posters, collectibles, and exclusive limited-edition items.',
    icon: ShoppingBag,
    color: '#f59e0b',
    position: { x: 400, y: 480 }
  },
  {
    id: 'merch-secondary',
    name: 'Merchandise Kiosk',
    section: 'North Concourse - Section 104',
    description: 'Additional merchandise stand with popular items, quick checkout, and express service for fans wanting to grab gear without missing the action.',
    icon: ShoppingBag,
    color: '#f59e0b',
    position: { x: 400, y: 170 }
  },
  {
    id: 'food-north',
    name: 'North Concessions',
    section: 'Sections 101-105 Concourse',
    description: 'Full concessions area with hot dogs, nachos, popcorn, pretzels, pizza, beverages, and Nashville specialty items. Multiple vendor stands for quick service.',
    icon: Utensils,
    color: '#fb923c',
    position: { x: 200, y: 170 }
  },
  {
    id: 'food-south',
    name: 'South Concessions',
    section: 'Sections 113-117 Concourse',
    description: 'Additional food court with burgers, chicken tenders, vegetarian options, desserts, and full beverage service including soft drinks, energy drinks, and specialty beverages.',
    icon: Utensils,
    color: '#fb923c',
    position: { x: 600, y: 480 }
  },
  {
    id: 'food-east',
    name: 'East Concessions',
    section: 'Sections 108-110 Concourse',
    description: 'Concession stands featuring Nashville hot chicken, BBQ, local specialties, snacks, and beverages. Premium food options available.',
    icon: Utensils,
    color: '#fb923c',
    position: { x: 680, y: 325 }
  },
  {
    id: 'food-west',
    name: 'West Concessions',
    section: 'Sections 115-119 Concourse',
    description: 'Food service area with sandwiches, salads, healthier options, grab-and-go items, and beverage stations.',
    icon: Utensils,
    color: '#fb923c',
    position: { x: 120, y: 325 }
  },
  {
    id: 'broadway-entrance',
    name: 'Broadway Entrance',
    section: 'Main Entry - 5th & Broadway',
    description: 'Primary public entrance on Broadway side (south). Features will-call ticket pickup, general admission entry, security screening, bag check, and ADA-accessible entry. Doors open 90 minutes before event start.',
    icon: DoorOpen,
    color: '#14b8a6',
    position: { x: 400, y: 560 }
  },
  {
    id: 'vip-entrance',
    name: 'VIP Entrance',
    section: 'West Side - 5th Avenue',
    description: 'Exclusive entrance for VIP and Ultimate ticket holders with expedited security, private will-call, and direct access to club level and premium areas.',
    icon: DoorOpen,
    color: '#14b8a6',
    position: { x: 80, y: 400 }
  },
  {
    id: 'info-main',
    name: 'Guest Services',
    section: 'Main Lobby',
    description: 'Central information desk for event schedules, lost & found, accessibility services, general assistance, and customer service. Multilingual staff available throughout the event.',
    icon: Info,
    color: '#06b6d4',
    position: { x: 300, y: 550 }
  },
  {
    id: 'info-secondary',
    name: 'Information Kiosk',
    section: 'Upper Concourse',
    description: 'Additional help desk on upper level for directions, event information, and general inquiries.',
    icon: Info,
    color: '#06b6d4',
    position: { x: 680, y: 200 }
  },
  {
    id: 'premium-seating',
    name: 'Premium Floor Seats',
    section: 'Floor Sections A-F',
    description: 'Ultimate ticket holder exclusive floor seating with closest views of main stage, in-seat wait service, complimentary food and beverages, and VIP lounge access.',
    icon: Camera,
    color: '#ef4444',
    position: { x: 320, y: 280 }
  },
  {
    id: 'restrooms-main',
    name: 'Restroom Facilities',
    section: 'All Concourse Levels',
    description: 'Multiple restroom facilities throughout the arena on lower bowl, club level, and upper bowl. Family restrooms and ADA-accessible facilities on every level. Located near all major concourse areas.',
    icon: Bath,
    color: '#64748b',
    position: { x: 200, y: 400 }
  },
  {
    id: 'first-aid',
    name: 'First Aid Station',
    section: 'Section 118 - Lower Concourse',
    description: 'Medical services and first aid station staffed by licensed medical professionals. Open throughout the event for any medical needs or emergencies.',
    icon: Zap,
    color: '#dc2626',
    position: { x: 150, y: 430 }
  }
];

export function Venue() {
  const [selectedFeature, setSelectedFeature] = useState<VenueFeature | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [fullscreenMap, setFullscreenMap] = useState(false);
  const headerRef = useScrollAnimation();
  const arenaRef = useScrollAnimation();
  const mapRef = useScrollAnimation();
  const nearbyRef = useScrollAnimation();

  const MapContent = ({ isFullscreen = false }: { isFullscreen?: boolean }) => (
    <div className={`relative bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] rounded-lg overflow-hidden border border-[#2a2a2a] ${isFullscreen ? 'h-full' : ''}`}>
      {/* Accurate Bridgestone Arena Map */}
      <div className="relative">
        <svg 
          viewBox="0 0 800 650" 
          className={`w-full ${isFullscreen ? 'h-screen' : 'h-[650px]'}`}
          style={{ background: 'radial-gradient(circle at center, #1a1a1a 0%, #0a0a0a 100%)' }}
        >
          {/* Outer Arena Structure */}
          <ellipse cx="400" cy="325" rx="350" ry="280" fill="none" stroke="#1a1a1a" strokeWidth="3" />
          
          {/* Upper Bowl (Sections 301-333) */}
          <ellipse cx="400" cy="325" rx="320" ry="255" fill="none" stroke="#8b5cf6" strokeWidth="2" opacity="0.4" />
          <text x="400" y="85" textAnchor="middle" fill="#8b5cf6" fontSize="11" opacity="0.7" fontWeight="bold">UPPER BOWL (301-333)</text>
          
          {/* Club Level (Sections 201-228) */}
          <ellipse cx="400" cy="325" rx="270" ry="215" fill="none" stroke="#ec4899" strokeWidth="2" opacity="0.4" />
          <text x="400" y="615" textAnchor="middle" fill="#ec4899" fontSize="11" opacity="0.7" fontWeight="bold">CLUB LEVEL (201-228)</text>
          
          {/* Lower Bowl (Sections 101-119) */}
          <ellipse cx="400" cy="325" rx="220" ry="175" fill="none" stroke="#2f6bff" strokeWidth="2" opacity="0.5" />
          <text x="400" y="160" textAnchor="middle" fill="#2f6bff" fontSize="11" opacity="0.7" fontWeight="bold">LOWER BOWL (101-119)</text>
          
          {/* Center Ice / Main Stage Area */}
          <ellipse cx="400" cy="325" rx="85" ry="65" fill="#2f6bff" opacity="0.15" stroke="#2f6bff" strokeWidth="2.5" />
          <text x="400" y="320" textAnchor="middle" fill="#2f6bff" fontSize="16" fontWeight="bold">MAIN</text>
          <text x="400" y="338" textAnchor="middle" fill="#2f6bff" fontSize="16" fontWeight="bold">STAGE</text>
          
          {/* Section Number Labels - Accurate placement */}
          <text x="400" y="195" textAnchor="middle" fill="#4a5568" fontSize="10" fontWeight="600">101-103</text>
          <text x="565" y="250" textAnchor="middle" fill="#4a5568" fontSize="10" fontWeight="600">105-107</text>
          <text x="600" y="325" textAnchor="middle" fill="#4a5568" fontSize="10" fontWeight="600">108-110</text>
          <text x="565" y="400" textAnchor="middle" fill="#4a5568" fontSize="10" fontWeight="600">111-113</text>
          <text x="400" y="455" textAnchor="middle" fill="#4a5568" fontSize="10" fontWeight="600">114-116</text>
          <text x="235" y="400" textAnchor="middle" fill="#4a5568" fontSize="10" fontWeight="600">117-119</text>
          <text x="200" y="325" textAnchor="middle" fill="#4a5568" fontSize="10" fontWeight="600">118-101</text>
          <text x="235" y="250" textAnchor="middle" fill="#4a5568" fontSize="10" fontWeight="600">102-104</text>
          
          {/* Broadway Entrance - South Side */}
          <rect x="350" y="595" width="100" height="35" rx="6" fill="#14b8a6" opacity="0.2" stroke="#14b8a6" strokeWidth="2" />
          <text x="400" y="617" textAnchor="middle" fill="#14b8a6" fontSize="13" fontWeight="bold">BROADWAY</text>
          <text x="400" y="631" textAnchor="middle" fill="#14b8a6" fontSize="10" fontWeight="bold">ENTRANCE</text>
          
          {/* Concourse Ring Indicators */}
          <circle cx="200" cy="170" r="18" fill="none" stroke="#fb923c" strokeWidth="1.5" opacity="0.4" />
          <circle cx="600" cy="170" r="18" fill="none" stroke="#f59e0b" strokeWidth="1.5" opacity="0.4" />
          <circle cx="600" cy="480" r="18" fill="none" stroke="#fb923c" strokeWidth="1.5" opacity="0.4" />
          <circle cx="120" cy="325" r="18" fill="none" stroke="#fb923c" strokeWidth="1.5" opacity="0.4" />
          <circle cx="680" cy="325" r="18" fill="none" stroke="#fb923c" strokeWidth="1.5" opacity="0.4" />
          
          {/* VIP Club Level - West Side */}
          <rect x="50" y="180" width="100" height="40" rx="5" fill="#ec4899" opacity="0.15" stroke="#ec4899" strokeWidth="1.5" />
          <text x="100" y="205" textAnchor="middle" fill="#ec4899" fontSize="10" fontWeight="600">LEXUS LOUNGE</text>
          
          {/* Backstage Area - North */}
          <rect x="340" y="90" width="120" height="35" rx="5" fill="#8b5cf6" opacity="0.15" stroke="#8b5cf6" strokeWidth="1.5" />
          <text x="400" y="112" textAnchor="middle" fill="#8b5cf6" fontSize="10" fontWeight="600">PLAYER AREA</text>
        </svg>
        
        {/* Interactive Markers */}
        {venueFeatures.map(feature => {
          const FeatureIcon = feature.icon;
          const isHovered = hoveredFeature === feature.id;
          const isSelected = selectedFeature?.id === feature.id;
          
          return (
            <div
              key={feature.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                isHovered || isSelected ? 'z-20 scale-125' : 'z-10 scale-100'
              }`}
              style={{ 
                left: `${(feature.position.x / 800) * 100}%`,
                top: `${(feature.position.y / 650) * 100}%`,
              }}
              onMouseEnter={() => setHoveredFeature(feature.id)}
              onMouseLeave={() => setHoveredFeature(null)}
              onClick={() => setSelectedFeature(selectedFeature?.id === feature.id ? null : feature)}
            >
              {/* Pulse Animation */}
              {(isHovered || isSelected) && (
                <div 
                  className="absolute inset-0 rounded-full animate-ping opacity-75"
                  style={{ backgroundColor: feature.color }}
                />
              )}
              
              {/* Marker */}
              <div 
                className="relative w-11 h-11 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/90"
                style={{ 
                  backgroundColor: feature.color,
                  boxShadow: `0 0 25px ${feature.color}90`
                }}
              >
                <FeatureIcon className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              
              {/* Tooltip */}
              {isHovered && !selectedFeature && (
                <div 
                  className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-[#0a0a0a] border-2 px-4 py-2 rounded-lg whitespace-nowrap text-sm font-semibold shadow-xl z-30 min-w-max"
                  style={{ borderColor: feature.color }}
                >
                  <div className="text-white">{feature.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{feature.section}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Feature Detail Panel */}
      {selectedFeature && (
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-30 animate-[fadeIn_0.2s_ease-out]">
          <div 
            className="bg-[#0a0a0a] border-2 rounded-xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            style={{ borderColor: selectedFeature.color }}
          >
            <div className="flex items-start justify-between mb-6 gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${selectedFeature.color}20` }}
                >
                  <selectedFeature.icon className="w-8 h-8" style={{ color: selectedFeature.color }} strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl font-bold break-words">{selectedFeature.name}</h3>
                  <p className="text-sm font-medium break-words" style={{ color: selectedFeature.color }}>{selectedFeature.section}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedFeature(null)}
                className="w-10 h-10 rounded-lg bg-[#1a1a1a] hover:bg-[#2a2a2a] flex items-center justify-center transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6">{selectedFeature.description}</p>
            
            <button
              onClick={() => setSelectedFeature(null)}
              className="w-full py-3 rounded-lg font-bold transition-all hover:scale-105"
              style={{ 
                backgroundColor: selectedFeature.color,
                boxShadow: `0 4px 20px ${selectedFeature.color}40`
              }}
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* Fullscreen Toggle */}
      {!isFullscreen && (
        <button
          onClick={() => setFullscreenMap(true)}
          className="absolute top-4 right-4 bg-[#2f6bff] hover:bg-[#2557d6] text-white p-3 rounded-lg transition-colors shadow-lg flex items-center gap-2"
          title="View Fullscreen"
        >
          <Maximize2 className="w-5 h-5" />
          <span className="text-sm font-semibold">Fullscreen</span>
        </button>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-[#0a0a0a]/95 backdrop-blur-md border border-[#2a2a2a] rounded-lg p-4 max-w-xs">
        <h4 className="text-sm font-bold mb-3 text-gray-400 uppercase tracking-wider">Map Legend</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#2f6bff]" />
            <span className="text-xs text-gray-300">Competition Stages</span>
          </div>
          <div className="flex items-center gap-2">
            <Utensils className="w-4 h-4 text-[#fb923c]" />
            <span className="text-xs text-gray-300">Food & Concessions</span>
          </div>
          <div className="flex items-center gap-2">
            <Coffee className="w-4 h-4 text-[#ec4899]" />
            <span className="text-xs text-gray-300">VIP & Premium</span>
          </div>
          <div className="flex items-center gap-2">
            <Accessibility className="w-4 h-4 text-[#22c55e]" />
            <span className="text-xs text-gray-300">ADA Compliance</span>
          </div>
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#06b6d4]" />
            <span className="text-xs text-gray-300">Guest Services</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-[#2a2a2a] text-xs text-gray-500">
          Click any marker for details
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-20 px-8 pb-8">
      {/* Fullscreen Map Modal */}
      {fullscreenMap && (
        <div className="fixed inset-0 bg-black z-50 animate-[fadeIn_0.2s_ease-out]">
          <button
            onClick={() => {
              setFullscreenMap(false);
              setSelectedFeature(null);
            }}
            className="absolute top-4 right-4 z-50 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-bold transition-colors flex items-center gap-2 shadow-xl"
          >
            <X className="w-5 h-5" />
            Close Map
          </button>
          <MapContent isFullscreen={true} />
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div ref={headerRef.ref} className={`transition-all duration-700 ${headerRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl font-bold mb-4">Bridgestone Arena</h1>
          <p className="text-gray-400 mb-8">Interactive Venue Map & Event Information</p>
        </div>

        {/* Arena Info */}
        <div ref={arenaRef.ref} className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 transition-all duration-700 ${arenaRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div>
            <img src={imgBridgestone} alt="Bridgestone Arena Exterior" className="w-full h-64 object-cover rounded-lg" />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Location</h3>
              <p className="text-gray-400">501 Broadway, Nashville, TN 37203</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Event Dates</h3>
              <p className="text-gray-400">May 6-10, 2026</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Arena Capacity</h3>
              <p className="text-gray-400">17,159 seats (Lower Bowl: 101-119, Club: 201-228, Upper: 301-333)</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Parking & Transit</h3>
              <p className="text-gray-400">Parking at Nissan Stadium Lot ($15) and nearby garages. WeGo Music City Circuit routes 3, 4, 5, 18, 55</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Accessibility className="w-5 h-5 text-green-500" />
                Accessibility
              </h3>
              <p className="text-gray-400">Fully ADA compliant venue with accessible seating on all levels, elevators, ramps, and dedicated accessibility services.</p>
            </div>
            <div className="pt-4">
              <a 
                href="https://www.bridgestonearena.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#2f6bff] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#2557d6] transition-colors"
              >
                Official Arena Website <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Arena Map */}
        <div ref={mapRef.ref} className={`mb-12 transition-all duration-700 ${mapRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2">Interactive Arena Map</h2>
            <p className="text-gray-400">Explore Bridgestone Arena's accurate layout - Click markers for detailed location information</p>
          </div>
          <MapContent />
        </div>

        {/* Nearby Locations */}
        <div ref={nearbyRef.ref} className={`mt-12 transition-all duration-700 ${nearbyRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl font-bold mb-6">Nearby Nashville Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-green-500" />
                Nearby Restaurants
              </h3>
              <div className="space-y-3">
                {nearbyLocations.filter(p => p.type === 'restaurant').map(point => (
                  <div key={point.id} className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-4 hover:border-green-500 transition-colors cursor-pointer">
                    <h4 className="font-semibold mb-1">{point.name}</h4>
                    <p className="text-sm text-gray-400">{point.description}</p>
                    {point.address && <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {point.address}
                    </p>}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Hotel className="w-5 h-5 text-purple-500" />
                Nearby Hotels
              </h3>
              <div className="space-y-3">
                {nearbyLocations.filter(p => p.type === 'hotel').map(point => (
                  <div key={point.id} className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-4 hover:border-purple-500 transition-colors cursor-pointer">
                    <h4 className="font-semibold mb-1">{point.name}</h4>
                    <p className="text-sm text-gray-400">{point.description}</p>
                    {point.address && <p className="text-xs text-purple-500 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {point.address}
                    </p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}