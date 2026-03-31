import { Download as DownloadIcon, Smartphone, Monitor, Tablet, Play, Star, Users, TrendingUp } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { motion } from 'motion/react';

export function Download() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();

  const features = [
    { icon: Smartphone, title: 'Mobile Ready', desc: 'Full experience on iOS and Android' },
    { icon: Monitor, title: 'Desktop App', desc: 'Optimized for Windows, Mac, and Linux' },
    { icon: Tablet, title: 'Tablet Support', desc: 'Perfect viewing on any screen size' },
  ];

  const stats = [
    { icon: Star, value: '4.9', label: 'App Rating' },
    { icon: Users, value: '500K+', label: 'Downloads' },
    { icon: TrendingUp, value: '99%', label: 'Satisfaction' },
  ];

  return (
    <div className="min-h-screen pt-20 px-8 pb-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div ref={heroRef} className={`text-center mb-16 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={heroVisible ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
            <div className="w-24 h-24 mx-auto bg-[#2f6bff] rounded-3xl flex items-center justify-center rotate-12 hover:rotate-0 transition-transform duration-300">
              <DownloadIcon className="w-12 h-12 text-white -rotate-12 hover:rotate-0 transition-transform duration-300" />
            </div>
          </motion.div>
          
          <h1 className="text-6xl font-bold mb-6">
            Download <span className="text-[#2f6bff]">NECS 2026</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Experience the tournament anywhere, anytime. Stream live matches, track your favorite teams, and never miss a moment.
          </p>
          
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="https://raiaay000.github.io/NECS26-App/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2f6bff] hover:bg-[#2557d6] px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all transform hover:scale-105"
            >
              <DownloadIcon className="w-6 h-6" />
              Download Now
            </a>
            <button className="bg-[#1a1a1a] hover:bg-[#2a2a2a] px-8 py-4 rounded-xl font-bold text-lg border border-[#2a2a2a] transition-all">
              View Features
            </button>
          </div>
        </div>

        {/* Platform Features */}
        <div ref={featuresRef} className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 transition-all duration-700 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={featuresVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-8 hover:border-[#2f6bff] transition-all group"
              >
                <div className="w-16 h-16 bg-[#2f6bff]/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#2f6bff]/30 transition-all">
                  <Icon className="w-8 h-8 text-[#2f6bff]" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        <div ref={statsRef} className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={statsVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: idx * 0.1 }}
                className="bg-gradient-to-br from-[#2f6bff] to-[#1a4fd6] rounded-xl p-8 text-center"
              >
                <Icon className="w-12 h-12 mx-auto mb-4 text-white" />
                <div className="text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-white/80 text-lg">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}