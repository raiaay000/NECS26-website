import { useState } from 'react';
import { Video, X, Maximize2, Minimize2, Volume2, VolumeX, Monitor } from 'lucide-react';

interface StreamMiniPlayerProps {
  isVisible: boolean;
  onToggle: () => void;
}

export function StreamMiniPlayer({ isVisible, onToggle }: StreamMiniPlayerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedStream, setSelectedStream] = useState('main');

  const streams = [
    { id: 'main', name: 'Main Stage', url: 'https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1', viewers: '45.2K' },
    { id: 'valorant', name: 'Valorant', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1', viewers: '23.1K' },
    { id: 'rocketleague', name: 'Rocket League', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1', viewers: '18.5K' },
  ];

  const currentStream = streams.find(s => s.id === selectedStream) || streams[0];

  if (!isVisible) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-8 left-8 z-50 bg-[#2f6bff] hover:bg-[#2557d6] rounded-full p-4 shadow-2xl shadow-[#2f6bff]/50 transition-all hover:scale-110"
        title="Open Live Stream"
      >
        <Video className="w-6 h-6 text-white" />
      </button>
    );
  }

  return (
    <div
      className={`fixed z-50 bg-[#0a0a0a] border-2 border-[#2f6bff] rounded-xl shadow-2xl transition-all ${
        isExpanded
          ? 'bottom-8 left-8 right-8 top-20 max-w-none'
          : 'bottom-8 left-8 w-[400px] h-[280px]'
      }`}
    >
      {/* Header */}
      <div className="bg-[#1a1a1a] border-b border-[#2a2a2a] p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="font-bold text-sm">LIVE</span>
          <span className="text-xs text-gray-400">{currentStream.name}</span>
          <span className="text-xs text-[#10b981]">• {currentStream.viewers} viewers</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-8 h-8 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded-lg flex items-center justify-center transition-all"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-8 h-8 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded-lg flex items-center justify-center transition-all"
            title={isExpanded ? 'Minimize' : 'Maximize'}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onToggle}
            className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 rounded-lg flex items-center justify-center transition-all"
            title="Close Stream"
          >
            <X className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>

      {/* Stream Selector */}
      <div className="bg-[#0a0a0a] border-b border-[#1a1a1a] p-2 flex gap-2">
        {streams.map(stream => (
          <button
            key={stream.id}
            onClick={() => setSelectedStream(stream.id)}
            className={`flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              selectedStream === stream.id
                ? 'bg-[#2f6bff] text-white'
                : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a]'
            }`}
          >
            <Monitor className="w-3 h-3 inline-block mr-1" />
            {stream.name}
          </button>
        ))}
      </div>

      {/* Video Player */}
      <div className="relative w-full h-full bg-black">
        <iframe
          src={`${currentStream.url}${isMuted ? '&mute=1' : ''}`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Live Stream"
        />

        {/* Overlay Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="text-sm font-bold mb-1">NECS 2026 Championship</div>
          <div className="text-xs text-gray-400">Nashville, TN • Bridgestone Arena</div>
        </div>
      </div>

      {/* Chat Toggle (for expanded view) */}
      {isExpanded && (
        <div className="absolute right-4 top-20 bottom-4 w-80 bg-[#0a0a0a] border-l-2 border-[#1a1a1a] rounded-lg overflow-hidden flex flex-col">
          <div className="bg-[#1a1a1a] p-3 border-b border-[#2a2a2a] font-bold text-sm">
            Live Chat
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-xs">
            <div className="text-gray-400">Chat feature coming soon...</div>
            <div className="bg-[#1a1a1a] rounded p-2">
              <span className="font-bold text-[#2f6bff]">User123:</span>
              <span className="text-gray-300 ml-2">Amazing gameplay! 🔥</span>
            </div>
            <div className="bg-[#1a1a1a] rounded p-2">
              <span className="font-bold text-[#10b981]">ProGamer:</span>
              <span className="text-gray-300 ml-2">Let's go team!</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Global mini-player toggle button for App.tsx
export function StreamMiniPlayerToggle({ onToggle }: { onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-8 left-8 z-40 bg-[#2f6bff] hover:bg-[#2557d6] rounded-full p-4 shadow-2xl shadow-[#2f6bff]/50 transition-all hover:scale-110 group"
      title="Open Live Stream"
    >
      <Video className="w-6 h-6 text-white" />
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black/90 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Watch Live Stream
      </span>
    </button>
  );
}
