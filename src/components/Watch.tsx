import { useState } from 'react';
import { Youtube, Twitch, Twitter, ExternalLink, Users, Eye, Star } from 'lucide-react';

const contentCreators = [
  {
    id: 1,
    name: 'ProGamersTV',
    platform: 'YouTube',
    followers: '2.4M',
    category: 'Multi-Game',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'Premier esports coverage with live match analysis and player interviews.',
    specialty: ['Valorant', 'Rocket League', 'Smash Bros'],
    verified: true,
    socialLinks: {
      youtube: 'https://youtube.com',
      twitter: 'https://twitter.com',
      twitch: 'https://twitch.tv'
    }
  },
  {
    id: 2,
    name: 'ValorantCentral',
    platform: 'YouTube',
    followers: '1.8M',
    category: 'Valorant',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'Your go-to source for Valorant tournament coverage, highlights, and tactical breakdowns.',
    specialty: ['Valorant'],
    verified: true,
    socialLinks: {
      youtube: 'https://youtube.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    id: 3,
    name: 'RocketLeagueLive',
    platform: 'Twitch',
    followers: '890K',
    category: 'Rocket League',
    image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'Live Rocket League commentary with expert analysis and exclusive behind-the-scenes content.',
    specialty: ['Rocket League'],
    verified: true,
    socialLinks: {
      twitch: 'https://twitch.tv',
      twitter: 'https://twitter.com',
      youtube: 'https://youtube.com'
    }
  },
  {
    id: 4,
    name: 'SmashBrosDaily',
    platform: 'YouTube',
    followers: '1.2M',
    category: 'Smash Bros',
    image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'Daily Smash Bros content featuring tournament highlights, tier lists, and player spotlights.',
    specialty: ['Smash Bros'],
    verified: true,
    socialLinks: {
      youtube: 'https://youtube.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    id: 5,
    name: 'EsportsInsider',
    platform: 'YouTube',
    followers: '3.1M',
    category: 'Multi-Game',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'Breaking esports news, tournament previews, and in-depth analysis across all major titles.',
    specialty: ['Valorant', 'Rocket League', 'Smash Bros'],
    verified: true,
    socialLinks: {
      youtube: 'https://youtube.com',
      twitter: 'https://twitter.com',
      twitch: 'https://twitch.tv'
    }
  },
  {
    id: 6,
    name: 'GamingGuru',
    platform: 'Twitch',
    followers: '1.5M',
    category: 'Multi-Game',
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'Watch parties, live reactions, and post-match analysis with special guest appearances.',
    specialty: ['Valorant', 'Rocket League'],
    verified: true,
    socialLinks: {
      twitch: 'https://twitch.tv',
      youtube: 'https://youtube.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    id: 7,
    name: 'TacticalBreakdown',
    platform: 'YouTube',
    followers: '720K',
    category: 'Valorant',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'Professional-level Valorant strategy analysis and team composition breakdowns.',
    specialty: ['Valorant'],
    verified: false,
    socialLinks: {
      youtube: 'https://youtube.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    id: 8,
    name: 'RocketHighlights',
    platform: 'YouTube',
    followers: '980K',
    category: 'Rocket League',
    image: 'https://images.unsplash.com/photo-1618609378039-b572f64c5b42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'Best plays, goal compilations, and match recaps from every tournament.',
    specialty: ['Rocket League'],
    verified: true,
    socialLinks: {
      youtube: 'https://youtube.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    id: 9,
    name: 'SmashLegends',
    platform: 'Twitch',
    followers: '650K',
    category: 'Smash Bros',
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'Live tournament streams with real-time commentary and player interviews.',
    specialty: ['Smash Bros'],
    verified: false,
    socialLinks: {
      twitch: 'https://twitch.tv',
      twitter: 'https://twitter.com'
    }
  },
  {
    id: 10,
    name: 'CompetitiveGaming',
    platform: 'YouTube',
    followers: '2.8M',
    category: 'Multi-Game',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'Tournament coverage, player documentaries, and esports industry insights.',
    specialty: ['Valorant', 'Rocket League', 'Smash Bros'],
    verified: true,
    socialLinks: {
      youtube: 'https://youtube.com',
      twitter: 'https://twitter.com',
      twitch: 'https://twitch.tv'
    }
  },
  {
    id: 11,
    name: 'ClutchMoments',
    platform: 'Twitch',
    followers: '1.1M',
    category: 'Multi-Game',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'Incredible plays, epic comebacks, and unforgettable tournament moments.',
    specialty: ['Valorant', 'Rocket League', 'Smash Bros'],
    verified: true,
    socialLinks: {
      twitch: 'https://twitch.tv',
      youtube: 'https://youtube.com'
    }
  },
  {
    id: 12,
    name: 'EsportsTonight',
    platform: 'YouTube',
    followers: '1.9M',
    category: 'Multi-Game',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'Nightly esports news show covering all the action from NECS 2026.',
    specialty: ['Valorant', 'Rocket League', 'Smash Bros'],
    verified: true,
    socialLinks: {
      youtube: 'https://youtube.com',
      twitter: 'https://twitter.com'
    }
  }
];

export function Watch() {
  const [filter, setFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Multi-Game', 'Valorant', 'Rocket League', 'Smash Bros'];

  const filteredCreators = contentCreators.filter(creator => {
    const matchesFilter = filter === 'All' || creator.category === filter;
    const matchesSearch = creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          creator.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black text-white px-8 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-[#2f6bff]">Watch</span> NECS 2026
          </h1>
          <p className="text-xl text-gray-400">
            Follow your favorite content creators for exclusive coverage, highlights, and behind-the-scenes content from the tournament.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <input
            type="text"
            placeholder="Search creators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#2f6bff] focus:outline-none transition-colors"
          />

          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filter === cat
                    ? 'bg-[#2f6bff] text-white'
                    : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6 text-center">
            <Users className="w-8 h-8 text-[#2f6bff] mx-auto mb-2" />
            <div className="text-3xl font-bold text-white mb-1">{contentCreators.length}</div>
            <div className="text-gray-400">Content Creators</div>
          </div>
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6 text-center">
            <Eye className="w-8 h-8 text-[#f59e0b] mx-auto mb-2" />
            <div className="text-3xl font-bold text-white mb-1">19M+</div>
            <div className="text-gray-400">Total Followers</div>
          </div>
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6 text-center">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-white mb-1">24/7</div>
            <div className="text-gray-400">Live Coverage</div>
          </div>
        </div>

        {/* Content Creators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCreators.map(creator => (
            <div
              key={creator.id}
              className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg overflow-hidden hover:border-[#2f6bff] transition-all group"
            >
              {/* Creator Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={creator.image}
                  alt={creator.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                
                {/* Platform Badge */}
                <div className="absolute top-3 right-3">
                  {creator.platform === 'YouTube' ? (
                    <div className="bg-red-600 px-3 py-1 rounded-full flex items-center gap-1 text-xs font-bold">
                      <Youtube className="w-3 h-3" />
                      YouTube
                    </div>
                  ) : (
                    <div className="bg-purple-600 px-3 py-1 rounded-full flex items-center gap-1 text-xs font-bold">
                      <Twitch className="w-3 h-3" />
                      Twitch
                    </div>
                  )}
                </div>

                {/* Verified Badge */}
                {creator.verified && (
                  <div className="absolute top-3 left-3 bg-[#2f6bff] w-6 h-6 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                {/* Followers Count */}
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-semibold">
                  {creator.followers} followers
                </div>
              </div>

              {/* Creator Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  {creator.name}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {creator.description}
                </p>

                {/* Specialty Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {creator.specialty.map(game => (
                    <span
                      key={game}
                      className="text-xs px-2 py-1 rounded-full bg-[#1a1a1a] text-gray-300 border border-[#2a2a2a]"
                    >
                      {game}
                    </span>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex gap-3 pt-4 border-t border-[#1a1a1a]">
                  {creator.socialLinks.youtube && (
                    <a
                      href={creator.socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Youtube className="w-4 h-4" />
                    </a>
                  )}
                  {creator.socialLinks.twitch && (
                    <a
                      href={creator.socialLinks.twitch}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-gray-400 hover:text-purple-500 transition-colors"
                    >
                      <Twitch className="w-4 h-4" />
                    </a>
                  )}
                  {creator.socialLinks.twitter && (
                    <a
                      href={creator.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  <a
                    href="#"
                    className="ml-auto flex items-center gap-1 text-sm text-[#2f6bff] hover:text-[#2557d6] transition-colors font-semibold"
                  >
                    Visit Channel
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCreators.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No content creators found matching your search.</p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-[#2f6bff]/20 to-[#f59e0b]/20 border border-[#2f6bff]/30 rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Are You a Content Creator?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join our official content creator program for exclusive access, early tournament info, and special perks.
          </p>
          <button className="bg-[#2f6bff] px-8 py-3 rounded-lg font-bold hover:bg-[#2557d6] transition-all transform hover:scale-105">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}
