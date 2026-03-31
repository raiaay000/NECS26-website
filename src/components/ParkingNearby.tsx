import { useState } from 'react';
import { Car, MapPin, DollarSign, Clock, Navigation, Utensils, Coffee, Hotel, Music, Camera, ShoppingBag } from 'lucide-react';

interface ParkingOption {
  id: number;
  name: string;
  address: string;
  distance: string;
  price: string;
  spaces: number;
  available: boolean;
}

interface NearbyPlace {
  id: number;
  name: string;
  type: 'restaurant' | 'hotel' | 'attraction' | 'bar' | 'shop';
  description: string;
  address: string;
  distance: string;
  rating: number;
  icon: any;
}

const parkingOptions: ParkingOption[] = [
  { id: 1, name: "Fifth + Broadway Garage", address: "5th Ave & Broadway", distance: "0.2 mi", price: "$25", spaces: 1200, available: true },
  { id: 2, name: "Icon Parking - Premier Lot", address: "417 Broadway", distance: "0.1 mi", price: "$30", spaces: 450, available: true },
  { id: 3, name: "Nashville Public Library Garage", address: "615 Church St", distance: "0.3 mi", price: "$20", spaces: 800, available: true },
  { id: 4, name: "Bridgestone Arena Official Parking", address: "501 Broadway", distance: "0.0 mi", price: "$40", spaces: 350, available: false },
  { id: 5, name: "Nissan Stadium Lot", address: "1 Titans Way", distance: "1.2 mi", price: "$15", spaces: 2000, available: true },
  { id: 6, name: "Music City Center Garage", address: "201 5th Ave S", distance: "0.4 mi", price: "$22", spaces: 1500, available: true },
];

const nearbyPlaces: NearbyPlace[] = [
  { id: 1, name: "Hattie B's Hot Chicken", type: "restaurant", description: "Famous Nashville hot chicken", address: "112 19th Ave S", distance: "0.8 mi", rating: 4.6, icon: Utensils },
  { id: 2, name: "Tootsies Orchid Lounge", type: "bar", description: "Iconic honky-tonk bar", address: "422 Broadway", distance: "0.1 mi", rating: 4.5, icon: Music },
  { id: 3, name: "The Stillery", type: "restaurant", description: "Upscale dining & cocktails", address: "223 Rep. John Lewis Way S", distance: "0.2 mi", rating: 4.7, icon: Utensils },
  { id: 4, name: "Omni Nashville Hotel", type: "hotel", description: "Luxury accommodations", address: "250 Rep. John Lewis Way S", distance: "0.2 mi", rating: 4.8, icon: Hotel },
  { id: 5, name: "Country Music Hall of Fame", type: "attraction", description: "Music history museum", address: "222 5th Ave S", distance: "0.3 mi", rating: 4.9, icon: Camera },
  { id: 6, name: "Acme Feed & Seed", type: "bar", description: "Multi-level bar & restaurant", address: "101 Broadway", distance: "0.2 mi", rating: 4.4, icon: Music },
  { id: 7, name: "Biscuit Love", type: "restaurant", description: "Southern breakfast spot", address: "316 11th Ave S", distance: "1.1 mi", rating: 4.6, icon: Coffee },
  { id: 8, name: "The Hermitage Hotel", type: "hotel", description: "Historic luxury hotel", address: "231 6th Ave N", distance: "0.5 mi", rating: 4.9, icon: Hotel },
  { id: 9, name: "Broadway Brewhouse", type: "bar", description: "Craft beer & live music", address: "317 Broadway", distance: "0.2 mi", rating: 4.3, icon: Music },
  { id: 10, name: "Nashville Farmers Market", type: "shop", description: "Local food & crafts", address: "900 Rosa L Parks Blvd", distance: "0.7 mi", rating: 4.5, icon: ShoppingBag },
];

