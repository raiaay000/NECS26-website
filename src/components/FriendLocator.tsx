import { useState } from 'react';
import { Users, MapPin, Monitor, Search, UserPlus, MessageCircle } from 'lucide-react';

interface Friend {
  id: number;
  name: string;
  avatar: string;
  location: 'arena' | 'online';
  section?: string;
  seat?: string;
  status: 'watching' | 'away' | 'busy';
}

const mockFriends: Friend[] = [
  { id: 1, name: 'Alex Chen', avatar: 'A', location: 'arena', section: '105', seat: 'Row A, Seat 12', status: 'watching' },
  { id: 2, name: 'Jordan Lee', avatar: 'J', location: 'online', status: 'watching' },
  { id: 3, name: 'Sam Rodriguez', avatar: 'S', location: 'arena', section: '201', seat: 'Row F, Seat 8', status: 'watching' },
  { id: 4, name: 'Taylor Kim', avatar: 'T', location: 'online', status: 'watching' },
  { id: 5, name: 'Morgan Davis', avatar: 'M', location: 'arena', section: '118', seat: 'Row D, Seat 15', status: 'away' },
  { id: 6, name: 'Casey Johnson', avatar: 'C', location: 'arena', section: '310', seat: 'Row B, Seat 5', status: 'watching' },
  { id: 7, name: 'Riley Brown', avatar: 'R', location: 'online', status: 'busy' },
];

