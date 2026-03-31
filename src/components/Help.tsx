import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, HelpCircle, Calendar, MapPin, Ticket, Trophy } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const quickQuestions = [
  { icon: Calendar, text: "When is NECS 2026?", query: "When is NECS 2026?" },
  { icon: MapPin, text: "Where is the venue?", query: "Where is the venue located?" },
  { icon: Ticket, text: "Ticket prices?", query: "What are the ticket prices?" },
  { icon: Trophy, text: "What games?", query: "What games are featured?" },
];

const botResponses: Record<string, string> = {
  "when is necs 2026": "NECS 2026 will take place from May 6-10, 2026! That's 5 days of non-stop esports action. Mark your calendars! 📅",
  "when is necs 2026:detail": "NECS 2026 runs from May 6-10, 2026:\n\n📅 Day 1 (May 6): Opening Ceremony & Group Stage\n📅 Day 2-3 (May 7-8): Group Stage Matches\n📅 Day 4 (May 9): Semifinals & Special Events\n📅 Day 5 (May 10): Grand Finals & Closing Ceremony\n\nDoors open at 9 AM each day, with matches starting at 10 AM and running until 10 PM. The venue will have activities, meet & greets, and exhibitor booths throughout!",
  "where is the venue": "The tournament will be held at the iconic Bridgestone Arena in Nashville, TN! It's one of the premier venues in North America with state-of-the-art facilities. 🏟️",
  "where is the venue:detail": "Bridgestone Arena Details:\n\n📍 Address: 501 Broadway, Nashville, TN 37203\n🏟️ Capacity: 20,000 seats\n🎯 Features: State-of-the-art LED screens, premium sound system, multiple concession areas\n🚗 Parking: Multiple parking garages within walking distance\n🚇 Public Transit: Accessible via Nashville MTA routes\n🏨 Hotels: Dozens of hotels within 1 mile\n\nThe arena is located in the heart of downtown Nashville, surrounded by restaurants, entertainment, and nightlife. Check out our Venue page for an interactive map!",
  "ticket prices": "We have three ticket tiers:\n\n💙 General Admission - $45\nIncludes 5-day access, exhibitor hall, and standard seating\n\n⭐ VIP - $180\nIncludes premium seating, meet & greets, VIP lounge access, and free parking\n\n🌟 Ultimate - $350\nIncludes front row seating, backstage access, exclusive swag, and private meet & greets",
  "ticket prices:detail": "Detailed Ticket Information:\n\n💙 GENERAL ADMISSION - $45\n• 5-day tournament access\n• Standard seating (first-come, first-served)\n• Access to exhibitor hall\n• Access to public food courts\n• Official tournament program\n\n⭐ VIP - $180\n• Everything in General Admission\n• Reserved premium seating\n• VIP lounge access with comfortable seating\n• Complimentary food and beverages\n• Meet & greet opportunities with teams\n• Free parking pass\n• Exclusive VIP swag bag\n• Priority entry to the venue\n\n🌟 ULTIMATE - $350\n• Everything in VIP\n• Front row reserved seating\n• Backstage tours and access\n• Private meet & greets with pro players\n• Exclusive merchandise bundle\n• VIP dinner with special guests\n• Autograph sessions\n• Photo opportunities on stage\n\nAll tickets are for the full 5-day event. Single day passes are not available.",
  "what games": "NECS 2026 features three incredible games:\n\n🎯 Valorant - Tactical 5v5 FPS action\n🚗 Rocket League - High-octane car soccer\n🎮 Super Smash Bros - Platform fighting excellence\n\nEach game has its own tournament bracket with amazing prize pools!",
  "what games:detail": "Tournament Games & Formats:\n\n🎯 VALORANT\n• Format: Double elimination bracket\n• Prize Pool: $500,000\n• Teams: 12 competing\n• Match Type: Best of 3 (Bo3), Finals Bo5\n• Maps: All current competitive maps in rotation\n\n🚗 ROCKET LEAGUE\n• Format: Swiss system into playoffs\n• Prize Pool: $400,000\n• Teams: 12 competing\n• Match Type: Best of 5 series\n• Mode: 3v3 competitive\n\n🎮 SUPER SMASH BROS ULTIMATE\n• Format: Double elimination\n• Prize Pool: $300,000\n• Players: Individual competition (1v1)\n• Match Type: Best of 5, Finals Bo7\n• Stage List: Tournament legal stages\n\nAll three games run simultaneously on different stages throughout the arena. Check the Schedule page for specific match times!",
  "teams": "We have 12 elite teams competing across all three games! You can check out the Teams page to see detailed rosters, player stats, and team histories. Each team is bringing their A-game! 🏆",
  "teams:detail": "Our 12 Elite Teams:\n\nEach team competes in all three games with specialized rosters:\n• Full player rosters with roles\n• Team stats and rankings\n• Previous tournament results\n• Player biographies and achievements\n• Team social media links\n\nNotable teams include Phoenix Strikers, Digital Dragons, Cyber Wolves, Thunder Eagles, and more! Visit the Teams page to explore each organization's history, see player profiles with their stats, and follow their journey through the tournament. Many teams have won major championships and include world-class players!",
  "schedule": "The schedule page has all the match times and details! Matches run daily from 10 AM to 10 PM throughout the 5-day event. You can also set email reminders for your favorite matches!",
  "schedule:detail": "Schedule Features:\n\n⏰ Daily Schedule: 10 AM - 10 PM\n• Morning Block: 10 AM - 2 PM\n• Afternoon Block: 2 PM - 6 PM\n• Evening Block: 6 PM - 10 PM\n\n🔍 Search & Filter:\n• Filter by game (Valorant, Rocket League, Smash)\n• Search by team name\n• View by day or see full schedule\n\n🔔 Reminder System:\n• Set email reminders for any match\n• Get notifications 1 hour before start\n• Sync with your calendar\n• Manage all reminders in your account\n\n📊 Match Details:\n• Team matchups and rosters\n• Stage location within arena\n• Round information (Group, Semis, Finals)\n• Estimated duration\n\nThe schedule updates in real-time if matches run early or late!",
  "food": "VIP and Ultimate ticket holders get complimentary food and beverages! We've got a full menu including appetizers, main courses, desserts, and drinks. Check out the Food Menu page for all the delicious details! 🍔",
  "food:detail": "Food & Beverage Details:\n\n🍽️ VIP LOUNGE MENU (VIP & Ultimate tickets):\n• Appetizers: Wings, nachos, sliders, veggie platters\n• Main Courses: Burgers, pizza, pasta, salads\n• Desserts: Brownies, cookies, ice cream\n• Drinks: Soft drinks, energy drinks, coffee, water (unlimited refills)\n• Special dietary options available\n\n🍔 GENERAL ADMISSION:\n• Multiple concession stands throughout arena\n• Traditional stadium food available for purchase\n• Prices: $8-15 per item\n• Combo deals available\n\n☕ FOOD TRUCKS:\n• Daily rotating food trucks outside venue\n• Local Nashville specialties\n• Hot chicken, BBQ, tacos, and more\n\n🥤 All venues accommodate dietary restrictions (vegetarian, vegan, gluten-free, allergies). Contact info@necs2026.com for specific needs.",
  "merch": "Our official NECS 2026 merchandise is available in the Shop! We have team jerseys, limited edition hoodies, championship posters, and more. All items ship with tracking! 👕",
  "merch:detail": "Official Merchandise:\n\n👕 APPAREL:\n• Team Jerseys - $75 (all 12 teams available)\n• NECS 2026 Hoodies - $65 (limited edition)\n• Tournament T-Shirts - $30\n• Team Snapback Hats - $35\n\n🖼️ COLLECTIBLES:\n• Championship Posters - $25 (signed options)\n• Trading Card Sets - $45\n• Enamel Pin Collections - $20\n• Team Flags - $30\n\n🎮 ACCESSORIES:\n• Gaming Mousepads - $25\n• Phone Cases - $20\n• Keychains - $10\n• Sticker Packs - $15\n\n📦 SHIPPING:\n• Free shipping on orders over $100\n• 2-day shipping available\n• All orders include tracking\n• International shipping available\n\nMerchandise booths will also be at the venue for in-person shopping!",
  "parking": "Free parking is included with VIP and Ultimate tickets! General Admission ticket holders can purchase parking separately. The venue has ample parking facilities nearby.",
  "parking:detail": "Parking Information:\n\n🅿️ VIP & ULTIMATE: Free parking pass included\n• Premier parking garage access\n• 5-minute walk to entrance\n• In/out privileges all day\n• Reserved VIP section\n\n🚗 GENERAL ADMISSION:\n• Parking passes: $20/day or $80/week\n• Multiple garages within 3 blocks\n• Street parking available (metered)\n• Early arrival recommended (lots fill up)\n\n🚕 ALTERNATIVE TRANSPORTATION:\n• Uber/Lyft drop-off zone at main entrance\n• Nashville MTA bus routes 3, 7, 18, 55\n• Scooter parking available\n• Bike racks at venue entrance\n\n♿ Accessible parking available in all garages. Present your placard for reserved spots.",
  "watch": "Yes! We have 12+ content creators and streamers covering the tournament. Check out the Watch page to find your favorite YouTubers and Twitch streamers who'll be posting highlights, analysis, and behind-the-scenes content! 📺",
  "watch:detail": "Content Creator Coverage:\n\n📺 OFFICIAL STREAMS:\n• Main stream on Twitch.tv/NECS\n• YouTube Live for VODs\n• Watch parties hosted by creators\n• Multiple language broadcasts\n\n🎥 FEATURED CREATORS:\n• 12 partnered content creators\n• Mix of Twitch streamers and YouTubers\n• Coverage across all three games\n• Behind-the-scenes access\n• Player interviews and reactions\n• Highlight compilations\n• Analysis and commentary\n\n👥 CREATOR MEET & GREETS:\n• Special signing sessions daily\n• Photo opportunities\n• Creator lounge in exhibitor hall\n• VIP ticket holders get priority access\n\nVisit the Watch page to see all creators, their platforms, subscriber counts, and content specialties!",
  "music": "We've curated an awesome Music playlist featuring high-energy tracks perfect for getting hyped about the tournament! You can listen to it on the Music page. 🎵",
  "music:detail": "NECS 2026 Official Playlist:\n\n🎵 Featured Tracks:\n• 20+ high-energy songs\n• Mix of EDM, hip-hop, and rock\n• Songs featured during live broadcasts\n• Hype music for tournament walkouts\n• Curated by our production team\n\n🎧 Playlist includes:\n• Opening ceremony anthems\n• Match intermission music\n• Victory celebration tracks\n• Behind-the-scenes montage songs\n\n🔊 LIVE PERFORMANCES:\n• Special musical guests each day\n• DJ sets during breaks\n• Live band for closing ceremony\n\nStream the playlist on Spotify, Apple Music, or listen directly on our Music page!",
  "account": "You can create an account to save your favorite teams, set match reminders, and track your ticket purchases. Just click the Login button in the top right! Guest mode is also available if you prefer.",
  "account:detail": "Account Features:\n\n👤 CREATE ACCOUNT:\n• Sign up with email\n• Guest mode available (no email required)\n• Secure password protection\n• Free to create\n\n✨ ACCOUNT BENEFITS:\n• Save favorite teams and players\n• Set match reminders (email notifications)\n• Track ticket and merchandise purchases\n• Faster checkout for shop items\n• Personalized recommendations\n• Access to exclusive contests\n• Early access to announcements\n\n⚙️ ACCOUNT PAGES:\n• Profile: Manage your info and preferences\n• Reminders: View and edit all match alerts\n• Settings: Customize notifications and privacy\n\n🔒 Your data is secure and never shared with third parties.",
  "help": "I'm NECS Bot, your personal tournament assistant! I can help you with:\n\n• Event dates and schedule\n• Venue information\n• Ticket details and pricing\n• Game information\n• Team rosters\n• Merchandise\n• Food and amenities\n• Content creator coverage\n\nJust ask me anything! 🤖",
  "default": "Great! I can help you with information about NECS 2026, including dates, venue, tickets, games, teams, schedule, and more. What would you like to know? 😊"
};

