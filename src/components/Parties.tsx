import { Users, Plus, MessageCircle, Calendar, MapPin, Crown, Star, Search, Filter, Send, Mic, Video, Share2, Volume2, Settings as SettingsIcon, X, Phone, PhoneOff, MapPinIcon } from 'lucide-react';
import { useState } from 'react';
import { useToast } from './ui/toast';

interface Party {
  id: string;
  name: string;
  host: string;
  members: number;
  maxMembers: number;
  game: string;
  date: string;
  location: string;
  description: string;
  isPublic: boolean;
  tags: string[];
  hostAvatar?: string;
}

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  isOwn: boolean;
}

const mockParties: Party[] = [
  {
    id: '1',
    name: 'Valorant Watch Party - Finals',
    host: 'ProGamer123',
    members: 12,
    maxMembers: 20,
    game: 'Valorant',
    date: 'May 10, 3:00 PM',
    location: 'Section 118',
    description: 'Join us for the grand finals! We have great seats and awesome energy. Bring snacks!',
    isPublic: true,
    tags: ['Finals', 'Casual', 'All Welcome']
  },
  {
    id: '2',
    name: 'Rocket League Hype Squad',
    host: 'RocketFan99',
    members: 8,
    maxMembers: 15,
    game: 'Rocket League',
    date: 'May 9, 5:00 PM',
    location: 'Section 204',
    description: 'Die-hard Rocket League fans! Let\'s cheer our teams to victory together.',
    isPublic: true,
    tags: ['Competitive', 'Hype', '18+']
  },
  {
    id: '3',
    name: 'Smash Bros Community Meetup',
    host: 'SmashKing',
    members: 15,
    maxMembers: 25,
    game: 'Super Smash Bros',
    date: 'May 8, 8:00 PM',
    location: 'VIP Lounge',
    description: 'VIP members only! Network with other Smash enthusiasts and enjoy exclusive viewing.',
    isPublic: false,
    tags: ['VIP', 'Networking', 'Exclusive']
  },
  {
    id: '4',
    name: 'Multi-Game Social Group',
    host: 'GamerGal',
    members: 20,
    maxMembers: 30,
    game: 'All Games',
    date: 'May 8-10',
    location: 'Various',
    description: 'Casual group for all tournament days! Meet new friends and enjoy all games together.',
    isPublic: true,
    tags: ['Social', 'All Games', 'Casual']
  },
  {
    id: '5',
    name: 'Content Creator Meetup',
    host: 'StreamerPro',
    members: 6,
    maxMembers: 10,
    game: 'All Games',
    date: 'May 9, 12:00 PM',
    location: 'Media Area',
    description: 'For content creators and streamers covering NECS 2026. Network and collaborate!',
    isPublic: false,
    tags: ['Creators', 'Networking', 'Professional']
  }
];

const initialMessages: ChatMessage[] = [
  { id: '1', sender: 'ProGamer123', message: 'Welcome everyone! So hyped for the finals!', timestamp: '2:30 PM', isOwn: false },
  { id: '2', sender: 'GamerDude', message: 'This is going to be epic! Who\'s your pick to win?', timestamp: '2:32 PM', isOwn: false },
  { id: '3', sender: 'You', message: 'Let\'s go Team Liquid! 💙', timestamp: '2:35 PM', isOwn: true },
];

