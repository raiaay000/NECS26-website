import { ShoppingCart, Check } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface TicketTier {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  isPopular?: boolean;
}

const ticketTiers: TicketTier[] = [
  {
    id: 'general',
    name: 'General Admission',
    price: 45,
    description: 'Experience the thrill of championship esports with full event access',
    features: [
      'Access to all 5 days of the event',
      'Exhibitor hall access',
      'Digital event guide',
      'Event merchandise discount',
      'General sessions and competitions',
      'Networking areas',
      'Standard seating',
      'Access to public viewing areas'
    ],
    isPopular: false
  },
  {
    id: 'vip',
    name: 'VIP',
    price: 180,
    description: 'Premium experience with exclusive access and perks',
    features: [
      'All General Admission benefits',
      '5-day VIP access',
      'Premium seating',
      'Free parking',
      'Meet & greet with players',
      'Free exclusive merch',
      'VIP lounge access',
      'Priority entry'
    ],
    isPopular: true
  },
  {
    id: 'ultimate',
    name: 'Ultimate',
    price: 350,
    description: 'The ultimate championship experience with backstage access',
    features: [
      'All VIP benefits',
      'Front row seating',
      'Backstage access',
      'Exclusive swag bag',
      'Private meet & greets',
      'VIP lounge access',
      'Photo opportunities',
      'Commemorative badge'
    ],
    isPopular: false
  }
];

interface TicketsProps {
  onAddToCart: (item: { id: string; name: string; price: number; type: 'ticket'; quantity: number }) => void;
}

export function Tickets({ onAddToCart }: TicketsProps) {
  const headerRef = useScrollAnimation();
  const tiersRef = useScrollAnimation();
  const infoRef = useScrollAnimation();

  const handleAddTicket = (tier: TicketTier) => {
    onAddToCart({
      id: tier.id,
      name: tier.name,
      price: tier.price,
      type: 'ticket',
      quantity: 1
    });
  };

  return (
    <div className="min-h-screen pt-20 px-8 pb-8">
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef.ref} className={`transition-all duration-700 ${headerRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl font-bold mb-4">Tickets</h1>
          <p className="text-gray-400 mb-12">Choose your experience for NECS 2026</p>
        </div>

        <div ref={tiersRef.ref} className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 ${tiersRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {ticketTiers.map(tier => (
            <div 
              key={tier.id}
              className={`bg-[#0a0a0a] rounded-lg p-8 relative transition-all ${
                tier.isPopular 
                  ? 'border-2 border-[#2f6bff]' 
                  : 'border border-[#1a1a1a] hover:border-[#2f6bff]'
              }`}
            >
              {tier.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2f6bff] px-4 py-1 rounded-full text-xs">
                  POPULAR
                </div>
              )}
              
              <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-sm text-gray-400">From</span>
                <span className="text-4xl font-bold">${tier.price}</span>
                <span className="text-sm text-gray-400">per ticket</span>
              </div>
              <p className="text-gray-400 text-sm mb-6">{tier.description}</p>
              
              <div className="mb-8">
                <h4 className="font-semibold mb-3 text-sm">What's Included</h4>
                <ul className="space-y-2">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                      <Check className="w-4 h-4 text-[#2f6bff] flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleAddTicket(tier)}
                className={`w-full py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 ${
                  tier.isPopular
                    ? 'bg-[#2f6bff] hover:bg-[#2557d6]'
                    : 'bg-[#1a1a1a] hover:bg-[#2f6bff]'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div ref={infoRef.ref} className={`mt-16 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-8 transition-all duration-700 ${infoRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-2xl font-bold mb-6">Important Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-400">
            <div>
              <h3 className="font-semibold text-white mb-2">📅 Event Dates</h3>
              <p>May 6-10, 2026</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">📍 Location</h3>
              <p>Bridgestone Arena, Nashville, TN</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">🎫 Ticket Delivery</h3>
              <p>Instant digital ticket delivery via email</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">🔒 Secure Payment</h3>
              <p>All transactions are securely processed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}