function getBotResponse(userMessage: string, lastTopic?: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  // Check for "more details" requests
  if (lowerMessage.includes("more") || lowerMessage.includes("detail") || lowerMessage.includes("tell me more") || 
      lowerMessage.includes("elaborate") || lowerMessage.includes("specific") || lowerMessage.includes("explain")) {
    // If user wants more details, provide the detailed version of the last topic
    if (lastTopic && botResponses[`${lastTopic}:detail`]) {
      return botResponses[`${lastTopic}:detail`];
    }
  }
  
  // Check for keyword matches
  if (lowerMessage.includes("when") || lowerMessage.includes("date")) {
    return botResponses["when is necs 2026"];
  }
  if (lowerMessage.includes("where") || lowerMessage.includes("venue") || lowerMessage.includes("location")) {
    return botResponses["where is the venue"];
  }
  if (lowerMessage.includes("ticket") || lowerMessage.includes("price") || lowerMessage.includes("cost")) {
    return botResponses["ticket prices"];
  }
  if (lowerMessage.includes("game") || lowerMessage.includes("play") || lowerMessage.includes("valorant") || lowerMessage.includes("rocket league") || lowerMessage.includes("smash")) {
    return botResponses["what games"];
  }
  if (lowerMessage.includes("team") || lowerMessage.includes("player") || lowerMessage.includes("roster")) {
    return botResponses["teams"];
  }
  if (lowerMessage.includes("schedule") || lowerMessage.includes("match") || lowerMessage.includes("time")) {
    return botResponses["schedule"];
  }
  if (lowerMessage.includes("food") || lowerMessage.includes("eat") || lowerMessage.includes("drink") || lowerMessage.includes("menu")) {
    return botResponses["food"];
  }
  if (lowerMessage.includes("merch") || lowerMessage.includes("shop") || lowerMessage.includes("buy") || lowerMessage.includes("shirt") || lowerMessage.includes("jersey")) {
    return botResponses["merch"];
  }
  if (lowerMessage.includes("park")) {
    return botResponses["parking"];
  }
  if (lowerMessage.includes("watch") || lowerMessage.includes("stream") || lowerMessage.includes("youtube") || lowerMessage.includes("content")) {
    return botResponses["watch"];
  }
  if (lowerMessage.includes("music") || lowerMessage.includes("playlist") || lowerMessage.includes("song")) {
    return botResponses["music"];
  }
  if (lowerMessage.includes("account") || lowerMessage.includes("login") || lowerMessage.includes("sign up")) {
    return botResponses["account"];
  }
  if (lowerMessage.includes("help") || lowerMessage.includes("what can you do")) {
    return botResponses["help"];
  }
  
  return botResponses["default"];
}

