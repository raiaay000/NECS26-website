import { useState } from 'react';
import { Beer, Wine, Coffee, Martini, DollarSign, MapPin, Clock, Star } from 'lucide-react';

interface BarLocation {
  id: number;
  name: string;
  location: string;
  type: 'premium' | 'standard';
  hours: string;
  specialties: string[];
}

interface DrinkItem {
  id: number;
  name: string;
  category: 'beer' | 'wine' | 'cocktail' | 'non-alcoholic';
  price: number;
  description: string;
  icon: any;
}

const barLocations: BarLocation[] = [
  {
    id: 1,
    name: 'Lexus Lounge Bar',
    location: 'Club Level - West Side',
    type: 'premium',
    hours: 'Opens 90 min before event',
    specialties: ['Craft Cocktails', 'Premium Wine', 'Top Shelf Spirits']
  },
  {
    id: 2,
    name: 'Main Concourse Bar',
    location: 'Lower Bowl - South Side',
    type: 'standard',
    hours: 'Opens 60 min before event',
    specialties: ['Draft Beer', 'Well Drinks', 'Soft Drinks']
  },
  {
    id: 3,
    name: 'Club Level Bar',
    location: 'Club Level - East Side',
    type: 'premium',
    hours: 'Opens 90 min before event',
    specialties: ['Wine Selection', 'Signature Cocktails', 'Local Brews']
  },
  {
    id: 4,
    name: 'Upper Concourse Bar',
    location: 'Upper Bowl - North Side',
    type: 'standard',
    hours: 'Opens 60 min before event',
    specialties: ['Domestic Beer', 'Standard Cocktails', 'Sodas']
  },
];

const drinkMenu: DrinkItem[] = [
  { id: 1, name: 'Bud Light', category: 'beer', price: 12, description: 'Classic American lager', icon: Beer },
  { id: 2, name: 'Miller Lite', category: 'beer', price: 12, description: 'Light and refreshing', icon: Beer },
  { id: 3, name: 'Local IPA', category: 'beer', price: 15, description: 'Nashville craft beer', icon: Beer },
  { id: 4, name: 'Cabernet Sauvignon', category: 'wine', price: 18, description: 'Full-bodied red wine', icon: Wine },
  { id: 5, name: 'Chardonnay', category: 'wine', price: 16, description: 'Crisp white wine', icon: Wine },
  { id: 6, name: 'Prosecco', category: 'wine', price: 20, description: 'Italian sparkling wine', icon: Wine },
  { id: 7, name: 'Whiskey Sour', category: 'cocktail', price: 16, description: 'Classic bourbon cocktail', icon: Martini },
  { id: 8, name: 'Margarita', category: 'cocktail', price: 16, description: 'Tequila with lime', icon: Martini },
  { id: 9, name: 'Nashville Mule', category: 'cocktail', price: 18, description: 'Local twist on Moscow Mule', icon: Martini },
  { id: 10, name: 'Coca-Cola', category: 'non-alcoholic', price: 6, description: 'Classic soft drink', icon: Coffee },
  { id: 11, name: 'Red Bull', category: 'non-alcoholic', price: 8, description: 'Energy drink', icon: Coffee },
  { id: 12, name: 'Water', category: 'non-alcoholic', price: 5, description: 'Bottled water', icon: Coffee },
];

export function OnBar() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);

  const filteredDrinks = selectedCategory === 'all' 
    ? drinkMenu 
    : drinkMenu.filter(drink => drink.category === selectedCategory);

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <Beer className="w-10 h-10 text-[#fb923c]" />
          On Bar
        </h2>
        <p className="text-gray-400 mb-8 text-lg">Premium drinks and cocktails available throughout the arena</p>

        {/* Bar Locations */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Bar Locations</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {barLocations.map((bar) => (
              <div
                key={bar.id}
                onClick={() => setSelectedLocation(bar.id)}
                className={`bg-[#0a0a0a] border-2 rounded-xl p-6 cursor-pointer transition-all hover:scale-105 ${
                  selectedLocation === bar.id
                    ? 'border-[#fb923c] shadow-lg shadow-[#fb923c]/20'
                    : 'border-[#1a1a1a] hover:border-[#fb923c]/50'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold mb-1">{bar.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <MapPin className="w-4 h-4" />
                      {bar.location}
                    </div>
                  </div>
                  {bar.type === 'premium' && (
                    <div className="px-3 py-1 bg-[#fb923c]/20 rounded-full">
                      <Star className="w-4 h-4 text-[#fb923c]" />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                  <Clock className="w-4 h-4" />
                  {bar.hours}
                </div>

                <div className="flex flex-wrap gap-2">
                  {bar.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#1a1a1a] rounded-full text-xs font-semibold text-gray-300"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Drink Menu */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Drink Menu</h3>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#fb923c] text-white'
                  : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a]'
              }`}
            >
              All Drinks
            </button>
            <button
              onClick={() => setSelectedCategory('beer')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                selectedCategory === 'beer'
                  ? 'bg-[#fb923c] text-white'
                  : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a]'
              }`}
            >
              <Beer className="w-4 h-4" />
              Beer
            </button>
            <button
              onClick={() => setSelectedCategory('wine')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                selectedCategory === 'wine'
                  ? 'bg-[#fb923c] text-white'
                  : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a]'
              }`}
            >
              <Wine className="w-4 h-4" />
              Wine
            </button>
            <button
              onClick={() => setSelectedCategory('cocktail')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                selectedCategory === 'cocktail'
                  ? 'bg-[#fb923c] text-white'
                  : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a]'
              }`}
            >
              <Martini className="w-4 h-4" />
              Cocktails
            </button>
            <button
              onClick={() => setSelectedCategory('non-alcoholic')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                selectedCategory === 'non-alcoholic'
                  ? 'bg-[#fb923c] text-white'
                  : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a]'
              }`}
            >
              <Coffee className="w-4 h-4" />
              Non-Alcoholic
            </button>
          </div>

          {/* Drinks Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDrinks.map((drink) => {
              const Icon = drink.icon;
              return (
                <div
                  key={drink.id}
                  className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6 hover:border-[#fb923c] transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#fb923c]/20 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-[#fb923c]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{drink.name}</h4>
                        <p className="text-sm text-gray-400">{drink.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#1a1a1a]">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-[#10b981]" />
                      <span className="text-xl font-bold text-[#10b981]">{drink.price}</span>
                    </div>
                    <button className="px-4 py-2 bg-[#fb923c] hover:bg-[#ea580c] rounded-lg font-semibold text-sm transition-all">
                      Order
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Important Notice */}
        <div className="mt-12 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
          <h4 className="font-bold mb-3 text-[#fb923c]">⚠️ Please Drink Responsibly</h4>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Must be 21+ with valid ID to purchase alcoholic beverages</li>
            <li>• Two drink maximum per transaction</li>
            <li>• Last call is at the end of the 3rd period/match</li>
            <li>• Designated driver and rideshare services available</li>
            <li>• Arena staff reserve the right to refuse service</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
