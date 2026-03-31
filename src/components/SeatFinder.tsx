import { useState } from 'react';
import { Search, MapPin, DollarSign, Eye, CheckCircle } from 'lucide-react';

interface Seat {
  id: string;
  section: string;
  row: string;
  seat: string;
  price: number;
  view: 'excellent' | 'good' | 'fair';
  available: boolean;
}

const seatData: Seat[] = [
  { id: '1', section: '101', row: 'A', seat: '15', price: 250, view: 'excellent', available: true },
  { id: '2', section: '101', row: 'B', seat: '12', price: 240, view: 'excellent', available: true },
  { id: '3', section: '105', row: 'D', seat: '8', price: 220, view: 'excellent', available: true },
  { id: '4', section: '108', row: 'C', seat: '20', price: 210, view: 'good', available: true },
  { id: '5', section: '115', row: 'F', seat: '16', price: 190, view: 'good', available: true },
  { id: '6', section: '201', row: 'A', seat: '10', price: 180, view: 'good', available: false },
  { id: '7', section: '205', row: 'B', seat: '14', price: 170, view: 'fair', available: true },
  { id: '8', section: '301', row: 'E', seat: '22', price: 120, view: 'fair', available: true },
  { id: '9', section: '315', row: 'G', seat: '18', price: 110, view: 'fair', available: true },
];

export function SeatFinder() {
  const [searchSection, setSearchSection] = useState('');
  const [maxPrice, setMaxPrice] = useState(300);
  const [selectedView, setSelectedView] = useState<string>('all');
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);

  const filteredSeats = seatData.filter(seat => {
    const matchesSection = searchSection === '' || seat.section.toLowerCase().includes(searchSection.toLowerCase());
    const matchesPrice = seat.price <= maxPrice;
    const matchesView = selectedView === 'all' || seat.view === selectedView;
    return matchesSection && matchesPrice && matchesView && seat.available;
  });

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <Search className="w-10 h-10 text-[#2f6bff]" />
          Seat Finder
        </h2>
        <p className="text-gray-400 mb-8 text-lg">Find your perfect seat in Bridgestone Arena</p>

        {/* Search Filters */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-400">Search Section</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="e.g. 101, 205..."
                value={searchSection}
                onChange={(e) => setSearchSection(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg pl-11 pr-4 py-3 text-white focus:border-[#2f6bff] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-400">Max Price: ${maxPrice}</label>
            <input
              type="range"
              min="50"
              max="300"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-3 bg-[#1a1a1a] rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-400">View Quality</label>
            <select
              value={selectedView}
              onChange={(e) => setSelectedView(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#2f6bff] focus:outline-none"
            >
              <option value="all">All Views</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-[#10b981]" />
            {filteredSeats.length} Available Seats
          </h3>
        </div>

        {/* Seats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSeats.map((seat) => (
            <div
              key={seat.id}
              onClick={() => setSelectedSeat(seat)}
              className="bg-[#0a0a0a] border-2 border-[#1a1a1a] rounded-xl p-6 cursor-pointer transition-all hover:scale-105 hover:border-[#2f6bff]"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-1">Section {seat.section}</h3>
                  <p className="text-sm text-gray-400">Row {seat.row}, Seat {seat.seat}</p>
                </div>
                <div className="w-3 h-3 bg-[#10b981] rounded-full animate-pulse" />
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-[#10b981]" />
                  <span className="text-gray-300 font-semibold">${seat.price}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Eye className="w-4 h-4 text-[#fb923c]" />
                  <span className="text-gray-300 capitalize">{seat.view} view</span>
                </div>
              </div>

              <button className="w-full py-2 bg-[#2f6bff] hover:bg-[#2557d6] rounded-lg font-semibold transition-all">
                Select Seat
              </button>
            </div>
          ))}
        </div>

        {filteredSeats.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No seats found</h3>
            <p className="text-gray-400">Try adjusting your filters to see more options</p>
          </div>
        )}

        {/* Selected Seat Modal */}
        {selectedSeat && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#0a0a0a] border-2 border-[#2f6bff] rounded-xl max-w-lg w-full p-8">
              <h2 className="text-2xl font-bold mb-6">Seat Details</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Section</span>
                  <span className="font-bold text-xl">{selectedSeat.section}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Row</span>
                  <span className="font-bold text-xl">{selectedSeat.row}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Seat</span>
                  <span className="font-bold text-xl">{selectedSeat.seat}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">View Quality</span>
                  <span className="font-semibold capitalize text-[#fb923c]">{selectedSeat.view}</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#1a1a1a]">
                  <span className="text-gray-400">Price</span>
                  <span className="font-bold text-2xl text-[#10b981]">${selectedSeat.price}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedSeat(null)}
                  className="flex-1 py-3 bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-lg font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setSelectedSeat(null);
                    // Add to cart logic here
                  }}
                  className="flex-1 py-3 bg-[#2f6bff] hover:bg-[#2557d6] rounded-lg font-bold transition-all"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Arena Seat Map Visual */}
        <div className="mt-12 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-[#2f6bff]" />
            Arena Seating Layout
          </h3>
          <div className="relative">
            <svg viewBox="0 0 400 300" className="w-full h-64">
              {/* Stage */}
              <rect x="150" y="130" width="100" height="40" fill="#2f6bff" rx="4" />
              <text x="200" y="155" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">STAGE</text>
              
              {/* Lower Bowl */}
              <ellipse cx="200" cy="150" rx="140" ry="90" fill="none" stroke="#2f6bff" strokeWidth="2" opacity="0.3" />
              <text x="200" y="75" textAnchor="middle" fill="#2f6bff" fontSize="10" fontWeight="bold">LOWER BOWL (101-119)</text>
              
              {/* Club Level */}
              <ellipse cx="200" cy="150" rx="170" ry="115" fill="none" stroke="#ec4899" strokeWidth="2" opacity="0.3" />
              <text x="200" y="280" textAnchor="middle" fill="#ec4899" fontSize="10" fontWeight="bold">CLUB LEVEL (201-228)</text>
              
              {/* Upper Bowl */}
              <ellipse cx="200" cy="150" rx="195" ry="140" fill="none" stroke="#8b5cf6" strokeWidth="2" opacity="0.3" />
              <text x="200" y="20" textAnchor="middle" fill="#8b5cf6" fontSize="10" fontWeight="bold">UPPER BOWL (301-333)</text>
            </svg>
            <p className="text-center text-sm text-gray-400 mt-4">Sections closer to the stage offer the best views</p>
          </div>
        </div>
      </div>
    </div>
  );
}