export function Parties() {
  const toast = useToast();
  const [parties] = useState<Party[]>(mockParties);
  const [searchQuery, setSearchQuery] = useState('');
  const [gameFilter, setGameFilter] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedParty, setSelectedParty] = useState<Party | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const games = ['All', 'Valorant', 'Rocket League', 'Super Smash Bros', 'All Games'];

  const filteredParties = parties.filter(party => {
    const matchesSearch = party.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         party.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         party.host.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGame = gameFilter === 'All' || party.game === gameFilter;
    return matchesSearch && matchesGame;
  });

  const handleJoinParty = (party: Party) => {
    if (party.members < party.maxMembers) {
      setSelectedParty(party);
      setShowChat(true);
      toast.success(`Joined ${party.name}! 🎉`);
    } else {
      toast.error('This party is full!');
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        sender: 'You',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        isOwn: true
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const toggleVoice = () => {
    setIsVoiceActive(!isVoiceActive);
    toast.success(isVoiceActive ? 'Voice chat disabled' : 'Voice chat enabled 🎤');
  };

  const toggleVideo = () => {
    setIsVideoActive(!isVideoActive);
    toast.success(isVideoActive ? 'Video disabled' : 'Video enabled 📹');
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    toast.success(isScreenSharing ? 'Screen sharing stopped' : 'Screen sharing started 📺');
  };

  return (
    <div className="min-h-screen pt-20 px-8 pb-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-5xl font-bold flex items-center gap-3">
              <Users className="w-12 h-12 text-[#2f6bff]" />
              Parties
              <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">NEW</span>
            </h1>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-[#2f6bff] hover:bg-[#2557d6] rounded-lg font-bold transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Party
            </button>
          </div>
          <p className="text-gray-400 text-xl">Connect with other attendees and watch tournaments together</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6 text-center">
            <Users className="w-8 h-8 text-[#2f6bff] mx-auto mb-2" />
            <div className="text-3xl font-bold mb-1">{parties.length}</div>
            <div className="text-gray-400">Active Parties</div>
          </div>
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6 text-center">
            <Star className="w-8 h-8 text-[#fb923c] mx-auto mb-2" />
            <div className="text-3xl font-bold mb-1">500+</div>
            <div className="text-gray-400">Total Members</div>
          </div>
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6 text-center">
            <MessageCircle className="w-8 h-8 text-[#10b981] mx-auto mb-2" />
            <div className="text-3xl font-bold mb-1">2.4K</div>
            <div className="text-gray-400">Messages Sent</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search parties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg pl-12 pr-4 py-3 text-white focus:border-[#2f6bff] focus:outline-none transition-colors"
            />
          </div>

          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {games.map(game => (
                <button
                  key={game}
                  onClick={() => setGameFilter(game)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    gameFilter === game
                      ? 'bg-[#2f6bff] text-white'
                      : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a] hover:text-white'
                  }`}
                >
                  {game}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Parties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredParties.map(party => (
            <div
              key={party.id}
              className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6 hover:border-[#2f6bff] transition-all cursor-pointer"
              onClick={() => setSelectedParty(party)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">{party.name}</h3>
                    {!party.isPublic && <Crown className="w-5 h-5 text-[#fb923c]" />}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-8 h-8 bg-[#2f6bff] rounded-full flex items-center justify-center font-bold text-sm">
                      {party.host.charAt(0).toUpperCase()}
                    </div>
                    <span>Hosted by <span className="text-white font-semibold">{party.host}</span></span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-[#fb923c]">
                    {party.members}/{party.maxMembers}
                  </div>
                  <div className="text-xs text-gray-400">members</div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{party.description}</p>

              {/* Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-[#2f6bff]" />
                  <span className="text-gray-400">{party.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-[#fb923c]" />
                  <span className="text-gray-400">{party.location}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {party.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full text-xs font-semibold text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleJoinParty(party);
                }}
                className={`w-full py-2 rounded-lg font-bold transition-all ${
                  party.members >= party.maxMembers
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-[#2f6bff] hover:bg-[#2557d6] text-white'
                }`}
                disabled={party.members >= party.maxMembers}
              >
                {party.members >= party.maxMembers ? 'Party Full' : 'Join Party'}
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredParties.length === 0 && (
          <div className="text-center py-16">
            <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No parties found</h3>
            <p className="text-gray-400 mb-6">Be the first to create a party for this event!</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-[#2f6bff] hover:bg-[#2557d6] rounded-lg font-bold transition-all inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Party
            </button>
          </div>
        )}

        {/* Party Chat Modal */}
        {showChat && selectedParty && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#0a0a0a] border-2 border-[#2f6bff] rounded-xl max-w-5xl w-full h-[90vh] flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-[#1a1a1a] flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    {selectedParty.name}
                    {!selectedParty.isPublic && <Crown className="w-6 h-6 text-[#fb923c]" />}
                  </h2>
                  <p className="text-sm text-gray-400">{selectedParty.members} members online</p>
                </div>
                <button
                  onClick={() => { setShowChat(false); setSelectedParty(null); }}
                  className="w-10 h-10 flex items-center justify-center hover:bg-[#1a1a1a] rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Voice/Video Controls */}
              <div className="px-6 py-4 border-b border-[#1a1a1a] bg-[#0f0f0f]">
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleVoice}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                      isVoiceActive ? 'bg-[#10b981] text-white' : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a]'
                    }`}
                  >
                    {isVoiceActive ? <PhoneOff className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                    {isVoiceActive ? 'Leave Voice' : 'Join Voice'}
                  </button>
                  <button
                    onClick={toggleVideo}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                      isVideoActive ? 'bg-[#2f6bff] text-white' : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a]'
                    }`}
                    disabled={!isVoiceActive}
                  >
                    <Video className="w-4 h-4" />
                    Video
                  </button>
                  <button
                    onClick={toggleScreenShare}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                      isScreenSharing ? 'bg-[#fb923c] text-white' : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a]'
                    }`}
                    disabled={!isVoiceActive}
                  >
                    <Share2 className="w-4 h-4" />
                    Share Screen
                  </button>
                  <div className="flex-1" />
                  <div className="flex items-center gap-2 text-sm">
                    <Volume2 className="w-4 h-4 text-[#10b981]" />
                    <span className="text-gray-400">3 in voice</span>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] ${msg.isOwn ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                      {!msg.isOwn && <span className="text-xs text-gray-400 font-semibold px-2">{msg.sender}</span>}
                      <div className={`px-4 py-2 rounded-lg ${
                        msg.isOwn
                          ? 'bg-[#2f6bff] text-white rounded-br-none'
                          : 'bg-[#1a1a1a] text-gray-100 rounded-bl-none'
                      }`}>
                        <p>{msg.message}</p>
                      </div>
                      <span className="text-xs text-gray-500 px-2">{msg.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-[#1a1a1a] bg-[#0f0f0f]">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#2f6bff] focus:outline-none transition-colors"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-6 py-3 bg-[#2f6bff] hover:bg-[#2557d6] rounded-lg font-bold transition-all flex items-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Party Detail Modal (Info Only) */}
        {selectedParty && !showChat && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#0a0a0a] border-2 border-[#2f6bff] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    {selectedParty.name}
                    {!selectedParty.isPublic && <Crown className="w-6 h-6 text-[#fb923c]" />}
                  </h2>
                  <button
                    onClick={() => setSelectedParty(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#2f6bff] rounded-full flex items-center justify-center font-bold text-lg">
                    {selectedParty.host.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Hosted by</div>
                    <div className="font-bold">{selectedParty.host}</div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Description</h4>
                    <p className="text-gray-300">{selectedParty.description}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Details</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-[#2f6bff]" />
                        <span>{selectedParty.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-[#fb923c]" />
                        <span>{selectedParty.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-[#10b981]" />
                        <span>{selectedParty.members}/{selectedParty.maxMembers} members</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedParty.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full text-sm font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleJoinParty(selectedParty)}
                    className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                      selectedParty.members >= selectedParty.maxMembers
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-[#2f6bff] hover:bg-[#2557d6] text-white'
                    }`}
                    disabled={selectedParty.members >= selectedParty.maxMembers}
                  >
                    {selectedParty.members >= selectedParty.maxMembers ? 'Party Full' : 'Join Party'}
                  </button>
                  <button
                    onClick={() => toast.info('Direct message feature coming soon!')}
                    className="px-6 py-3 bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-lg font-bold transition-all flex items-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create Party Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#0a0a0a] border-2 border-[#2f6bff] rounded-xl max-w-2xl w-full">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">Create a Party</h2>
                <p className="text-gray-400 mb-6">Connect with other attendees and enjoy NECS 2026 together!</p>
                
                <div className="text-center py-8">
                  <Plus className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">Party creation form coming soon!</p>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-6 py-3 bg-[#2f6bff] hover:bg-[#2557d6] rounded-lg font-bold transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}