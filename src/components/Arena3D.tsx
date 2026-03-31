import { useState, useMemo } from 'react';
import { Layers, RotateCw, ZoomIn, ZoomOut, Eye, Map, Maximize2, Star, Users, DollarSign, TrendingUp, Sparkles, Zap } from 'lucide-react';

interface SectionData {
  id: string;
  name: string;
  level: string;
  capacity: number;
  price: number;
  available: number;
  color: string;
  tier: 'premium' | 'vip' | 'standard';
  viewQuality: number;
  recommended?: boolean;
}

const sections: SectionData[] = [
  // Lower Bowl - Premium
  { id: '101', name: 'Section 101', level: 'Lower Bowl', capacity: 320, price: 199, available: 45, color: '#fb923c', tier: 'premium', viewQuality: 95, recommended: true },
  { id: '103', name: 'Section 103', level: 'Lower Bowl', capacity: 320, price: 199, available: 23, color: '#fb923c', tier: 'premium', viewQuality: 95, recommended: true },
  { id: '105', name: 'Section 105', level: 'Lower Bowl', capacity: 320, price: 179, available: 67, color: '#fb923c', tier: 'premium', viewQuality: 92 },
  { id: '107', name: 'Section 107', level: 'Lower Bowl', capacity: 320, price: 179, available: 12, color: '#fb923c', tier: 'premium', viewQuality: 92 },
  { id: '109', name: 'Section 109', level: 'Lower Bowl', capacity: 320, price: 159, available: 89, color: '#fb923c', tier: 'premium', viewQuality: 88 },
  { id: '111', name: 'Section 111', level: 'Lower Bowl', capacity: 320, price: 159, available: 156, color: '#fb923c', tier: 'premium', viewQuality: 88 },
  { id: '113', name: 'Section 113', level: 'Lower Bowl', capacity: 320, price: 159, available: 234, color: '#fb923c', tier: 'premium', viewQuality: 88 },
  { id: '115', name: 'Section 115', level: 'Lower Bowl', capacity: 320, price: 179, available: 45, color: '#fb923c', tier: 'premium', viewQuality: 92 },
  
  // Club Level - VIP
  { id: '201', name: 'VIP Suite 201', level: 'Club Level', capacity: 180, price: 349, available: 8, color: '#8b5cf6', tier: 'vip', viewQuality: 98, recommended: true },
  { id: '207', name: 'VIP Suite 207', level: 'Club Level', capacity: 180, price: 349, available: 12, color: '#8b5cf6', tier: 'vip', viewQuality: 98 },
  { id: '213', name: 'VIP Suite 213', level: 'Club Level', capacity: 180, price: 299, available: 23, color: '#8b5cf6', tier: 'vip', viewQuality: 95 },
  { id: '219', name: 'VIP Suite 219', level: 'Club Level', capacity: 180, price: 349, available: 5, color: '#8b5cf6', tier: 'vip', viewQuality: 98 },
  
  // Upper Bowl - Standard
  { id: '301', name: 'Section 301', level: 'Upper Bowl', capacity: 420, price: 89, available: 234, color: '#2f6bff', tier: 'standard', viewQuality: 75 },
  { id: '305', name: 'Section 305', level: 'Upper Bowl', capacity: 420, price: 89, available: 178, color: '#2f6bff', tier: 'standard', viewQuality: 75 },
  { id: '309', name: 'Section 309', level: 'Upper Bowl', capacity: 420, price: 79, available: 301, color: '#2f6bff', tier: 'standard', viewQuality: 70 },
  { id: '313', name: 'Section 313', level: 'Upper Bowl', capacity: 420, price: 69, available: 387, color: '#2f6bff', tier: 'standard', viewQuality: 65 },
];

