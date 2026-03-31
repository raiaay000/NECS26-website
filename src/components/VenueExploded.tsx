import { useState, useEffect, useRef } from 'react';
import { Layers, MapPin, Users, Trophy, Sparkles } from 'lucide-react';

export function VenueExploded() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how much of the component is in view
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / viewportHeight));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate transformations based on scroll progress
  const getLayerStyle = (layer: number) => {
    const maxOffset = 150;
    const rotation = scrollProgress * 5;
    const offset = scrollProgress * maxOffset * layer;
    const opacity = 0.3 + (scrollProgress * 0.7);
    
    return {
      transform: `
        translateY(${-offset}px) 
        translateZ(${offset}px)
        rotateX(${rotation}deg)
        scale(${1 + (scrollProgress * 0.1 * layer)})
      `,
      opacity: opacity,
      zIndex: 10 - layer
    };
  };

  return (
    <div ref={containerRef} className="min-h-screen py-20 px-8 bg-gradient-to-b from-black via-[#0a0a0a] to-black relative overflow-hidden">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-16 text-center">
        <h2 className="text-5xl font-bold mb-4 flex items-center justify-center gap-3">
          <Layers className="w-12 h-12 text-[#2f6bff]" />
          Bridgestone Arena
        </h2>
        <p className="text-xl text-gray-400">Scroll to explore the venue layers</p>
        <div className="mt-4 text-sm text-[#fb923c] font-semibold">
          {Math.round(scrollProgress * 100)}% Exploded
        </div>
      </div>

      {/* 3D Venue Container */}
      <div className="relative max-w-4xl mx-auto h-[600px]" style={{ perspective: '1500px' }}>
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(#2f6bff 1px, transparent 1px), linear-gradient(90deg, #2f6bff 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Layer 4: Roof/Upper Bowl */}
        <div 
          className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out"
          style={getLayerStyle(4)}
        >
          <div className="w-[400px] h-[280px] border-4 border-[#8b5cf6] rounded-[50%] bg-gradient-to-br from-[#8b5cf6]/20 to-transparent backdrop-blur-sm relative">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center">
              <Sparkles className="w-6 h-6 text-[#8b5cf6] mx-auto mb-2" />
              <div className="text-xs font-bold text-[#8b5cf6]">Upper Bowl</div>
              <div className="text-xs text-gray-400">Sections 301-333</div>
            </div>
            {/* Seats representation */}
            <div className="absolute inset-4 border-2 border-[#8b5cf6]/50 rounded-[50%]" />
            <div className="absolute inset-8 border border-[#8b5cf6]/30 rounded-[50%]" />
          </div>
        </div>

        {/* Layer 3: Club Level */}
        <div 
          className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out"
          style={getLayerStyle(3)}
        >
          <div className="w-[450px] h-[320px] border-4 border-[#ec4899] rounded-[50%] bg-gradient-to-br from-[#ec4899]/20 to-transparent backdrop-blur-sm relative">
            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center">
              <Users className="w-6 h-6 text-[#ec4899] mx-auto mb-2" />
              <div className="text-xs font-bold text-[#ec4899]">VIP Club Level</div>
              <div className="text-xs text-gray-400">Premium Seating</div>
            </div>
            {/* VIP seats */}
            <div className="absolute inset-6 border-2 border-[#ec4899]/50 rounded-[50%]" />
            <div className="absolute inset-10 border border-[#ec4899]/30 rounded-[50%]" />
          </div>
        </div>

        {/* Layer 2: Lower Bowl */}
        <div 
          className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out"
          style={getLayerStyle(2)}
        >
          <div className="w-[500px] h-[360px] border-4 border-[#10b981] rounded-[50%] bg-gradient-to-br from-[#10b981]/20 to-transparent backdrop-blur-sm relative">
            <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center">
              <MapPin className="w-6 h-6 text-[#10b981] mx-auto mb-2" />
              <div className="text-xs font-bold text-[#10b981]">Lower Bowl</div>
              <div className="text-xs text-gray-400">Sections 101-120</div>
            </div>
            {/* Lower bowl seats */}
            <div className="absolute inset-8 border-2 border-[#10b981]/50 rounded-[50%]" />
            <div className="absolute inset-12 border border-[#10b981]/30 rounded-[50%]" />
          </div>
        </div>

        {/* Layer 1: Main Stage (Center) */}
        <div 
          className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out"
          style={getLayerStyle(1)}
        >
          <div className="w-[200px] h-[140px] border-4 border-[#fb923c] rounded-2xl bg-gradient-to-br from-[#fb923c]/40 to-[#2f6bff]/40 backdrop-blur-sm relative shadow-2xl shadow-[#fb923c]/50">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Trophy className="w-8 h-8 text-[#fb923c] mb-2" />
              <div className="text-sm font-bold text-[#fb923c]">Main Stage</div>
              <div className="text-xs text-gray-400">Center Ice</div>
            </div>
            {/* Stage lights effect */}
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-[#fb923c] rounded-full blur-sm animate-pulse" />
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#2f6bff] rounded-full blur-sm animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#10b981] rounded-full blur-sm animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#ec4899] rounded-full blur-sm animate-pulse" style={{ animationDelay: '1.5s' }} />
          </div>
        </div>

        {/* Layer 0: Arena Floor */}
        <div 
          className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out"
          style={getLayerStyle(0)}
        >
          <div className="w-[550px] h-[400px] border-2 border-[#2f6bff]/30 rounded-[50%] bg-gradient-to-br from-black/80 to-[#0a0a0a]/80 backdrop-blur-sm relative">
            {/* Floor markings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-xs text-gray-600 text-center">Arena Floor</div>
            </div>
          </div>
        </div>
      </div>

      {/* Layer Legend */}
      <div className="max-w-4xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#0a0a0a] border-2 border-[#8b5cf6] rounded-lg p-4 text-center">
          <Sparkles className="w-6 h-6 text-[#8b5cf6] mx-auto mb-2" />
          <div className="text-sm font-bold text-[#8b5cf6]">Upper Bowl</div>
          <div className="text-xs text-gray-400 mt-1">301-333</div>
        </div>
        
        <div className="bg-[#0a0a0a] border-2 border-[#ec4899] rounded-lg p-4 text-center">
          <Users className="w-6 h-6 text-[#ec4899] mx-auto mb-2" />
          <div className="text-sm font-bold text-[#ec4899]">VIP Club</div>
          <div className="text-xs text-gray-400 mt-1">Premium</div>
        </div>
        
        <div className="bg-[#0a0a0a] border-2 border-[#10b981] rounded-lg p-4 text-center">
          <MapPin className="w-6 h-6 text-[#10b981] mx-auto mb-2" />
          <div className="text-sm font-bold text-[#10b981]">Lower Bowl</div>
          <div className="text-xs text-gray-400 mt-1">101-120</div>
        </div>
        
        <div className="bg-[#0a0a0a] border-2 border-[#fb923c] rounded-lg p-4 text-center">
          <Trophy className="w-6 h-6 text-[#fb923c] mx-auto mb-2" />
          <div className="text-sm font-bold text-[#fb923c]">Main Stage</div>
          <div className="text-xs text-gray-400 mt-1">Center Ice</div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {scrollProgress < 0.9 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center animate-bounce">
          <div className="text-sm text-gray-400 mb-2">Keep scrolling to explode</div>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-gray-400 rounded-full" />
          </div>
        </div>
      )}
    </div>
  );
}