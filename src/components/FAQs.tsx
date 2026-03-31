import { HelpCircle, ChevronDown, Search, MapPin, Ticket, CreditCard, Calendar, Users, Utensils, Car } from 'lucide-react';
import { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
  category: string;
  icon: React.ElementType;
}

const faqs: FAQ[] = [
  {
    question: 'Where is NECS 2026 taking place?',
    answer: 'NECS 2026 will be held at Bridgestone Arena in Nashville, Tennessee. The arena is located at 501 Broadway, Nashville, TN 37203.',
    category: 'Venue',
    icon: MapPin
  },
  {
    question: 'What are the event dates?',
    answer: 'NECS 2026 runs from May 8-10, 2026. Day 1 starts at 10:00 AM, with finals on Day 3 starting at 2:00 PM.',
    category: 'Event Info',
    icon: Calendar
  },
  {
    question: 'How do I purchase tickets?',
    answer: 'Tickets can be purchased through our website in the Tickets section. We offer General Admission ($49.99), VIP ($99.99), and Premium Seating ($249.99) options. All tickets include access to all tournament games.',
    category: 'Tickets',
    icon: Ticket
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and Apple Pay. All transactions are secured with industry-standard encryption.',
    category: 'Payment',
    icon: CreditCard
  },
  {
    question: 'Is parking available at Bridgestone Arena?',
    answer: 'Yes! Multiple parking garages are available within walking distance. Prices range from $20-$40 depending on proximity. We recommend arriving early as parking fills up quickly. Pre-purchase parking passes in the Venue section for guaranteed spots.',
    category: 'Parking',
    icon: Car
  },
  {
    question: 'What games will be featured?',
    answer: 'NECS 2026 features three major esports titles: Valorant, Rocket League, and Super Smash Bros Ultimate. Each game has its own tournament bracket with professional teams competing.',
    category: 'Event Info',
    icon: Users
  },
  {
    question: 'Are there food and drink options?',
    answer: 'Yes! Bridgestone Arena offers multiple concession stands with a variety of food and beverages. VIP ticket holders also get access to exclusive catering. Check our Food Menu section for the full selection and in-seat ordering options.',
    category: 'Food',
    icon: Utensils
  },
  {
    question: 'Can I get a refund on my ticket?',
    answer: 'Tickets can be refunded up to 7 days before the event. Refund requests made within 7 days of the event are subject to a 15% processing fee. Requests can be made in the Receipts section of your account.',
    category: 'Tickets',
    icon: Ticket
  },
  {
    question: 'What items are prohibited in the arena?',
    answer: 'Prohibited items include outside food/drinks, large bags (over 14"x14"x6"), weapons, professional cameras, laser pointers, and noisemakers. Small personal bags and cameras are allowed.',
    category: 'Venue',
    icon: MapPin
  },
  {
    question: 'Are there age restrictions?',
    answer: 'NECS 2026 is open to all ages! Children under 2 years old do not require a ticket if sitting on a parent\'s lap. We recommend parental guidance for children under 13.',
    category: 'Event Info',
    icon: Users
  },
  {
    question: 'How can I watch if I can\'t attend in person?',
    answer: 'All matches will be live-streamed on our official Twitch and YouTube channels. Check the Watch section for stream links and featured content creators covering the event.',
    category: 'Event Info',
    icon: Users
  },
  {
    question: 'What is the VIP Raffle?',
    answer: 'VIP ticket holders are automatically entered into our exclusive raffle with prizes including signed jerseys, gaming peripherals, meet & greets with pro players, and more! Check the VIP Raffle section for prize details.',
    category: 'VIP',
    icon: Ticket
  },
  {
    question: 'Is there accessibility seating?',
    answer: 'Yes! Bridgestone Arena is fully ADA compliant with wheelchair accessible seating, elevators, and restrooms. Please contact our support team when purchasing tickets to reserve accessible seating.',
    category: 'Venue',
    icon: MapPin
  },
  {
    question: 'Can I meet the players and teams?',
    answer: 'VIP ticket holders get access to exclusive meet & greet sessions with select teams and players. Autograph sessions will also be held in the main concourse during breaks. Check the Schedule for specific times.',
    category: 'VIP',
    icon: Users
  },
  {
    question: 'What COVID-19 safety measures are in place?',
    answer: 'We follow all local health guidelines. Hand sanitizer stations are available throughout the arena. Attendees are encouraged to stay home if feeling unwell.',
    category: 'Safety',
    icon: HelpCircle
  },
  {
    question: 'Is WiFi available in the arena?',
    answer: 'Yes! Free WiFi is available throughout Bridgestone Arena. Network: "NECS2026_Guest" - No password required.',
    category: 'Venue',
    icon: MapPin
  },
  {
    question: 'What hotels are nearby?',
    answer: 'Numerous hotels are within walking distance including Omni Nashville Hotel (0.2 mi), The Westin Nashville (0.3 mi), and Hilton Nashville Downtown (0.4 mi). Check our Venue section for a full map of nearby accommodations.',
    category: 'Travel',
    icon: MapPin
  },
  {
    question: 'Can I bring a backpack?',
    answer: 'Small bags under 14"x14"x6" are permitted. All bags are subject to search upon entry. We recommend traveling light for faster entry.',
    category: 'Venue',
    icon: MapPin
  }
];

export function FAQs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const categories = ['All', 'Venue', 'Tickets', 'Event Info', 'Payment', 'Parking', 'Food', 'VIP', 'Safety', 'Travel'];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-20 px-8 pb-8 bg-black text-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            <HelpCircle className="w-12 h-12 text-[#2f6bff]" />
            Frequently Asked Questions
          </h1>
          <p className="text-gray-400 text-xl">Find answers to common questions about NECS 2026</p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg pl-12 pr-4 py-4 text-white focus:border-[#2f6bff] focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-[#2f6bff] text-white'
                  : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a] hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => {
            const Icon = faq.icon;
            const isOpen = openIndex === index;
            
            return (
              <div
                key={index}
                className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl overflow-hidden hover:border-[#2f6bff] transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-[#0f0f0f] transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 bg-[#2f6bff]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#2f6bff]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1">{faq.question}</h3>
                      <span className="text-xs text-gray-400 font-semibold">{faq.category}</span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-gray-400 transition-transform flex-shrink-0 ml-4 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-[#1a1a1a]">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredFAQs.length === 0 && (
          <div className="text-center py-16">
            <HelpCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No FAQs found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search or category filter</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-6 py-3 bg-[#2f6bff] hover:bg-[#2557d6] rounded-lg font-bold transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-12 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="text-gray-400 mb-6">
            Our support team is here to help! Reach out and we'll get back to you within 24 hours.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="mailto:support@necs2026.com"
              className="px-6 py-3 bg-[#2f6bff] hover:bg-[#2557d6] rounded-lg font-bold transition-all"
            >
              Email Support
            </a>
            <button className="px-6 py-3 bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-lg font-bold transition-all">
              Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