export function Arena3D() {
  const [rotationX, setRotationX] = useState(35);
  const [rotationY, setRotationY] = useState(-25);
  const [zoom, setZoom] = useState(1);
  const [activeView, setActiveView] = useState<'default' | 'top' | 'side' | 'front'>('default');
  const [hoveredSection, setHoveredSection] = useState<SectionData | null>(null);
  const [selectedSection, setSelectedSection] = useState<SectionData | null>(null);
  const [showMiniMap, setShowMiniMap] = useState(true);

  const viewPresets = {
    default: { x: 35, y: -25 },
    top: { x: 0, y: 0 },
    side: { x: 0, y: -90 },
    front: { x: 35, y: 0 }
  };

  const setView = (view: 'default' | 'top' | 'side' | 'front') => {
    setActiveView(view);
    setRotationX(viewPresets[view].x);
    setRotationY(viewPresets[view].y);
  };

  const getTierColors = (tier: string, isHovered: boolean, isSelected: boolean) => {
    if (tier === 'vip') {
      return {
        bg: isHovered || isSelected ? '#a78bfa' : '#8b5cf6',
        border: isHovered || isSelected ? '#c4b5fd' : '#a78bfa',
        shadow: isHovered || isSelected ? '0 0 30px rgba(139,92,246,0.6)' : '0 4px 12px rgba(139,92,246,0.4)'
      };
    } else if (tier === 'premium') {
      return {
        bg: isHovered || isSelected ? '#ea580c' : '#fb923c',
        border: isHovered || isSelected ? '#fb923c' : '#fbbf24',
        shadow: isHovered || isSelected ? '0 0 30px rgba(251,146,60,0.6)' : '0 4px 12px rgba(251,146,60,0.4)'
      };
    } else {
      return {
        bg: isHovered || isSelected ? '#60a5fa' : '#2f6bff',
        border: isHovered || isSelected ? '#93c5fd' : '#60a5fa',
        shadow: isHovered || isSelected ? '0 0 30px rgba(47,107,255,0.5)' : '0 4px 12px rgba(47,107,255,0.3)'
      };
    }
  };

  // Memoize section calculations to avoid re-rendering on every state change
  const lowerBowlSections = useMemo(() => {
    return [...Array(16)].map((_, i) => {
      const angle = (i / 16) * 360;
      const radius = 190;
      const x = Math.cos((angle * Math.PI) / 180) * radius;
      const y = Math.sin((angle * Math.PI) / 180) * radius;
      return { x, y, angle, sectionData: sections[i % 8], key: `lower-${i}` };
    });
  }, []);

  const clubLevelSections = useMemo(() => {
    return [...Array(12)].map((_, i) => {
      const angle = (i / 12) * 360;
      const radius = 260;
      const x = Math.cos((angle * Math.PI) / 180) * radius;
      const y = Math.sin((angle * Math.PI) / 180) * radius;
      return { x, y, angle, sectionData: sections[8 + (i % 4)], key: `club-${i}` };
    });
  }, []);

  const upperBowlSections = useMemo(() => {
    return [...Array(20)].map((_, i) => {
      const angle = (i / 20) * 360;
      const radius = 330;
      const x = Math.cos((angle * Math.PI) / 180) * radius;
      const y = Math.sin((angle * Math.PI) / 180) * radius;
      return { x, y, angle, sectionData: sections[12 + (i % 4)], key: `upper-${i}` };
    });
  }, []);

  return (
    <div className="py-8 relative overflow-hidden">
      {/* Simplified Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a1a] to-black pointer-events-none" />

      <style>{`
        @keyframes pulse-subtle {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <h2 className="text-5xl font-bold mb-4 flex items-center gap-3 text-white">
          <Layers className="w-12 h-12 text-[#2f6bff]" />
          NECS 2026 Championship Arena
        </h2>
        <p className="text-gray-400 mb-8 text-lg">Interactive 3D Esports Stadium Experience</p>

        {/* Controls */}
        <div className="mb-8 bg-gradient-to-br from-[#0a0a0a]/90 to-[#1a1a2a]/80 backdrop-blur-md border border-[#2f6bff]/30 rounded-xl p-6 shadow-2xl">
          <h3 className="font-bold mb-4 flex items-center gap-2 text-[#2f6bff]">
            <Eye className="w-5 h-5" />
            View Controls
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* View Presets */}
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-400">Camera Views</label>
              <div className="flex flex-wrap gap-2">
                {(['default', 'top', 'side', 'front'] as const).map(view => (
                  <button
                    key={view}
                    onClick={() => setView(view)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      activeView === view
                        ? 'bg-[#2f6bff] text-white shadow-lg'
                        : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a] border border-gray-700'
                    }`}
                  >
                    {view.charAt(0).toUpperCase() + view.slice(1)}
                  </button>
                ))}
              </div>

              <div className="mt-4">
                <button
                  onClick={() => setShowMiniMap(!showMiniMap)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    showMiniMap
                      ? 'bg-gradient-to-r from-[#fb923c] to-[#ea580c] text-white'
                      : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a] border border-gray-700'
                  }`}
                >
                  <Map className="w-4 h-4" />
                  Mini-Map
                </button>
              </div>
            </div>

            {/* Manual Rotation */}
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-400">Manual Rotation</label>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Horizontal: {rotationY}°</span>
                  </div>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={rotationY}
                    onChange={(e) => {
                      setRotationY(Number(e.target.value));
                      setActiveView('default');
                    }}
                    className="w-full h-2 bg-[#1a1a1a] rounded-lg appearance-none cursor-pointer accent-[#2f6bff]"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Vertical: {rotationX}°</span>
                  </div>
                  <input
                    type="range"
                    min="-90"
                    max="90"
                    value={rotationX}
                    onChange={(e) => {
                      setRotationX(Number(e.target.value));
                      setActiveView('default');
                    }}
                    className="w-full h-2 bg-[#1a1a1a] rounded-lg appearance-none cursor-pointer accent-[#fb923c]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Zoom Controls */}
          <div className="mt-6 pt-6 border-t border-[#2f6bff]/20">
            <label className="block text-sm font-semibold mb-3 text-gray-400">Zoom: {Math.round(zoom * 100)}%</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                className="p-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-lg transition-colors border border-gray-700"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="flex-1 h-2 bg-[#1a1a1a] rounded-lg appearance-none cursor-pointer accent-[#2f6bff]"
              />
              <button
                onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                className="p-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-lg transition-colors border border-gray-700"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  setView('default');
                  setZoom(1);
                }}
                className="p-2 bg-gradient-to-r from-[#fb923c] to-[#ea580c] hover:from-[#ea580c] hover:to-[#fb923c] rounded-lg transition-all shadow-lg"
              >
                <RotateCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Visualization Container */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* 3D Arena Visualization */}
          <div className="lg:col-span-3 bg-gradient-to-br from-black/90 via-[#0a0a2a]/80 to-black/90 backdrop-blur-md border border-[#2f6bff]/30 rounded-xl p-8 overflow-hidden relative shadow-2xl">
            {/* 3D Scene */}
            <div 
              className="relative mx-auto"
              style={{ 
                perspective: '2000px',
                height: '700px',
                maxWidth: '900px'
              }}
            >
              <div
                className="relative w-full h-full transition-transform duration-700 ease-out"
                style={{
                  transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(${zoom})`,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform'
                }}
              >
                {/* Esports Stage - Simplified */}
                <div
                  className="absolute top-1/2 left-1/2"
                  style={{
                    transform: 'translate(-50%, -50%) translateZ(-40px)',
                    transformStyle: 'preserve-3d',
                    width: '240px',
                    height: '320px',
                    willChange: 'transform'
                  }}
                >
                  {/* Main Stage Platform */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2f6bff] via-[#1a1a4a] to-[#fb923c] rounded-2xl border-4 border-[#fb923c] shadow-2xl overflow-hidden"
                    style={{
                      boxShadow: '0 0 60px rgba(251, 146, 60, 0.6), 0 0 100px rgba(47, 107, 255, 0.3)'
                    }}
                  >
                    {/* Center Logo */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-[#fb923c] via-[#2f6bff] to-[#fb923c] flex items-center justify-center"
                        style={{ boxShadow: '0 0 40px rgba(251, 146, 60, 0.8)', animation: 'pulse-subtle 3s ease-in-out infinite' }}
                      >
                        <div className="text-center">
                          <div className="text-sm font-bold text-white">NECS</div>
                          <div className="text-xs text-white">2026</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lower Bowl - Simplified 3D Blocks */}
                {lowerBowlSections.map(({ x, y, angle, sectionData, key }) => {
                  const isHovered = hoveredSection?.id === sectionData?.id;
                  const isSelected = selectedSection?.id === sectionData?.id;
                  const colors = getTierColors('premium', isHovered, isSelected);
                  
                  return (
                    <div
                      key={key}
                      className="absolute top-1/2 left-1/2 cursor-pointer transition-all duration-200"
                      style={{
                        transform: `translate(-50%, -50%) translate(${x}px, ${y}px) translateZ(${isHovered ? 25 : 0}px) rotateZ(${angle}deg)`,
                        transformStyle: 'preserve-3d',
                        width: '32px',
                        height: '55px',
                        zIndex: isHovered ? 100 : 1,
                        willChange: isHovered ? 'transform' : 'auto'
                      }}
                      onMouseEnter={() => sectionData && setHoveredSection(sectionData)}
                      onMouseLeave={() => setHoveredSection(null)}
                      onClick={() => sectionData && setSelectedSection(sectionData)}
                    >
                      {/* Simplified single face with shadow effect */}
                      <div 
                        className="absolute inset-0 rounded-lg border-2 transition-all duration-200"
                        style={{
                          backgroundColor: colors.bg,
                          borderColor: colors.border,
                          boxShadow: colors.shadow,
                          transform: 'translateZ(15px)'
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg" />
                        <div className="text-[9px] text-center mt-2 font-bold text-white drop-shadow-lg">
                          {sectionData?.id}
                        </div>
                        {sectionData?.recommended && (
                          <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                            <Star className="w-3 h-3 text-yellow-300 fill-yellow-300" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Club Level - Simplified VIP Blocks */}
                {clubLevelSections.map(({ x, y, angle, sectionData, key }) => {
                  const isHovered = hoveredSection?.id === sectionData?.id;
                  const isSelected = selectedSection?.id === sectionData?.id;
                  const colors = getTierColors('vip', isHovered, isSelected);
                  
                  return (
                    <div
                      key={key}
                      className="absolute top-1/2 left-1/2 cursor-pointer transition-all duration-200"
                      style={{
                        transform: `translate(-50%, -50%) translate(${x}px, ${y}px) translateZ(${isHovered ? 100 : 85}px) rotateZ(${angle}deg)`,
                        transformStyle: 'preserve-3d',
                        width: '40px',
                        height: '48px',
                        zIndex: isHovered ? 100 : 2,
                        willChange: isHovered ? 'transform' : 'auto'
                      }}
                      onMouseEnter={() => sectionData && setHoveredSection(sectionData)}
                      onMouseLeave={() => setHoveredSection(null)}
                      onClick={() => sectionData && setSelectedSection(sectionData)}
                    >
                      <div 
                        className="absolute inset-0 rounded-t-xl border-2 transition-all duration-200"
                        style={{
                          backgroundColor: colors.bg,
                          borderColor: colors.border,
                          boxShadow: colors.shadow,
                          transform: 'translateZ(20px)'
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-t-xl" />
                        <div className="text-[8px] text-center mt-1 font-bold text-purple-200">VIP</div>
                        <div className="text-[9px] text-center text-white font-bold">{sectionData?.id}</div>
                        {sectionData?.recommended && (
                          <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                            <Sparkles className="w-3 h-3 text-yellow-300 fill-yellow-300" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Upper Bowl - Simplified Standard Blocks */}
                {upperBowlSections.map(({ x, y, angle, sectionData, key }) => {
                  const isHovered = hoveredSection?.id === sectionData?.id;
                  const isSelected = selectedSection?.id === sectionData?.id;
                  const colors = getTierColors('standard', isHovered, isSelected);
                  
                  return (
                    <div
                      key={key}
                      className="absolute top-1/2 left-1/2 cursor-pointer transition-all duration-200"
                      style={{
                        transform: `translate(-50%, -50%) translate(${x}px, ${y}px) translateZ(${isHovered ? 175 : 165}px) rotateZ(${angle}deg)`,
                        transformStyle: 'preserve-3d',
                        width: '36px',
                        height: '60px',
                        zIndex: isHovered ? 100 : 3,
                        willChange: isHovered ? 'transform' : 'auto'
                      }}
                      onMouseEnter={() => sectionData && setHoveredSection(sectionData)}
                      onMouseLeave={() => setHoveredSection(null)}
                      onClick={() => sectionData && setSelectedSection(sectionData)}
                    >
                      <div 
                        className="absolute inset-0 rounded-lg border-2 transition-all duration-200"
                        style={{
                          backgroundColor: colors.bg,
                          borderColor: colors.border,
                          boxShadow: colors.shadow,
                          transform: 'translateZ(17px)'
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent rounded-lg" />
                        <div className="text-[9px] text-center mt-2 font-bold text-white drop-shadow-lg">
                          {sectionData?.id}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Legend */}
            <div className="bg-gradient-to-br from-[#0a0a0a]/90 to-[#1a1a2a]/80 backdrop-blur-md border border-[#2f6bff]/30 rounded-xl p-6 shadow-2xl">
              <h3 className="font-bold mb-4 flex items-center gap-2 text-[#2f6bff]">
                <Maximize2 className="w-5 h-5" />
                Seating Tiers
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-900/40 to-transparent rounded-lg border border-purple-500/20">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 border-2 border-purple-400 rounded-lg shadow-lg"
                    style={{ boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)' }}
                  />
                  <div>
                    <div className="font-semibold text-sm text-purple-400">VIP Suites</div>
                    <div className="text-xs text-gray-400">$299-$349</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-900/40 to-transparent rounded-lg border border-orange-500/20">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-700 border-2 border-orange-400 rounded-lg shadow-lg"
                    style={{ boxShadow: '0 0 20px rgba(251, 146, 60, 0.5)' }}
                  />
                  <div>
                    <div className="font-semibold text-sm text-orange-400">Lower Bowl</div>
                    <div className="text-xs text-gray-400">$159-$199</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-900/40 to-transparent rounded-lg border border-blue-500/20">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 border-2 border-blue-400 rounded-lg shadow-lg"
                    style={{ boxShadow: '0 0 20px rgba(47, 107, 255, 0.4)' }}
                  />
                  <div>
                    <div className="font-semibold text-sm text-blue-400">Upper Bowl</div>
                    <div className="text-xs text-gray-400">$69-$89</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mini-Map */}
            {showMiniMap && (
              <div className="bg-gradient-to-br from-[#0a0a0a]/90 to-[#1a1a2a]/80 backdrop-blur-md border border-[#fb923c]/30 rounded-xl p-6 shadow-2xl">
                <h3 className="font-bold mb-4 flex items-center gap-2 text-[#fb923c]">
                  <Map className="w-5 h-5" />
                  Arena Map
                </h3>
                
                <div className="relative w-full aspect-square bg-gradient-to-br from-gray-900 to-black rounded-xl border border-[#fb923c]/30 p-6">
                  {/* Stage */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-20 bg-gradient-to-br from-[#2f6bff] to-[#fb923c] border-2 border-[#fb923c] rounded-lg"
                    style={{ boxShadow: '0 0 20px rgba(251, 146, 60, 0.6)' }}
                  />
                  
                  {/* Lower bowl */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-36 border-4 border-orange-500 rounded-full" />
                  
                  {/* Club level */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-44 border-4 border-purple-500 rounded-full" />
                  
                  {/* Upper bowl */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-52 border-4 border-blue-500 rounded-full" />
                </div>
              </div>
            )}

            {/* Selected Section */}
            {selectedSection && (
              <div className="bg-gradient-to-br from-[#fb923c]/20 to-[#ea580c]/20 backdrop-blur-md border-2 border-[#fb923c] rounded-xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-[#fb923c] flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Selected
                  </h3>
                  {selectedSection.recommended && (
                    <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-orange-500 px-2 py-1 rounded-full text-xs font-bold">
                      <Star className="w-3 h-3" />
                      BEST
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="font-bold text-xl text-white">{selectedSection.name}</div>
                  <div className="text-sm text-gray-300">{selectedSection.level}</div>
                  
                  <div className="pt-3 border-t border-[#fb923c]/30 space-y-2">
                    <div className="flex justify-between text-sm p-2 bg-black/30 rounded">
                      <span className="text-gray-400">Available:</span>
                      <span className={`font-semibold ${selectedSection.available < 50 ? 'text-red-400' : 'text-green-400'}`}>
                        {selectedSection.available} seats
                      </span>
                    </div>
                    <div className="flex justify-between text-sm p-2 bg-black/30 rounded">
                      <span className="text-gray-400">View Quality:</span>
                      <span className="font-semibold text-green-400">{selectedSection.viewQuality}%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-900/60 to-emerald-900/60 rounded-lg border border-green-500/40">
                      <span className="text-gray-300 font-semibold">Price:</span>
                      <span className="text-3xl font-bold text-green-400">${selectedSection.price}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedSection(null)}
                    className="w-full mt-4 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-semibold transition-all border border-gray-600"
                  >
                    Clear Selection
                  </button>
                </div>
              </div>
            )}

            {/* Recommended Sections */}
            <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 backdrop-blur-md border border-green-500/30 rounded-xl p-6 shadow-2xl">
              <h3 className="font-bold text-green-400 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Best Views
              </h3>
              <div className="space-y-2 text-sm">
                {sections.filter(s => s.recommended).map(section => (
                  <button
                    key={section.id}
                    onClick={() => setSelectedSection(section)}
                    className="w-full p-3 bg-black/30 hover:bg-black/50 rounded-lg transition-all text-left border border-green-500/20 hover:border-green-500/40"
                  >
                    <div className="font-semibold text-white flex items-center justify-between">
                      <span>{section.name}</span>
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      ${section.price} • {section.viewQuality}% view
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}