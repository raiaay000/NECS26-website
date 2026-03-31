import { Ticket, Gift, Star, Users, Calendar, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useToast } from './ui/toast';
import { motion } from 'motion/react';

export function Raffle() {
  const toast = useToast();
  const [isEntered, setIsEntered] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', agreeToTerms: false });
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: prizeRef, isVisible: prizeVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }
    setIsEntered(true);
    toast.success('Entry submitted! Good luck! 🎉');
  };

  const prizeDetails = [
    { icon: Ticket, title: 'VIP Access', desc: 'Full 5-day VIP tournament pass' },
    { icon: Gift, title: 'Exclusive Swag', desc: 'Limited edition NECS 2026 merchandise bundle' },
    { icon: Users, title: 'Meet & Greets', desc: 'Private sessions with pro players and teams' },
  ];

  const raffleStats = [
    { label: 'Total Entries', value: '12,847', color: 'text-[#2f6bff]' },
    { label: 'Winners Selected', value: '50', color: 'text-[#fb923c]' },
    { label: 'Days Remaining', value: '7', color: 'text-green-500' },
  ];

  if (isEntered) {
    return (
      <div className="min-h-screen pt-20 px-8 pb-8 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-[#2f6bff] to-[#1a4fd6] rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4">You're Entered!</h1>
          <p className="text-xl text-gray-400 mb-8">
            Your raffle entry has been submitted successfully. We'll notify you via email if you win!
          </p>
          <div className="bg-[#0a0a0a] border border-[#2f6bff] rounded-xl p-6 mb-6">
            <p className="text-gray-300 mb-2">Entry Confirmation</p>
            <p className="text-2xl font-bold text-[#2f6bff]">#{Math.floor(Math.random() * 100000)}</p>
            <p className="text-sm text-gray-400 mt-2">Winners announced on April 30, 2026</p>
          </div>
          <p className="text-sm text-gray-500">
            Check your email for confirmation and follow us on social media for winner announcements!
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-8 pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <div ref={heroRef} className={`text-center mb-16 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <motion.div
            initial={{ rotate: -10, scale: 0.8 }}
            animate={heroVisible ? { rotate: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, type: 'spring' }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="w-32 h-40 bg-gradient-to-br from-[#2f6bff] to-[#1a4fd6] rounded-2xl shadow-2xl transform rotate-3">
                <div className="absolute inset-0 border-4 border-dashed border-white/30 rounded-2xl m-2" />
                <div className="flex items-center justify-center h-full">
                  <Ticket className="w-16 h-16 text-white" />
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-[#fb923c] rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-white" fill="white" />
              </div>
            </div>
          </motion.div>

          <h1 className="text-6xl font-bold mb-4">
            Win <span className="text-[#2f6bff]">FREE</span> VIP Tickets!
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Enter our exclusive raffle for a chance to win VIP passes to NECS 2026. 50 winners will be selected!
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
            {raffleStats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={heroVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-4"
              >
                <div className={`text-3xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Prize Details */}
        <div ref={prizeRef} className={`mb-16 transition-all duration-700 ${prizeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl font-bold mb-8 text-center">What You'll Win</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {prizeDetails.map((prize, idx) => {
              const Icon = prize.icon;
              return (
                <motion.div
                  key={prize.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={prizeVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-8 text-center hover:border-[#2f6bff] transition-all"
                >
                  <div className="w-20 h-20 bg-[#2f6bff]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-10 h-10 text-[#2f6bff]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{prize.title}</h3>
                  <p className="text-gray-400">{prize.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Entry Form */}
        <div ref={formRef} className={`max-w-2xl mx-auto transition-all duration-700 ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-[#2f6bff]" />
              <h2 className="text-3xl font-bold">Enter the Raffle</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#2f6bff] focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#2f6bff] focus:outline-none transition-all"
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded border-[#2a2a2a] bg-[#1a1a1a] text-[#2f6bff] focus:ring-[#2f6bff]"
                />
                <label htmlFor="terms" className="text-sm text-gray-400">
                  I agree to the raffle terms and conditions and confirm I am 18 years or older
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2f6bff] hover:bg-[#2557d6] py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Ticket className="w-5 h-5" />
                Submit Entry
              </button>

              <p className="text-xs text-gray-500 text-center">
                One entry per person. Winners will be randomly selected on April 30, 2026 and notified via email.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
