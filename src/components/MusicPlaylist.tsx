import { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import musicImage from "../assets/84a1c6e9734c44b861e34c9817e6a2d0b6ba1080.png";

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  album: string;
  genre: string;
}

const playlist: Track[] = [
  { id: 1, title: "Championship Anthem", artist: "NECS Orchestra", duration: "3:45", album: "NECS 2026", genre: "Electronic" },
  { id: 2, title: "Victory Rush", artist: "The Gamers", duration: "4:12", album: "Esports Legends", genre: "Electronic" },
  { id: 3, title: "Battle Mode", artist: "Digital Warriors", duration: "3:30", album: "Arena Sounds", genre: "Rock" },
  { id: 4, title: "Neon Lights", artist: "Cyber Pulse", duration: "4:05", album: "Future Beats", genre: "Electronic" },
  { id: 5, title: "Final Round", artist: "Tournament Kings", duration: "3:58", album: "Champions Rise", genre: "Hip Hop" },
  { id: 6, title: "Keyboard Warriors", artist: "The Mechanics", duration: "3:22", album: "Gaming Hits", genre: "Rock" },
  { id: 7, title: "Level Up", artist: "Power Players", duration: "4:30", album: "Achievement Unlocked", genre: "Electronic" },
  { id: 8, title: "Clutch Moment", artist: "Pro Squad", duration: "3:15", album: "Competitive Edge", genre: "Hip Hop" },
  { id: 9, title: "Respawn", artist: "Digital Souls", duration: "4:20", album: "Never Give Up", genre: "Electronic" },
  { id: 10, title: "GG WP", artist: "Sportsmanship Crew", duration: "3:40", album: "Good Game", genre: "Pop" },
  { id: 11, title: "Main Theme", artist: "NECS Composers", duration: "5:00", album: "NECS 2026", genre: "Orchestral" },
  { id: 12, title: "Hype Train", artist: "Crowd Control", duration: "3:50", album: "Arena Anthems", genre: "Electronic" },
  { id: 13, title: "Ace", artist: "Tactical Moves", duration: "3:35", album: "Perfect Plays", genre: "Rock" },
  { id: 14, title: "MVP", artist: "Star Players", duration: "4:10", album: "Hall of Fame", genre: "Hip Hop" },
  { id: 15, title: "Grand Finals", artist: "Championship Sound", duration: "4:45", album: "Ultimate Showdown", genre: "Orchestral" },
];

export function MusicPlaylist() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('All');

  const genres = ["All", "Electronic", "Rock", "Hip Hop", "Pop", "Orchestral"];

  const filteredPlaylist = selectedGenre === 'All' 
    ? playlist 
    : playlist.filter(track => track.genre === selectedGenre);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % filteredPlaylist.length);
  };

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + filteredPlaylist.length) % filteredPlaylist.length);
  };

  const currentSong = filteredPlaylist[currentTrack] || playlist[0];

  return (
    <div className="min-h-screen pt-20 px-8 pb-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">Official Playlist</h1>
        <p className="text-gray-400 mb-8">Curated sounds for the championship</p>

        {/* Now Playing Card */}
        <div className="bg-gradient-to-br from-[#2f6bff] to-[#1a4ed6] rounded-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Album Art */}
            <div className="aspect-square bg-black rounded-lg flex items-center justify-center border-2 border-yellow-500 p-4 overflow-hidden">
              <img 
                src={musicImage}
                alt={currentSong.album}
                className="w-full h-full object-cover rounded"
              />
            </div>

            {/* Track Info and Controls */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="text-sm opacity-70 mb-2">NOW PLAYING</div>
                <h2 className="text-3xl font-bold mb-2">{currentSong.title}</h2>
                <p className="text-xl opacity-80 mb-4">{currentSong.artist}</p>
                <div className="flex gap-3 mb-6">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{currentSong.genre}</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{currentSong.duration}</span>
                </div>
              </div>

              {/* Controls */}
              <div>
                {/* Progress Bar */}
                <div className="bg-white/20 rounded-full h-2 mb-6">
                  <div className="bg-white rounded-full h-2 w-1/3" />
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-center gap-6">
                  <button 
                    onClick={handlePrevious}
                    className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handlePlayPause}
                    className="w-16 h-16 rounded-full bg-white hover:bg-white/90 transition-colors flex items-center justify-center text-[#2f6bff]"
                  >
                    {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
                  </button>
                  <button 
                    onClick={handleNext}
                    className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>
                  <button className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center">
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Genre Filter */}
        <div className="flex gap-4 mb-8">
          {genres.map(genre => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedGenre === genre
                  ? 'bg-[#2f6bff] text-white'
                  : 'bg-[#1a1a1a] text-gray-400 hover:text-white'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Playlist */}
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#1a1a1a]">
            <h3 className="font-bold">Full Playlist</h3>
            <p className="text-sm text-gray-400">{filteredPlaylist.length} tracks</p>
          </div>
          
          <div className="divide-y divide-[#1a1a1a]">
            {filteredPlaylist.map((track, index) => (
              <button
                key={track.id}
                onClick={() => setCurrentTrack(index)}
                className={`w-full p-4 hover:bg-[#1a1a1a] transition-colors flex items-center gap-4 text-left ${
                  currentTrack === index ? 'bg-[#1a1a1a]' : ''
                }`}
              >
                <div className="w-8 text-center text-gray-500 font-mono text-sm">
                  {currentTrack === index && isPlaying ? (
                    <div className="flex gap-1 justify-center">
                      <div className="w-1 h-4 bg-[#2f6bff] animate-pulse" />
                      <div className="w-1 h-4 bg-[#2f6bff] animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <div className="w-1 h-4 bg-[#2f6bff] animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`font-semibold truncate ${currentTrack === index ? 'text-[#2f6bff]' : ''}`}>
                    {track.title}
                  </div>
                  <div className="text-sm text-gray-400 truncate">{track.artist}</div>
                </div>
                <div className="text-sm text-gray-400 hidden md:block">{track.album}</div>
                <div className="text-sm text-gray-500">{track.duration}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Streaming Links */}
        <div className="mt-12 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Listen on Your Favorite Platform</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="bg-[#1a1a1a] hover:bg-[#2f6bff] transition-colors p-4 rounded-lg font-semibold">
              Spotify
            </button>
            <button className="bg-[#1a1a1a] hover:bg-[#2f6bff] transition-colors p-4 rounded-lg font-semibold">
              Apple Music
            </button>
            <button className="bg-[#1a1a1a] hover:bg-[#2f6bff] transition-colors p-4 rounded-lg font-semibold">
              YouTube Music
            </button>
            <button className="bg-[#1a1a1a] hover:bg-[#2f6bff] transition-colors p-4 rounded-lg font-semibold">
              SoundCloud
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}