function getTopicFromResponse(userMessage: string): string | undefined {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes("when") || lowerMessage.includes("date")) return "when is necs 2026";
  if (lowerMessage.includes("where") || lowerMessage.includes("venue") || lowerMessage.includes("location")) return "where is the venue";
  if (lowerMessage.includes("ticket") || lowerMessage.includes("price") || lowerMessage.includes("cost")) return "ticket prices";
  if (lowerMessage.includes("game") || lowerMessage.includes("play") || lowerMessage.includes("valorant") || lowerMessage.includes("rocket league") || lowerMessage.includes("smash")) return "what games";
  if (lowerMessage.includes("team") || lowerMessage.includes("player") || lowerMessage.includes("roster")) return "teams";
  if (lowerMessage.includes("schedule") || lowerMessage.includes("match") || lowerMessage.includes("time")) return "schedule";
  if (lowerMessage.includes("food") || lowerMessage.includes("eat") || lowerMessage.includes("drink") || lowerMessage.includes("menu")) return "food";
  if (lowerMessage.includes("merch") || lowerMessage.includes("shop") || lowerMessage.includes("buy") || lowerMessage.includes("shirt") || lowerMessage.includes("jersey")) return "merch";
  if (lowerMessage.includes("park")) return "parking";
  if (lowerMessage.includes("watch") || lowerMessage.includes("stream") || lowerMessage.includes("youtube") || lowerMessage.includes("content")) return "watch";
  if (lowerMessage.includes("music") || lowerMessage.includes("playlist") || lowerMessage.includes("song")) return "music";
  if (lowerMessage.includes("account") || lowerMessage.includes("login") || lowerMessage.includes("sign up")) return "account";
  
  return undefined;
}

