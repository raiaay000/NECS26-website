import { useState } from 'react';
import { Car, MapPin, DollarSign, Clock, Navigation } from 'lucide-react';

interface ParkingOption {
  id: number;
  name: string;
  address: string;
  distance: string;
  price: string;
  spaces: number;
  available: boolean;
}

const parkingOptions: ParkingOption[] = [
  { id: 1, name: "Fifth + Broadway Garage", address: "5th Ave & Broadway", distance: "0.2 mi", price: "$25", spaces: 1200, available: true },
  { id: 2, name: "Icon Parking - Premier Lot", address: "417 Broadway", distance: "0.1 mi", price: "$30", spaces: 450, available: true },
  { id: 3, name: "Nashville Public Library Garage", address: "615 Church St", distance: "0.3 mi", price: "$20", spaces: 800, available: true },
  { id: 4, name: "Bridgestone Arena Official Parking", address: "501 Broadway", distance: "0.0 mi", price: "$40", spaces: 350, available: false },
  { id: 5, name: "Nissan Stadium Lot", address: "1 Titans Way", distance: "1.2 mi", price: "$15", spaces: 2000, available: true },
  { id: 6, name: "Music City Center Garage", address: "201 5th Ave S", distance: "0.4 mi", price: "$22", spaces: 1500, available: true },
];

export function ParkingOnly() {
  const [selectedParking, setSelectedParking] = useState<number | null>(null);

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto">
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
    </div>
  );
}
