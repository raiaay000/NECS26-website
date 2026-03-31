import { 
  Shield, 
  HelpCircle, 
  FileText, 
  Globe, 
  Share2, 
  Award, 
  Zap,
  Lock,
  Eye,
  Book,
  Heart,
  Info,
  Trophy,
  Star,
  Target,
  Flame,
  Users,
  ShoppingCart,
  Calendar,
  X,
  CheckCircle,
  Ticket,
  MessageCircle,
  Copy,
  Mail,
  Send,
  UserPlus,
  Gift,
  Clock,
  Smartphone,
  TrendingUp,
  Map,
  Video,
  Home,
  Gamepad2,
  ChevronRight,
  Check,
  AlertTriangle,
  Download,
  Trash2,
  Key,
  RefreshCw,
  Settings
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface MenuItem {
  icon: any;
  title: string;
  description: string;
  action: () => void;
  color: string;
  page?: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  points: number;
  unlockedDate?: string;
  category: 'general' | 'social' | 'attendance' | 'engagement' | 'collector';
}

interface MoreProps {
  onNavigate?: (page: string) => void;
}

export function More({ onNavigate }: MoreProps) {
  const [showAchievements, setShowAchievements] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showInviteFriends, setShowInviteFriends] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [invitesSent, setInvitesSent] = useState(3);
  const [referralCode] = useState('NECS-XJ8K2P');
  
  // New modal states
  const [showLanguage, setShowLanguage] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  
  // Settings states
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedTimezone, setSelectedTimezone] = useState('America/New_York');
  const [textSize, setTextSize] = useState('medium');
  const [highContrast, setHighContrast] = useState(false);
  const [reduceAnimations, setReduceAnimations] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [backupCodes] = useState(['NECS-A1B2C3', 'NECS-D4E5F6', 'NECS-G7H8I9', 'NECS-J0K1L2', 'NECS-M3N4O5']);
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  const [twoFactorStep, setTwoFactorStep] = useState<'setup' | 'qr' | 'verify' | 'complete'>('setup');
  const [verificationCode, setVerificationCode] = useState('');
  const [dataSharingEnabled, setDataSharingEnabled] = useState(true);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState('public');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);

  // Achievement data - simulating user progress
  const achievements: Achievement[] = [
    // General
    {
      id: 'first_login',
      name: 'Welcome to NECS',
      description: 'Complete your first login',
      icon: Star,
      color: '#2f6bff',
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      points: 10,
      unlockedDate: 'March 28, 2026',
      category: 'general'
    },
    {
      id: 'profile_complete',
      name: 'Profile Master',
      description: 'Complete your profile information',
      icon: Users,
      color: '#10b981',
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      points: 25,
      unlockedDate: 'March 29, 2026',
      category: 'general'
    },
    {
      id: 'onboarding_complete',
      name: 'Tutorial Graduate',
      description: 'Complete the onboarding tutorial',
      icon: Target,
      color: '#fb923c',
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      points: 15,
      unlockedDate: 'March 28, 2026',
      category: 'general'
    },
    
    // Attendance
    {
      id: 'ticket_purchased',
      name: 'Ticket Holder',
      description: 'Purchase your first NECS 2026 ticket',
      icon: Ticket,
      color: '#8b5cf6',
      unlocked: false,
      progress: 0,
      maxProgress: 1,
      points: 50,
      category: 'attendance'
    },
    {
      id: 'vip_access',
      name: 'VIP Experience',
      description: 'Purchase a VIP ticket',
      icon: Trophy,
      color: '#eab308',
      unlocked: false,
      progress: 0,
      maxProgress: 1,
      points: 100,
      category: 'attendance'
    },
    {
      id: 'all_days',
      name: '5-Day Champion',
      description: 'Attend all 5 days of the tournament',
      icon: Calendar,
      color: '#ec4899',
      unlocked: false,
      progress: 0,
      maxProgress: 5,
      points: 200,
      category: 'attendance'
    },
    
    // Social
    {
      id: 'share_event',
      name: 'Social Butterfly',
      description: 'Share NECS 2026 with friends',
      icon: Share2,
      color: '#06b6d4',
      unlocked: true,
      progress: 3,
      maxProgress: 3,
      points: 30,
      unlockedDate: 'March 30, 2026',
      category: 'social'
    },
    {
      id: 'join_party',
      name: 'Party Animal',
      description: 'Join or create a viewing party',
      icon: Users,
      color: '#f59e0b',
      unlocked: false,
      progress: 0,
      maxProgress: 1,
      points: 40,
      category: 'social'
    },
    {
      id: 'chat_messages',
      name: 'Conversationalist',
      description: 'Send 50 messages in party chat',
      icon: MessageCircle,
      color: '#10b981',
      unlocked: false,
      progress: 12,
      maxProgress: 50,
      points: 50,
      category: 'social'
    },
    
    // Engagement
    {
      id: 'schedule_viewed',
      name: 'Schedule Scout',
      description: 'View the tournament schedule',
      icon: Calendar,
      color: '#2f6bff',
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      points: 20,
      unlockedDate: 'March 29, 2026',
      category: 'engagement'
    },
    {
      id: 'teams_explored',
      name: 'Team Analyst',
      description: 'View all 12 team profiles',
      icon: Users,
      color: '#fb923c',
      unlocked: false,
      progress: 7,
      maxProgress: 12,
      points: 75,
      category: 'engagement'
    },
    {
      id: 'games_mastery',
      name: 'Game Expert',
      description: 'Learn about all three tournament games',
      icon: Target,
      color: '#8b5cf6',
      unlocked: true,
      progress: 3,
      maxProgress: 3,
      points: 40,
      unlockedDate: 'March 30, 2026',
      category: 'engagement'
    },
    {
      id: 'bracket_predictor',
      name: 'Oracle',
      description: 'Make predictions for tournament brackets',
      icon: Trophy,
      color: '#eab308',
      unlocked: false,
      progress: 0,
      maxProgress: 1,
      points: 60,
      category: 'engagement'
    },
    {
      id: 'venue_explorer',
      name: 'Venue Expert',
      description: 'Explore all venue features',
      icon: Target,
      color: '#06b6d4',
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      points: 35,
      unlockedDate: 'March 31, 2026',
      category: 'engagement'
    },
    
    // Collector
    {
      id: 'first_merch',
      name: 'Merch Collector',
      description: 'Purchase your first merchandise item',
      icon: ShoppingCart,
      color: '#ec4899',
      unlocked: false,
      progress: 0,
      maxProgress: 1,
      points: 30,
      category: 'collector'
    },
    {
      id: 'food_order',
      name: 'Foodie',
      description: 'Order food to your seat',
      icon: Flame,
      color: '#f59e0b',
      unlocked: false,
      progress: 0,
      maxProgress: 1,
      points: 25,
      category: 'collector'
    },
    {
      id: 'complete_collection',
      name: 'Ultimate Fan',
      description: 'Unlock all achievements',
      icon: Award,
      color: '#eab308',
      unlocked: false,
      progress: 7,
      maxProgress: 16,
      points: 500,
      category: 'collector'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Achievements', icon: Award },
    { id: 'general', name: 'General', icon: Star },
    { id: 'social', name: 'Social', icon: Share2 },
    { id: 'attendance', name: 'Attendance', icon: Calendar },
    { id: 'engagement', name: 'Engagement', icon: Target },
    { id: 'collector', name: 'Collector', icon: Trophy }
  ];

  const filteredAchievements = selectedCategory === 'all'
    ? achievements
    : achievements.filter(a => a.category === selectedCategory);

  const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0);
  const maxPoints = achievements.reduce((sum, a) => sum + a.points, 0);
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  const menuItems: MenuItem[] = [
    {
      icon: HelpCircle,
      title: 'FAQs',
      description: 'Frequently Asked Questions',
      action: () => onNavigate?.('faqs'),
      color: 'text-[#2f6bff]',
      page: 'faqs'
    },
    {
      icon: Award,
      title: 'Achievements',
      description: 'View your badges and accomplishments',
      action: () => setShowAchievements(true),
      color: 'text-[#fb923c]'
    },
    {
      icon: Share2,
      title: 'Invite Friends',
      description: 'Share NECS 2026 with your friends',
      action: () => setShowInviteFriends(true),
      color: 'text-[#2f6bff]'
    },
    {
      icon: Zap,
      title: 'Quick Actions',
      description: 'Access frequently used features',
      action: () => setShowQuickActions(true),
      color: 'text-[#10b981]'
    },
    {
      icon: Globe,
      title: 'Language & Region',
      description: 'Change your language preferences',
      action: () => setShowLanguage(true),
      color: 'text-[#8b5cf6]'
    },
    {
      icon: Eye,
      title: 'Accessibility',
      description: 'Customize your viewing experience',
      action: () => setShowAccessibility(true),
      color: 'text-[#06b6d4]'
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Manage your data and security settings',
      action: () => setShowPrivacy(true),
      color: 'text-[#ef4444]'
    },
    {
      icon: Lock,
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security',
      action: () => setShow2FA(true),
      color: 'text-[#f59e0b]'
    },
    {
      icon: FileText,
      title: 'Terms of Service',
      description: 'Read our terms and conditions',
      action: () => setShowTerms(true),
      color: 'text-gray-400'
    },
    {
      icon: Book,
      title: 'Privacy Policy',
      description: 'Learn about our privacy practices',
      action: () => toast.info('Privacy Policy'),
      color: 'text-gray-400'
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      description: 'Get assistance with your account',
      action: () => toast.info('Help center coming soon!'),
      color: 'text-[#2f6bff]'
    },
    {
      icon: Heart,
      title: 'Feedback',
      description: 'Share your thoughts and suggestions',
      action: () => toast.info('Feedback form coming soon!'),
      color: 'text-[#ec4899]'
    },
    {
      icon: Info,
      title: 'About NECS 2026',
      description: 'Learn more about the tournament',
      action: () => toast.info('About page coming soon!'),
      color: 'text-[#2f6bff]'
    }
  ];

  return (
    <div className="min-h-screen pt-20 px-8 pb-8 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">More Options</h1>
          <p className="text-gray-400 text-xl">Additional settings and features for your account</p>
        </div>

        {/* App Info Card */}
        <div className="bg-gradient-to-r from-[#2f6bff]/20 to-[#fb923c]/20 border border-[#2f6bff]/30 rounded-xl p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-[#2f6bff] rounded-2xl flex items-center justify-center text-3xl font-bold">
              N
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">NECS 2026</h2>
              <p className="text-gray-300 mb-3">National Esports Championship Series</p>
              <div className="flex gap-4 text-sm">
                <span className="px-3 py-1 bg-[#1a1a1a] rounded-lg">Version 2.0.1</span>
                <span className="px-3 py-1 bg-[#1a1a1a] rounded-lg">May 8-10, 2026</span>
                <span className="px-3 py-1 bg-[#10b981]/20 text-[#10b981] rounded-lg font-semibold">✓ Up to date</span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={item.action}
                className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6 hover:border-[#2f6bff] hover:bg-[#0f0f0f] transition-all text-left group"
              >
                <Icon className={`w-8 h-8 ${item.color} mb-4 group-hover:scale-110 transition-transform`} />
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.description}</p>
              </button>
            );
          })}
        </div>

        {/* Legal Section */}
        <div className="mt-12 border-t border-[#1a1a1a] pt-8">
          <div className="text-center text-gray-400 text-sm space-y-2">
            <p>© 2026 NECS. All rights reserved.</p>
            <p>Built with ❤️ for the esports community</p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Careers</a>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-8 text-center">
          <Heart className="w-12 h-12 text-[#ec4899] mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Enjoying NECS 2026?</h3>
          <p className="text-gray-400 mb-6">Rate us and share your experience with others!</p>
          <div className="flex gap-3 justify-center">
            <button 
              onClick={() => toast.success('Thank you for your rating! ⭐')}
              className="px-6 py-3 bg-[#2f6bff] hover:bg-[#2557d6] rounded-lg font-bold transition-all"
            >
              Rate App
            </button>
            <button 
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(window.location.origin);
                  toast.success('Link copied to clipboard!');
                } catch {
                  toast.error('Unable to share');
                }
              }}
              className="px-6 py-3 bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-lg font-bold transition-all"
            >
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Achievements Modal */}
      {showAchievements && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border-2 border-[#fb923c] rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-[#0a0a0a] border-b border-[#1a1a1a] p-6 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <Trophy className="w-8 h-8 text-[#fb923c]" />
                  Achievements
                </h2>
                <p className="text-gray-400 mt-2">
                  {unlockedCount} of {totalCount} unlocked • {totalPoints} / {maxPoints} points
                </p>
              </div>
              <button
                onClick={() => setShowAchievements(false)}
                className="p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Stats Card */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 text-center">
                  <Trophy className="w-8 h-8 text-[#fb923c] mx-auto mb-2" />
                  <div className="text-3xl font-bold text-[#fb923c]">{unlockedCount}</div>
                  <div className="text-sm text-gray-400">Unlocked</div>
                </div>
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 text-center">
                  <Star className="w-8 h-8 text-[#2f6bff] mx-auto mb-2" />
                  <div className="text-3xl font-bold text-[#2f6bff]">{totalPoints}</div>
                  <div className="text-sm text-gray-400">Points Earned</div>
                </div>
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 text-center">
                  <Target className="w-8 h-8 text-[#10b981] mx-auto mb-2" />
                  <div className="text-3xl font-bold text-[#10b981]">
                    {Math.round((unlockedCount / totalCount) * 100)}%
                  </div>
                  <div className="text-sm text-gray-400">Completion</div>
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6 flex flex-wrap gap-2">
                {categories.map(cat => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                        selectedCategory === cat.id
                          ? 'bg-[#fb923c] text-white'
                          : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {cat.name}
                    </button>
                  );
                })}
              </div>

              {/* Achievements Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredAchievements.map(achievement => {
                  const Icon = achievement.icon;
                  const progressPercent = (achievement.progress / achievement.maxProgress) * 100;
                  
                  return (
                    <div
                      key={achievement.id}
                      className={`border rounded-xl p-6 transition-all ${
                        achievement.unlocked
                          ? 'bg-[#1a1a1a] border-[#fb923c]'
                          : 'bg-[#0a0a0a] border-[#2a2a2a] opacity-60'
                      }`}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            achievement.unlocked ? 'opacity-100' : 'opacity-40'
                          }`}
                          style={{ backgroundColor: `${achievement.color}20` }}
                        >
                          <Icon
                            className="w-8 h-8"
                            style={{ color: achievement.color }}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-bold text-lg">{achievement.name}</h3>
                            {achievement.unlocked && (
                              <CheckCircle className="w-5 h-5 text-[#fb923c] flex-shrink-0 ml-2" />
                            )}
                          </div>
                          <p className="text-sm text-gray-400 mb-2">{achievement.description}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Star className="w-3 h-3" />
                            <span>{achievement.points} points</span>
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {!achievement.unlocked && achievement.maxProgress > 1 && (
                        <div>
                          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                            <span>Progress</span>
                            <span>
                              {achievement.progress} / {achievement.maxProgress}
                            </span>
                          </div>
                          <div className="w-full bg-[#0a0a0a] rounded-full h-2 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-300"
                              style={{
                                width: `${progressPercent}%`,
                                backgroundColor: achievement.color
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Unlocked Date */}
                      {achievement.unlocked && achievement.unlockedDate && (
                        <div className="mt-3 pt-3 border-t border-[#2a2a2a]">
                          <p className="text-xs text-gray-500">
                            Unlocked on {achievement.unlockedDate}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invite Friends Modal */}
      {showInviteFriends && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border-2 border-[#2f6bff] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-[#0a0a0a] border-b border-[#1a1a1a] p-6 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <UserPlus className="w-8 h-8 text-[#2f6bff]" />
                  Invite Friends
                </h2>
                <p className="text-gray-400 mt-2">
                  Share NECS 2026 and earn 10 points per friend!
                </p>
              </div>
              <button
                onClick={() => setShowInviteFriends(false)}
                className="p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Stats Card */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 text-center">
                  <Users className="w-8 h-8 text-[#2f6bff] mx-auto mb-2" />
                  <div className="text-3xl font-bold text-[#2f6bff]">{invitesSent}</div>
                  <div className="text-sm text-gray-400">Invites Sent</div>
                </div>
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 text-center">
                  <Star className="w-8 h-8 text-[#fb923c] mx-auto mb-2" />
                  <div className="text-3xl font-bold text-[#fb923c]">{invitesSent * 10}</div>
                  <div className="text-sm text-gray-400">Points Earned</div>
                </div>
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 text-center">
                  <Gift className="w-8 h-8 text-[#10b981] mx-auto mb-2" />
                  <div className="text-3xl font-bold text-[#10b981]">
                    {5 - invitesSent > 0 ? 5 - invitesSent : 0}
                  </div>
                  <div className="text-sm text-gray-400">Until Reward</div>
                </div>
              </div>

              {/* Referral Code Section */}
              <div className="bg-gradient-to-r from-[#2f6bff]/20 to-[#fb923c]/20 border border-[#2f6bff]/30 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-lg mb-2">Your Referral Code</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-4 font-mono text-xl text-[#2f6bff] text-center">
                    {referralCode}
                  </div>
                  <button
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(referralCode);
                        toast.success('Referral code copied!');
                      } catch {
                        toast.error('Unable to copy');
                      }
                    }}
                    className="px-6 py-4 bg-[#2f6bff] hover:bg-[#2557d6] rounded-lg font-bold transition-all flex items-center gap-2"
                  >
                    <Copy className="w-5 h-5" />
                    Copy
                  </button>
                </div>
                <p className="text-sm text-gray-400 text-center">
                  Friends can enter this code during registration
                </p>
              </div>

              {/* Share Options Grid */}
              <div className="space-y-3 mb-6">
                <h3 className="font-bold text-lg mb-4">Share via</h3>
                
                {/* Native Share */}
                <button
                  onClick={async () => {
                    if (navigator.share) {
                      try {
                        await navigator.share({
                          title: 'NECS 2026',
                          text: `Join me at NECS 2026 - National Esports Championship! Use my referral code: ${referralCode}`,
                          url: window.location.origin
                        });
                        setInvitesSent(invitesSent + 1);
                        toast.success('Shared successfully!');
                      } catch (error) {
                        if (error instanceof Error && error.name !== 'AbortError') {
                          toast.error('Share cancelled');
                        }
                      }
                    } else {
                      toast.info('Share not supported on this browser');
                    }
                  }}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#2f6bff] rounded-lg p-4 transition-all flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-[#2f6bff]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Share2 className="w-6 h-6 text-[#2f6bff]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-bold">Share Link</h4>
                    <p className="text-sm text-gray-400">Use native share menu</p>
                  </div>
                  <Send className="w-5 h-5 text-gray-500" />
                </button>

                {/* Copy Link */}
                <button
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(`${window.location.origin}?ref=${referralCode}`);
                      toast.success('Link copied to clipboard!');
                      setInvitesSent(invitesSent + 1);
                    } catch {
                      toast.error('Unable to copy link');
                    }
                  }}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#2f6bff] rounded-lg p-4 transition-all flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-[#10b981]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Copy className="w-6 h-6 text-[#10b981]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-bold">Copy Link</h4>
                    <p className="text-sm text-gray-400">Share anywhere</p>
                  </div>
                  <Send className="w-5 h-5 text-gray-500" />
                </button>

                {/* Email */}
                <button
                  onClick={() => {
                    window.location.href = `mailto:?subject=Join me at NECS 2026!&body=Hey! I'm attending NECS 2026 and thought you might be interested. Use my referral code: ${referralCode}%0A%0A${window.location.origin}`;
                    setInvitesSent(invitesSent + 1);
                    toast.success('Opening email client...');
                  }}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#2f6bff] rounded-lg p-4 transition-all flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-[#fb923c]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-[#fb923c]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-bold">Email Invite</h4>
                    <p className="text-sm text-gray-400">Send personal invites</p>
                  </div>
                  <Send className="w-5 h-5 text-gray-500" />
                </button>

                {/* SMS */}
                <button
                  onClick={() => {
                    window.location.href = `sms:?&body=Join me at NECS 2026! Use my referral code: ${referralCode} - ${window.location.origin}`;
                    setInvitesSent(invitesSent + 1);
                    toast.success('Opening SMS...');
                  }}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#2f6bff] rounded-lg p-4 transition-all flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-[#8b5cf6]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Smartphone className="w-6 h-6 text-[#8b5cf6]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-bold">Text Message</h4>
                    <p className="text-sm text-gray-400">Share via SMS</p>
                  </div>
                  <Send className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Rewards Info */}
              <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-[#fb923c]" />
                  Referral Rewards
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#10b981]/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-[#10b981]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">10 points per friend</p>
                      <p className="text-xs text-gray-400">When they sign up</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#2f6bff]/20 flex items-center justify-center flex-shrink-0">
                      <Star className="w-5 h-5 text-[#2f6bff]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">5 Friends = Special Badge</p>
                      <p className="text-xs text-gray-400">Limited edition achievement</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#fb923c]/20 flex items-center justify-center flex-shrink-0">
                      <Trophy className="w-5 h-5 text-[#fb923c]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">10 Friends = VIP Upgrade</p>
                      <p className="text-xs text-gray-400">Free ticket upgrade</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions Modal */}
      {showQuickActions && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border-2 border-[#10b981] rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-[#0a0a0a] border-b border-[#1a1a1a] p-6 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <Zap className="w-8 h-8 text-[#10b981]" />
                  Quick Actions
                </h2>
                <p className="text-gray-400 mt-2">
                  Fast access to frequently used features
                </p>
              </div>
              <button
                onClick={() => setShowQuickActions(false)}
                className="p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Recently Used */}
              <div className="mb-8">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#fb923c]" />
                  Recently Used
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setShowQuickActions(false);
                      onNavigate?.('teams');
                    }}
                    className="bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#10b981] rounded-lg p-4 transition-all flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 bg-[#2f6bff]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Users className="w-6 h-6 text-[#2f6bff]" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-bold">Teams</h4>
                      <p className="text-xs text-gray-400">View all 12 teams</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setShowQuickActions(false);
                      onNavigate?.('schedule');
                    }}
                    className="bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#10b981] rounded-lg p-4 transition-all flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 bg-[#fb923c]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Calendar className="w-6 h-6 text-[#fb923c]" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-bold">Schedule</h4>
                      <p className="text-xs text-gray-400">Match times & dates</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setShowQuickActions(false);
                      onNavigate?.('venue');
                    }}
                    className="bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#10b981] rounded-lg p-4 transition-all flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 bg-[#8b5cf6]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Map className="w-6 h-6 text-[#8b5cf6]" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-bold">Venue</h4>
                      <p className="text-xs text-gray-400">Arena info & map</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setShowQuickActions(false);
                      onNavigate?.('watch');
                    }}
                    className="bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#10b981] rounded-lg p-4 transition-all flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 bg-[#ec4899]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Video className="w-6 h-6 text-[#ec4899]" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-bold">Watch</h4>
                      <p className="text-xs text-gray-400">Content creators</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Popular Actions */}
              <div className="mb-8">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#10b981]" />
                  Popular Actions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setShowQuickActions(false);
                      onNavigate?.('tickets');
                    }}
                    className="bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#10b981] rounded-lg p-4 transition-all flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 bg-[#10b981]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Ticket className="w-6 h-6 text-[#10b981]" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-bold">Buy Tickets</h4>
                      <p className="text-xs text-gray-400">Get your pass</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setShowQuickActions(false);
                      onNavigate?.('merch');
                    }}
                    className="bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#10b981] rounded-lg p-4 transition-all flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 bg-[#f59e0b]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ShoppingCart className="w-6 h-6 text-[#f59e0b]" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-bold">Merchandise</h4>
                      <p className="text-xs text-gray-400">Official merch</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setShowQuickActions(false);
                      onNavigate?.('games');
                    }}
                    className="bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#10b981] rounded-lg p-4 transition-all flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 bg-[#06b6d4]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Gamepad2 className="w-6 h-6 text-[#06b6d4]" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-bold">Games</h4>
                      <p className="text-xs text-gray-400">Tournament games</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setShowQuickActions(false);
                      onNavigate?.('home');
                    }}
                    className="bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#10b981] rounded-lg p-4 transition-all flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 bg-[#2f6bff]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Home className="w-6 h-6 text-[#2f6bff]" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-bold">Home</h4>
                      <p className="text-xs text-gray-400">Back to main page</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Account Actions */}
              <div>
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#2f6bff]" />
                  Account
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setShowQuickActions(false);
                      onNavigate?.('profile');
                    }}
                    className="bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#10b981] rounded-lg p-4 transition-all flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 bg-[#fb923c]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Users className="w-6 h-6 text-[#fb923c]" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-bold">Profile</h4>
                      <p className="text-xs text-gray-400">View your profile</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setShowQuickActions(false);
                      setShowAchievements(true);
                    }}
                    className="bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#10b981] rounded-lg p-4 transition-all flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 bg-[#eab308]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Trophy className="w-6 h-6 text-[#eab308]" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-bold">Achievements</h4>
                      <p className="text-xs text-gray-400">View your badges</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setShowQuickActions(false);
                      setShowInviteFriends(true);
                    }}
                    className="bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#10b981] rounded-lg p-4 transition-all flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 bg-[#ec4899]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <UserPlus className="w-6 h-6 text-[#ec4899]" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-bold">Invite Friends</h4>
                      <p className="text-xs text-gray-400">Share & earn points</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setShowQuickActions(false);
                      onNavigate?.('faqs');
                    }}
                    className="bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#10b981] rounded-lg p-4 transition-all flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 bg-[#8b5cf6]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <HelpCircle className="w-6 h-6 text-[#8b5cf6]" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-bold">FAQs</h4>
                      <p className="text-xs text-gray-400">Get help</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Language Modal */}
      {showLanguage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border-2 border-[#2f6bff] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-[#0a0a0a] border-b border-[#1a1a1a] p-6 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <Globe className="w-8 h-8 text-[#2f6bff]" />
                  Language & Region
                </h2>
                <p className="text-gray-400 mt-2">
                  Change your language preferences
                </p>
              </div>
              <button
                onClick={() => setShowLanguage(false)}
                className="p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Language Selection */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-4">Language</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedLanguage('English')}
                    className={`bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#2f6bff] rounded-lg p-4 transition-all flex items-center gap-4 group ${
                      selectedLanguage === 'English' ? 'bg-[#2f6bff] text-white' : ''
                    }`}
                  >
                    <div className="w-12 h-12 bg-[#2f6bff]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Globe className="w-6 h-6 text-[#2f6bff]" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-bold">English</h4>
                      <p className="text-xs text-gray-400">United States</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedLanguage('Spanish')}
                    className={`bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#2f6bff] rounded-lg p-4 transition-all flex items-center gap-4 group ${
                      selectedLanguage === 'Spanish' ? 'bg-[#2f6bff] text-white' : ''
                    }`}
                  >
                    <div className="w-12 h-12 bg-[#2f6bff]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Globe className="w-6 h-6 text-[#2f6bff]" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-bold">Spanish</h4>
                      <p className="text-xs text-gray-400">España</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedLanguage('French')}
                    className={`bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#2f6bff] rounded-lg p-4 transition-all flex items-center gap-4 group ${
                      selectedLanguage === 'French' ? 'bg-[#2f6bff] text-white' : ''
                    }`}
                  >
                    <div className="w-12 h-12 bg-[#2f6bff]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Globe className="w-6 h-6 text-[#2f6bff]" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-bold">French</h4>
                      <p className="text-xs text-gray-400">France</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedLanguage('German')}
                    className={`bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#2f6bff] rounded-lg p-4 transition-all flex items-center gap-4 group ${
                      selectedLanguage === 'German' ? 'bg-[#2f6bff] text-white' : ''
                    }`}
                  >
                    <div className="w-12 h-12 bg-[#2f6bff]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Globe className="w-6 h-6 text-[#2f6bff]" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-bold">German</h4>
                      <p className="text-xs text-gray-400">Deutschland</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Timezone Selection */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-4">Timezone</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedTimezone('America/New_York')}
                    className={`bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#2f6bff] rounded-lg p-4 transition-all flex items-center gap-4 group ${
                      selectedTimezone === 'America/New_York' ? 'bg-[#2f6bff] text-white' : ''
                    }`}
                  >
                    <div className="w-12 h-12 bg-[#2f6bff]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Globe className="w-6 h-6 text-[#2f6bff]" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-bold">Eastern Time (ET)</h4>
                      <p className="text-xs text-gray-400">America/New_York</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedTimezone('Europe/London')}
                    className={`bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#2f6bff] rounded-lg p-4 transition-all flex items-center gap-4 group ${
                      selectedTimezone === 'Europe/London' ? 'bg-[#2f6bff] text-white' : ''
                    }`}
                  >
                    <div className="w-12 h-12 bg-[#2f6bff]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Globe className="w-6 h-6 text-[#2f6bff]" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-bold">Greenwich Mean Time (GMT)</h4>
                      <p className="text-xs text-gray-400">Europe/London</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedTimezone('Asia/Tokyo')}
                    className={`bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#2f6bff] rounded-lg p-4 transition-all flex items-center gap-4 group ${
                      selectedTimezone === 'Asia/Tokyo' ? 'bg-[#2f6bff] text-white' : ''
                    }`}
                  >
                    <div className="w-12 h-12 bg-[#2f6bff]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Globe className="w-6 h-6 text-[#2f6bff]" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-bold">Japan Standard Time (JST)</h4>
                      <p className="text-xs text-gray-400">Asia/Tokyo</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedTimezone('Australia/Sydney')}
                    className={`bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#2f6bff] rounded-lg p-4 transition-all flex items-center gap-4 group ${
                      selectedTimezone === 'Australia/Sydney' ? 'bg-[#2f6bff] text-white' : ''
                    }`}
                  >
                    <div className="w-12 h-12 bg-[#2f6bff]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Globe className="w-6 h-6 text-[#2f6bff]" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-bold">Australian Eastern Time (AET)</h4>
                      <p className="text-xs text-gray-400">Australia/Sydney</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Date Format */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-4">Date Format</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'].map(format => (
                    <button
                      key={format}
                      onClick={() => {
                        setDateFormat(format);
                        toast.success(`Date format changed to ${format}`);
                      }}
                      className={`bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#2f6bff] rounded-lg p-4 transition-all text-center ${
                        dateFormat === format ? 'border-[#2f6bff] bg-[#2f6bff]/10' : ''
                      }`}
                    >
                      <div className="font-bold mb-1">{format}</div>
                      <div className="text-xs text-gray-400">
                        {format === 'MM/DD/YYYY' && '03/31/2026'}
                        {format === 'DD/MM/YYYY' && '31/03/2026'}
                        {format === 'YYYY-MM-DD' && '2026-03-31'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Current Settings Summary */}
              <div className="bg-gradient-to-r from-[#2f6bff]/10 to-[#fb923c]/10 border border-[#2f6bff]/30 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-lg mb-3">Current Settings</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Language:</span>
                    <span className="font-semibold">{selectedLanguage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Timezone:</span>
                    <span className="font-semibold">{selectedTimezone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date Format:</span>
                    <span className="font-semibold">{dateFormat}</span>
                  </div>
                </div>
              </div>

              {/* Save Settings */}
              <div className="text-center">
                <button
                  onClick={() => {
                    toast.success('Language & Region settings saved successfully!');
                    setTimeout(() => setShowLanguage(false), 1500);
                  }}
                  className="px-6 py-3 bg-[#2f6bff] hover:bg-[#2557d6] rounded-lg font-bold transition-all"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Accessibility Modal */}
      {showAccessibility && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border-2 border-[#2f6bff] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-[#0a0a0a] border-b border-[#1a1a1a] p-6 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <Eye className="w-8 h-8 text-[#2f6bff]" />
                  Accessibility
                </h2>
                <p className="text-gray-400 mt-2">
                  Customize your viewing experience
                </p>
              </div>
              <button
                onClick={() => setShowAccessibility(false)}
                className="p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Text Size */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-4">Text Size</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    onClick={() => setTextSize('small')}
                    className={`bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#2f6bff] rounded-lg p-4 transition-all flex items-center gap-4 group ${
                      textSize === 'small' ? 'bg-[#2f6bff] text-white' : ''
                    }`}
                  >
                    <div className="w-12 h-12 bg-[#2f6bff]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Eye className="w-6 h-6 text-[#2f6bff]" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-bold">Small</h4>
                      <p className="text-xs text-gray-400">Smaller text for better focus</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setTextSize('medium')}
                    className={`bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#2f6bff] rounded-lg p-4 transition-all flex items-center gap-4 group ${
                      textSize === 'medium' ? 'bg-[#2f6bff] text-white' : ''
                    }`}
                  >
                    <div className="w-12 h-12 bg-[#2f6bff]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Eye className="w-6 h-6 text-[#2f6bff]" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-bold">Medium</h4>
                      <p className="text-xs text-gray-400">Default text size</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setTextSize('large')}
                    className={`bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#2f6bff] rounded-lg p-4 transition-all flex items-center gap-4 group ${
                      textSize === 'large' ? 'bg-[#2f6bff] text-white' : ''
                    }`}
                  >
                    <div className="w-12 h-12 bg-[#2f6bff]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Eye className="w-6 h-6 text-[#2f6bff]" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-bold">Large</h4>
                      <p className="text-xs text-gray-400">Larger text for better readability</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* High Contrast */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-4">High Contrast</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    onClick={() => setHighContrast(!highContrast)}
                    className={`bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#2f6bff] rounded-lg p-4 transition-all flex items-center gap-4 group ${
                      highContrast ? 'bg-[#2f6bff] text-white' : ''
                    }`}
                  >
                    <div className="w-12 h-12 bg-[#2f6bff]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Eye className="w-6 h-6 text-[#2f6bff]" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-bold">High Contrast</h4>
                      <p className="text-xs text-gray-400">Enhance visibility for better focus</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Reduce Animations */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-4">Reduce Animations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    onClick={() => setReduceAnimations(!reduceAnimations)}
                    className={`bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#2f6bff] rounded-lg p-4 transition-all flex items-center gap-4 group ${
                      reduceAnimations ? 'bg-[#2f6bff] text-white' : ''
                    }`}
                  >
                    <div className="w-12 h-12 bg-[#2f6bff]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Eye className="w-6 h-6 text-[#2f6bff]" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-bold">Reduce Animations</h4>
                      <p className="text-xs text-gray-400">Minimize animations for better performance</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Screen Reader */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-4">Screen Reader Support</h3>
                <button
                  onClick={() => {
                    setScreenReaderEnabled(!screenReaderEnabled);
                    toast.success(screenReaderEnabled ? 'Screen reader disabled' : 'Screen reader enabled');
                  }}
                  className={`w-full bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#2f6bff] rounded-lg p-4 transition-all flex items-center gap-4 ${
                    screenReaderEnabled ? 'border-[#10b981] bg-[#10b981]/10' : ''
                  }`}
                >
                  <div className="w-12 h-12 bg-[#10b981]/20 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-[#10b981]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-bold">Screen Reader</h4>
                    <p className="text-xs text-gray-400">
                      {screenReaderEnabled ? 'Enabled - Optimized for screen readers' : 'Enable for screen reader support'}
                    </p>
                  </div>
                  <div className={`w-12 h-6 rounded-full transition-colors ${screenReaderEnabled ? 'bg-[#10b981]' : 'bg-gray-600'}`}>
                    <div className={`w-6 h-6 rounded-full bg-white transition-transform ${screenReaderEnabled ? 'translate-x-6' : ''}`} />
                  </div>
                </button>
              </div>

              {/* Current Settings Summary */}
              <div className="bg-gradient-to-r from-[#2f6bff]/10 to-[#fb923c]/10 border border-[#2f6bff]/30 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-lg mb-3">Current Settings</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Text Size:</span>
                    <span className="font-semibold capitalize">{textSize}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">High Contrast:</span>
                    <span className={`font-semibold ${highContrast ? 'text-[#10b981]' : 'text-gray-500'}`}>
                      {highContrast ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Reduce Animations:</span>
                    <span className={`font-semibold ${reduceAnimations ? 'text-[#10b981]' : 'text-gray-500'}`}>
                      {reduceAnimations ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Screen Reader:</span>
                    <span className={`font-semibold ${screenReaderEnabled ? 'text-[#10b981]' : 'text-gray-500'}`}>
                      {screenReaderEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Save Settings */}
              <div className="text-center">
                <button
                  onClick={() => {
                    toast.success('Accessibility settings saved successfully!');
                    setTimeout(() => setShowAccessibility(false), 1500);
                  }}
                  className="px-6 py-3 bg-[#2f6bff] hover:bg-[#2557d6] rounded-lg font-bold transition-all"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border-2 border-[#2f6bff] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-[#0a0a0a] border-b border-[#1a1a1a] p-6 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <Shield className="w-8 h-8 text-[#2f6bff]" />
                  Privacy & Security
                </h2>
                <p className="text-gray-400 mt-2">
                  Manage your data and security settings
                </p>
              </div>
              <button
                onClick={() => setShowPrivacy(false)}
                className="p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Data Sharing */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-4">Data Sharing & Privacy</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setDataSharingEnabled(!dataSharingEnabled);
                      toast.success(dataSharingEnabled ? 'Data sharing disabled' : 'Data sharing enabled');
                    }}
                    className={`w-full bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#2f6bff] rounded-lg p-4 transition-all flex items-center gap-4 ${
                      dataSharingEnabled ? 'border-[#10b981] bg-[#10b981]/10' : ''
                    }`}
                  >
                    <div className="w-12 h-12 bg-[#2f6bff]/20 rounded-lg flex items-center justify-center">
                      <Share2 className="w-6 h-6 text-[#2f6bff]" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-bold">Data Sharing</h4>
                      <p className="text-xs text-gray-400">Share anonymous usage data to improve the platform</p>
                    </div>
                    <div className={`w-12 h-6 rounded-full transition-colors ${dataSharingEnabled ? 'bg-[#10b981]' : 'bg-gray-600'}`}>
                      <div className={`w-6 h-6 rounded-full bg-white transition-transform ${dataSharingEnabled ? 'translate-x-6' : ''}`} />
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setAnalyticsEnabled(!analyticsEnabled);
                      toast.success(analyticsEnabled ? 'Analytics disabled' : 'Analytics enabled');
                    }}
                    className={`w-full bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#2f6bff] rounded-lg p-4 transition-all flex items-center gap-4 ${
                      analyticsEnabled ? 'border-[#10b981] bg-[#10b981]/10' : ''
                    }`}
                  >
                    <div className="w-12 h-12 bg-[#fb923c]/20 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-[#fb923c]" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-bold">Analytics & Performance</h4>
                      <p className="text-xs text-gray-400">Help us improve performance with analytics data</p>
                    </div>
                    <div className={`w-12 h-6 rounded-full transition-colors ${analyticsEnabled ? 'bg-[#10b981]' : 'bg-gray-600'}`}>
                      <div className={`w-6 h-6 rounded-full bg-white transition-transform ${analyticsEnabled ? 'translate-x-6' : ''}`} />
                    </div>
                  </button>
                </div>
              </div>

              {/* Profile Visibility */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-4">Profile Visibility</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['public', 'friends', 'private'].map(visibility => (
                    <button
                      key={visibility}
                      onClick={() => {
                        setProfileVisibility(visibility);
                        toast.success(`Profile set to ${visibility}`);
                      }}
                      className={`bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#2f6bff] rounded-lg p-4 transition-all text-center ${
                        profileVisibility === visibility ? 'border-[#2f6bff] bg-[#2f6bff]/10' : ''
                      }`}
                    >
                      <div className="font-bold capitalize mb-1">{visibility}</div>
                      <div className="text-xs text-gray-400">
                        {visibility === 'public' && 'Everyone can see'}
                        {visibility === 'friends' && 'Only friends'}
                        {visibility === 'private' && 'Only you'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Account Actions */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-4">Account Data</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      toast.success('Preparing your data download...');
                      setTimeout(() => toast.info('Download link sent to your email'), 2000);
                    }}
                    className="bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#2f6bff] rounded-lg p-4 transition-all flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 bg-[#10b981]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Download className="w-6 h-6 text-[#10b981]" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-bold">Download Your Data</h4>
                      <p className="text-xs text-gray-400">Get a copy of your account data</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                        toast.error('Account deletion initiated. Check your email to confirm.');
                      }
                    }}
                    className="bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#ef4444] rounded-lg p-4 transition-all flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 bg-[#ef4444]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Trash2 className="w-6 h-6 text-[#ef4444]" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-bold text-[#ef4444]">Delete Account</h4>
                      <p className="text-xs text-gray-400">Permanently delete your account</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Current Settings Summary */}
              <div className="bg-gradient-to-r from-[#2f6bff]/10 to-[#fb923c]/10 border border-[#2f6bff]/30 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-lg mb-3">Current Settings</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Data Sharing:</span>
                    <span className={`font-semibold ${dataSharingEnabled ? 'text-[#10b981]' : 'text-gray-500'}`}>
                      {dataSharingEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Analytics:</span>
                    <span className={`font-semibold ${analyticsEnabled ? 'text-[#10b981]' : 'text-gray-500'}`}>
                      {analyticsEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Profile Visibility:</span>
                    <span className="font-semibold capitalize">{profileVisibility}</span>
                  </div>
                </div>
              </div>

              {/* Save Settings */}
              <div className="text-center">
                <button
                  onClick={() => {
                    toast.success('Privacy & Security settings saved successfully!');
                    setTimeout(() => setShowPrivacy(false), 1500);
                  }}
                  className="px-6 py-3 bg-[#2f6bff] hover:bg-[#2557d6] rounded-lg font-bold transition-all"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2FA Modal */}
      {show2FA && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border-2 border-[#2f6bff] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-[#0a0a0a] border-b border-[#1a1a1a] p-6 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <Lock className="w-8 h-8 text-[#2f6bff]" />
                  Two-Factor Authentication
                </h2>
                <p className="text-gray-400 mt-2">
                  Add an extra layer of security
                </p>
              </div>
              <button
                onClick={() => setShow2FA(false)}
                className="p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {!is2FAEnabled ? (
                /* Setup Flow */
                <>
                  {/* 2FA Explanation */}
                  <div className="bg-gradient-to-r from-[#2f6bff]/10 to-[#10b981]/10 border border-[#2f6bff]/30 rounded-xl p-6 mb-6">
                    <h3 className="font-bold text-lg mb-3">Why Enable 2FA?</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#10b981] flex-shrink-0 mt-0.5" />
                        <span>Adds an extra layer of security to your account</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#10b981] flex-shrink-0 mt-0.5" />
                        <span>Protects against unauthorized access</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#10b981] flex-shrink-0 mt-0.5" />
                        <span>Required for VIP features and purchases</span>
                      </li>
                    </ul>
                  </div>

                  {/* Setup Button */}
                  <div className="text-center">
                    <button
                      onClick={() => {
                        setIs2FAEnabled(true);
                        setTwoFactorStep('qr');
                        toast.success('2FA setup started!');
                      }}
                      className="px-8 py-4 bg-[#10b981] hover:bg-[#059669] rounded-lg font-bold transition-all text-lg"
                    >
                      Enable Two-Factor Authentication
                    </button>
                  </div>
                </>
              ) : (
                /* 2FA Enabled - Show Management */
                <>
                  {/* Status Card */}
                  <div className="bg-gradient-to-r from-[#10b981]/20 to-[#2f6bff]/20 border border-[#10b981] rounded-xl p-6 mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-[#10b981] rounded-full flex items-center justify-center">
                        <CheckCircle className="w-10 h-10 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-[#10b981]">2FA Enabled</h3>
                        <p className="text-sm text-gray-400">Your account is protected</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300">
                      Two-factor authentication is currently active on your account. You'll need to enter a verification code from your authenticator app each time you log in.
                    </p>
                  </div>

                  {/* Backup Codes Section */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg">Backup Codes</h3>
                      <button
                        onClick={() => setShowBackupCodes(!showBackupCodes)}
                        className="px-4 py-2 bg-[#2f6bff] hover:bg-[#2557d6] rounded-lg font-semibold transition-all text-sm"
                      >
                        {showBackupCodes ? 'Hide' : 'Show'} Codes
                      </button>
                    </div>
                    
                    {showBackupCodes && (
                      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-4 text-sm text-yellow-500">
                          <AlertTriangle className="w-5 h-5" />
                          <span>Save these codes in a safe place. Each can only be used once.</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                          {backupCodes.map((code, index) => (
                            <div key={index} className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-3 font-mono text-center text-lg">
                              {code}
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={async () => {
                              try {
                                await navigator.clipboard.writeText(backupCodes.join('\n'));
                                toast.success('Backup codes copied to clipboard!');
                              } catch {
                                toast.error('Unable to copy codes');
                              }
                            }}
                            className="flex-1 px-4 py-2 bg-[#2f6bff] hover:bg-[#2557d6] rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                          >
                            <Copy className="w-4 h-4" />
                            Copy All
                          </button>
                          <button
                            onClick={() => {
                              const codesText = backupCodes.join('\n');
                              const blob = new Blob([codesText], { type: 'text/plain' });
                              const url = URL.createObjectURL(blob);
                              const a = document.createElement('a');
                              a.href = url;
                              a.download = 'necs-2fa-backup-codes.txt';
                              a.click();
                              toast.success('Backup codes downloaded!');
                            }}
                            className="flex-1 px-4 py-2 bg-[#10b981] hover:bg-[#059669] rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Regenerate Codes */}
                  <div className="mb-6">
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to regenerate backup codes? Old codes will no longer work.')) {
                          toast.success('New backup codes generated!');
                          setShowBackupCodes(true);
                        }
                      }}
                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#2f6bff] rounded-lg p-4 transition-all flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 bg-[#2f6bff]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <RefreshCw className="w-6 h-6 text-[#2f6bff]" />
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="font-bold">Regenerate Backup Codes</h4>
                        <p className="text-xs text-gray-400">Generate new backup codes (old ones will be invalidated)</p>
                      </div>
                    </button>
                  </div>

                  {/* Disable 2FA */}
                  <div className="text-center pt-4 border-t border-[#1a1a1a]">
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to disable 2FA? This will make your account less secure.')) {
                          setIs2FAEnabled(false);
                          setTwoFactorStep('setup');
                          toast.error('2FA has been disabled');
                        }
                      }}
                      className="px-6 py-3 bg-[#ef4444] hover:bg-[#dc2626] rounded-lg font-bold transition-all"
                    >
                      Disable Two-Factor Authentication
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Terms Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border-2 border-[#2f6bff] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-[#0a0a0a] border-b border-[#1a1a1a] p-6 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <FileText className="w-8 h-8 text-[#2f6bff]" />
                  Terms of Service
                </h2>
                <p className="text-gray-400 mt-2">
                  Read our terms and conditions
                </p>
              </div>
              <button
                onClick={() => setShowTerms(false)}
                className="p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Last Updated */}
              <div className="text-sm text-gray-400 mb-6 text-center">
                Last Updated: March 1, 2026
              </div>

              {/* Terms Content */}
              <div className="prose prose-invert max-w-none space-y-6">
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3 text-[#2f6bff]">1. Acceptance of Terms</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    By accessing and using the NECS 2026 platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, you may not access or use the platform.
                  </p>
                </div>

                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3 text-[#2f6bff]">2. Use License</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    Permission is granted to temporarily access the materials on NECS 2026's platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 text-sm space-y-2 ml-4">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose or public display</li>
                    <li>Attempt to decompile or reverse engineer any software</li>
                    <li>Remove any copyright or proprietary notations</li>
                    <li>Transfer the materials to another person or entity</li>
                  </ul>
                </div>

                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3 text-[#2f6bff]">3. Ticket Purchases & Refunds</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    All ticket sales are final. Refunds will only be issued in the following circumstances:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 text-sm space-y-2 ml-4">
                    <li>Event cancellation by NECS organizers</li>
                    <li>Significant schedule changes (more than 24 hours)</li>
                    <li>Technical errors preventing event access</li>
                  </ul>
                  <p className="text-gray-300 text-sm leading-relaxed mt-3">
                    Refund requests must be submitted within 48 hours of the qualifying event.
                  </p>
                </div>

                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3 text-[#2f6bff]">4. User Accounts</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of these Terms. You are responsible for safeguarding your password and for all activities that occur under your account.
                  </p>
                </div>

                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3 text-[#2f6bff]">5. Prohibited Conduct</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    You agree not to engage in any of the following prohibited activities:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 text-sm space-y-2 ml-4">
                    <li>Violating laws or regulations</li>
                    <li>Infringing on intellectual property rights</li>
                    <li>Harassing, threatening, or defaming others</li>
                    <li>Distributing viruses or malicious code</li>
                    <li>Attempting to gain unauthorized access</li>
                    <li>Interfering with platform operations</li>
                  </ul>
                </div>

                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3 text-[#2f6bff]">6. Privacy Policy</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Your use of NECS 2026 is also governed by our Privacy Policy. We collect and process personal data in accordance with applicable data protection laws. Please review our Privacy Policy to understand our practices.
                  </p>
                </div>

                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3 text-[#2f6bff]">7. Disclaimer</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    The materials on NECS 2026's platform are provided on an 'as is' basis. NECS 2026 makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                  </p>
                </div>

                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3 text-[#2f6bff]">8. Limitations</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    In no event shall NECS 2026 or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on NECS 2026's platform, even if NECS 2026 or a NECS 2026 authorized representative has been notified orally or in writing of the possibility of such damage.
                  </p>
                </div>

                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3 text-[#2f6bff]">9. Modifications</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    NECS 2026 may revise these terms of service at any time without notice. By using this platform you are agreeing to be bound by the then current version of these terms of service. We will notify users of significant changes via email or platform notification.
                  </p>
                </div>

                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3 text-[#2f6bff]">10. Contact Information</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    If you have any questions about these Terms, please contact us at:
                  </p>
                  <div className="mt-3 space-y-1 text-sm">
                    <p className="text-gray-300">📧 Email: legal@necs2026.com</p>
                    <p className="text-gray-300">📞 Phone: +1 (555) NECS-2026</p>
                    <p className="text-gray-300">📍 Address: Bridgestone Arena, Nashville, TN</p>
                  </div>
                </div>
              </div>

              {/* Accept Button */}
              <div className="mt-8 text-center border-t border-[#1a1a1a] pt-6">
                <button
                  onClick={() => {
                    toast.success('Terms acknowledged');
                    setTimeout(() => setShowTerms(false), 1000);
                  }}
                  className="px-8 py-3 bg-[#2f6bff] hover:bg-[#2557d6] rounded-lg font-bold transition-all"
                >
                  I Understand and Agree
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}