export function Help() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm NECS Bot, your personal assistant for NECS 2026! 🤖 I'm here to help you with any questions about the tournament, tickets, schedule, teams, and more. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [lastTopic, setLastTopic] = useState<string | undefined>(undefined);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // Only scroll when bot messages are added or typing indicator appears
    if (isTyping || messages[messages.length - 1]?.sender === 'bot') {
      scrollToBottom();
    }
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking and respond
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(text, lastTopic),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      setLastTopic(getTopicFromResponse(text));
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleQuickQuestion = (query: string) => {
    handleSendMessage(query);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <div className="min-h-screen bg-black text-white px-8 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#2f6bff] to-[#1a4fd6] rounded-full flex items-center justify-center">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold">
                <span className="text-[#2f6bff]">NECS</span> Bot
              </h1>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mt-1">
                <Sparkles className="w-4 h-4 text-[#fb923c]" />
                <span>AI-Powered Tournament Assistant</span>
              </div>
            </div>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ask me anything about NECS 2026! I can help with tickets, schedule, teams, venue info, and more.
          </p>
        </div>

        {/* Quick Questions */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            Quick Questions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickQuestions.map((q, idx) => {
              const Icon = q.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleQuickQuestion(q.query)}
                  className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3 hover:bg-[#2a2a2a] hover:border-[#2f6bff] transition-all text-left group"
                >
                  <Icon className="w-5 h-5 text-[#2f6bff] mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-gray-300">{q.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl overflow-hidden">
          {/* Messages Area */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4" ref={messagesContainerRef}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'bot' 
                    ? 'bg-gradient-to-br from-[#2f6bff] to-[#1a4fd6]' 
                    : 'bg-[#2a2a2a]'
                }`}>
                  {message.sender === 'bot' ? (
                    <Bot className="w-5 h-5 text-white" />
                  ) : (
                    <User className="w-5 h-5 text-white" />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`flex-1 max-w-[80%] ${message.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div className={`rounded-xl px-4 py-3 ${
                    message.sender === 'bot'
                      ? 'bg-[#1a1a1a] border border-[#2a2a2a]'
                      : 'bg-[#2f6bff] text-white'
                  }`}>
                    <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 px-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-[#2f6bff] to-[#1a4fd6]">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-[#1a1a1a] p-4 bg-[#0f0f0f]">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask NECS Bot anything..."
                className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#2f6bff] focus:outline-none transition-colors"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="bg-[#2f6bff] hover:bg-[#2557d6] disabled:bg-[#1a1a1a] disabled:text-gray-600 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-3 text-center">
              NECS Bot is an AI assistant. For urgent matters, please contact our support team.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-[#2f6bff]/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6 text-[#2f6bff]" />
            </div>
            <h3 className="font-semibold mb-2">Instant Answers</h3>
            <p className="text-sm text-gray-400">Get immediate responses to your tournament questions 24/7</p>
          </div>
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-[#fb923c]/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <HelpCircle className="w-6 h-6 text-[#fb923c]" />
            </div>
            <h3 className="font-semibold mb-2">Expert Knowledge</h3>
            <p className="text-sm text-gray-400">Comprehensive info about all tournament aspects</p>
          </div>
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Bot className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="font-semibold mb-2">Always Learning</h3>
            <p className="text-sm text-gray-400">Updated with the latest tournament information</p>
          </div>
        </div>
      </div>
    </div>
  );
}