export function ParkingNearby() {
  const [selectedParking, setSelectedParking] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  const filteredPlaces = filterType === 'all' 
    ? nearbyPlaces 
    : nearbyPlaces.filter(place => place.type === filterType);

  return (
    <div className="py-20 px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Parking Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <Car className="w-10 h-10 text-[#2f6bff]" />
            Parking Options
          </h2>
          <p className="text-gray-400 mb-8 text-lg">Reserve your spot near Bridgestone Arena</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {parkingOptions.map((parking) => (
              <div
                key={parking.id}
                onClick={() => setSelectedParking(parking.id)}
                className={`bg-[#0a0a0a] border-2 rounded-xl p-6 cursor-pointer transition-all hover:scale-105 ${
                  selectedParking === parking.id
                    ? 'border-[#2f6bff] shadow-lg shadow-[#2f6bff]/20'
                    : parking.available
                    ? 'border-[#1a1a1a] hover:border-[#2f6bff]/50'
                    : 'border-[#1a1a1a] opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{parking.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                      <MapPin className="w-4 h-4" />
                      {parking.address}
                    </div>
                  </div>
                  {parking.available ? (
                    <div className="w-3 h-3 bg-[#10b981] rounded-full animate-pulse" />
                  ) : (
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Navigation className="w-4 h-4 text-[#fb923c]" />
                    <span className="text-gray-300">{parking.distance} walk</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-[#10b981]" />
                    <span className="text-gray-300">{parking.price} event parking</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Car className="w-4 h-4 text-[#2f6bff]" />
                    <span className="text-gray-300">{parking.spaces} spaces</span>
                  </div>
                </div>

                {parking.available ? (
                  <button className="w-full mt-4 py-2 bg-[#2f6bff] hover:bg-[#2557d6] rounded-lg font-semibold transition-all">
                    Reserve Parking
                  </button>
                ) : (
                  <div className="w-full mt-4 py-2 bg-[#1a1a1a] rounded-lg font-semibold text-gray-500 text-center">
                    Sold Out
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#fb923c] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold mb-2">Parking Tips</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Arrive 60-90 minutes early for best availability</li>
                  <li>• Pre-purchase parking passes online for guaranteed spots</li>
                  <li>• Consider rideshare options to avoid parking hassles</li>
                  <li>• Street parking is limited and metered until 6 PM</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Nearby Places Section */}
        <div>
          <h2 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <MapPin className="w-10 h-10 text-[#fb923c]" />
            Things to Do Nearby
          </h2>
          <p className="text-gray-400 mb-8 text-lg">Explore Nashville before or after the event</p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filterType === 'all'
                  ? 'bg-[#fb923c] text-white'
                  : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a]'
              }`}
            >
              All Places
            </button>
            <button
              onClick={() => setFilterType('restaurant')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filterType === 'restaurant'
                  ? 'bg-[#fb923c] text-white'
                  : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a]'
              }`}
            >
              Restaurants
            </button>
            <button
              onClick={() => setFilterType('hotel')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filterType === 'hotel'
                  ? 'bg-[#fb923c] text-white'
                  : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a]'
              }`}
            >
              Hotels
            </button>
            <button
              onClick={() => setFilterType('bar')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filterType === 'bar'
                  ? 'bg-[#fb923c] text-white'
                  : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a]'
              }`}
            >
              Bars & Music
            </button>
            <button
              onClick={() => setFilterType('attraction')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filterType === 'attraction'
                  ? 'bg-[#fb923c] text-white'
                  : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a]'
              }`}
            >
              Attractions
            </button>
          </div>

          {/* Places Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {filteredPlaces.map((place) => {
              const Icon = place.icon;
              return (
                <div
                  key={place.id}
                  className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6 hover:border-[#fb923c] transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#fb923c]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-[#fb923c]" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-lg">{place.name}</h3>
                        <div className="flex items-center gap-1 text-sm">
                          <span className="text-[#fb923c]">★</span>
                          <span className="text-gray-300">{place.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-400 mb-3">{place.description}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {place.distance}
                        </div>
                        <div className="flex items-center gap-1">
                          <Navigation className="w-3 h-3" />
                          {place.address}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 py-2 bg-[#fb923c] hover:bg-[#ea580c] rounded-lg text-sm font-semibold transition-all">
                      Get Directions
                    </button>
                    <button className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-lg text-sm font-semibold transition-all">
                      Info
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