export function FriendLocator() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLocation, setFilterLocation] = useState<'all' | 'arena' | 'online'>('all');
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  const filteredFriends = mockFriends.filter(friend => {
    const matchesSearch = friend.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = filterLocation === 'all' || friend.location === filterLocation;
    return matchesSearch && matchesLocation;
  });

  const arenaFriends = filteredFriends.filter(f => f.location === 'arena');
  const onlineFriends = filteredFriends.filter(f => f.location === 'online');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'watching': return 'bg-[#10b981]';
      case 'away': return 'bg-[#fb923c]';
      case 'busy': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'watching': return 'Watching';
      case 'away': return 'Away';
      case 'busy': return 'Do Not Disturb';
      default: return 'Offline';
    }
  };

  return (
    <div className="min-h-screen pt-20 px-8 pb-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            <Users className="w-12 h-12 text-[#2f6bff]" />
            Friend Watch Party Locator
          </h1>
          <p className="text-xl text-gray-400">Find your friends in the arena or online</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg pl-12 pr-4 py-3 text-white focus:border-[#2f6bff] focus:outline-none transition-colors"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilterLocation('all')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                filterLocation === 'all'
                  ? 'bg-[#2f6bff] text-white'
                  : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a]'
              }`}
            >
              All ({mockFriends.length})
            </button>
            <button
              onClick={() => setFilterLocation('arena')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                filterLocation === 'arena'
                  ? 'bg-[#2f6bff] text-white'
                  : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a]'
              }`}
            >
              <MapPin className="w-4 h-4 inline-block mr-2" />
              In Arena ({arenaFriends.length})
            </button>
            <button
              onClick={() => setFilterLocation('online')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                filterLocation === 'online'
                  ? 'bg-[#2f6bff] text-white'
                  : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a]'
              }`}
            >
              <Monitor className="w-4 h-4 inline-block mr-2" />
              Online ({onlineFriends.length})
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Friends List */}
          <div className="lg:col-span-2 space-y-4">
            {/* In Arena Section */}
            {(filterLocation === 'all' || filterLocation === 'arena') && arenaFriends.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#fb923c]" />
                  Friends in Arena
                </h3>
                <div className="space-y-3">
                  {arenaFriends.map(friend => (
                    <div
                      key={friend.id}
                      onClick={() => setSelectedFriend(friend)}
                      className={`bg-[#0a0a0a] border-2 rounded-xl p-4 cursor-pointer transition-all hover:scale-[1.02] ${
                        selectedFriend?.id === friend.id
                          ? 'border-[#2f6bff]'
                          : 'border-[#1a1a1a] hover:border-[#2f6bff]/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#2f6bff] to-[#fb923c] rounded-full flex items-center justify-center font-bold text-lg">
                            {friend.avatar}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(friend.status)} rounded-full border-2 border-[#0a0a0a]`} />
                        </div>

                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-1">{friend.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                            <MapPin className="w-4 h-4 text-[#fb923c]" />
                            Section {friend.section} • {friend.seat}
                          </div>
                          <div className="text-xs text-gray-500">{getStatusText(friend.status)}</div>
                        </div>

                        <div className="flex gap-2">
                          <button className="w-10 h-10 bg-[#1a1a1a] hover:bg-[#2f6bff] rounded-lg flex items-center justify-center transition-all">
                            <MessageCircle className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Online Section */}
            {(filterLocation === 'all' || filterLocation === 'online') && onlineFriends.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-[#2f6bff]" />
                  Friends Watching Online
                </h3>
                <div className="space-y-3">
                  {onlineFriends.map(friend => (
                    <div
                      key={friend.id}
                      onClick={() => setSelectedFriend(friend)}
                      className={`bg-[#0a0a0a] border-2 rounded-xl p-4 cursor-pointer transition-all hover:scale-[1.02] ${
                        selectedFriend?.id === friend.id
                          ? 'border-[#2f6bff]'
                          : 'border-[#1a1a1a] hover:border-[#2f6bff]/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#10b981] to-[#2f6bff] rounded-full flex items-center justify-center font-bold text-lg">
                            {friend.avatar}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(friend.status)} rounded-full border-2 border-[#0a0a0a]`} />
                        </div>

                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-1">{friend.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                            <Monitor className="w-4 h-4 text-[#2f6bff]" />
                            Watching from home
                          </div>
                          <div className="text-xs text-gray-500">{getStatusText(friend.status)}</div>
                        </div>

                        <div className="flex gap-2">
                          <button className="w-10 h-10 bg-[#1a1a1a] hover:bg-[#2f6bff] rounded-lg flex items-center justify-center transition-all">
                            <MessageCircle className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {filteredFriends.length === 0 && (
              <div className="text-center py-16">
                <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No friends found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
              </div>
            )}
          </div>

          {/* Arena Map */}
          <div className="lg:col-span-1">
            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#fb923c]" />
                Arena Map
              </h3>

              {/* Simplified Arena Map */}
              <div className="relative w-full aspect-square bg-[#1a1a1a] rounded-lg overflow-hidden">
                {/* Stage */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#fb923c] rounded-lg flex items-center justify-center text-xs font-bold">
                  STAGE
                </div>

                {/* Arena Sections */}
                <div className="absolute inset-0 p-8">
                  {/* Upper sections */}
                  <div className="text-xs text-gray-400 absolute top-4 left-1/2 -translate-x-1/2">300s</div>
                  
                  {/* Left sections */}
                  <div className="text-xs text-gray-400 absolute left-4 top-1/2 -translate-y-1/2">100s</div>
                  
                  {/* Right sections */}
                  <div className="text-xs text-gray-400 absolute right-4 top-1/2 -translate-y-1/2">100s</div>
                  
                  {/* Bottom sections */}
                  <div className="text-xs text-gray-400 absolute bottom-4 left-1/2 -translate-x-1/2">200s</div>
                </div>

                {/* Friend Markers */}
                {arenaFriends.map((friend, idx) => {
                  const angle = (idx / arenaFriends.length) * 2 * Math.PI;
                  const radius = 80;
                  const x = 50 + radius * Math.cos(angle);
                  const y = 50 + radius * Math.sin(angle);
                  
                  return (
                    <div
                      key={friend.id}
                      onClick={() => setSelectedFriend(friend)}
                      className={`absolute w-8 h-8 rounded-full cursor-pointer transition-all hover:scale-125 ${
                        selectedFriend?.id === friend.id ? 'ring-4 ring-[#2f6bff]' : ''
                      }`}
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: 'translate(-50%, -50%)',
                        background: 'linear-gradient(135deg, #2f6bff, #fb923c)'
                      }}
                      title={friend.name}
                    >
                      <div className="w-full h-full flex items-center justify-center text-xs font-bold">
                        {friend.avatar}
                      </div>
                    </div>
                  );
                })}
              </div>

              {selectedFriend && selectedFriend.location === 'arena' && (
                <div className="mt-4 p-4 bg-[#1a1a1a] rounded-lg">
                  <h4 className="font-bold mb-2">{selectedFriend.name}</h4>
                  <div className="text-sm text-gray-400 space-y-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#fb923c]" />
                      Section {selectedFriend.section}
                    </div>
                    <div className="text-xs">{selectedFriend.seat}</div>
                  </div>
                  <button className="w-full mt-3 py-2 bg-[#2f6bff] hover:bg-[#2557d6] rounded-lg text-sm font-semibold transition-all">
                    Get Directions
                  </button>
                </div>
              )}

              {selectedFriend && selectedFriend.location === 'online' && (
                <div className="mt-4 p-4 bg-[#1a1a1a] rounded-lg">
                  <h4 className="font-bold mb-2">{selectedFriend.name}</h4>
                  <div className="text-sm text-gray-400 mb-3">
                    <Monitor className="w-4 h-4 inline-block mr-2 text-[#2f6bff]" />
                    Watching from home
                  </div>
                  <button className="w-full py-2 bg-[#2f6bff] hover:bg-[#2557d6] rounded-lg text-sm font-semibold transition-all">
                    Send Message
                  </button>
                </div>
              )}
            </div>

            {/* Add Friends */}
            <div className="mt-4 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6">
              <button className="w-full py-3 bg-[#10b981] hover:bg-[#059669] rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                <UserPlus className="w-5 h-5" />
                Add Friends
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
