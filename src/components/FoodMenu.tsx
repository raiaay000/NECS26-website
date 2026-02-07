import { useState } from 'react';

const foodItems = [
  { id: 1, name: "Championship Burger", description: "Angus beef patty, cheddar, bacon, special sauce", price: 14, category: "Mains", image: "https://images.unsplash.com/photo-1627378378955-a3f4e406c5de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyJTIwZm9vZHxlbnwxfHx8fDE3NzAxNTIyNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 2, name: "Nashville Hot Chicken", description: "Crispy fried chicken with Nashville hot sauce", price: 13, category: "Mains", spicy: true, image: "https://images.unsplash.com/photo-1694718255848-02827741ba24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXNodmlsbGUlMjBob3QlMjBjaGlja2VufGVufDF8fHx8MTc3MDI0NTQ0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 4, name: "Victory Pizza", description: "Hand-tossed pizza with premium toppings", price: 11, category: "Mains", vegetarian: true, image: "https://images.unsplash.com/photo-1544982503-9f984c14501a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHNsaWNlfGVufDF8fHx8MTc3MDE4ODc4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 6, name: "Loaded Arena Fries", description: "Crispy fries topped with cheese, bacon, jalapeños", price: 9, category: "Sides", image: "https://images.unsplash.com/photo-1762284513031-3d7ad15562bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2FkZWQlMjBmcmllcyUyMGNoZWVzZSUyMGJhY29ufGVufDF8fHx8MTc3MDI1MzM4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 8, name: "Buffalo Wings", description: "Eight crispy wings tossed in buffalo sauce", price: 12, category: "Sides", spicy: true, image: "https://images.unsplash.com/photo-1608039755401-742074f0548d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWZmYWxvJTIwd2luZ3MlMjBzYXVjZXxlbnwxfHx8fDE3NzAyNTMzODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
];

const offers = [
  { title: "Combo Deal", desc: "Any main + side + drink for $25", badge: "Save $5", color: "from-[#2f6bff] to-[#1a4ed6]" },
  { title: "Happy Hour", desc: "50% off all drinks 2-4 PM", badge: "Daily", color: "from-green-600 to-green-700" },
  { title: "VIP Special", desc: "Free appetizer with any order", badge: "VIP Only", color: "from-purple-600 to-purple-700" },
];

const dietary = ["🥬 Vegetarian options available", "🌾 Gluten-free options available", "🌶️ Spicy level can be adjusted", "🥜 Please inform staff of any allergies"];

export function FoodMenu() {
  const [cat, setCat] = useState('All');
  const items = cat === 'All' ? foodItems : foodItems.filter(i => i.category === cat);

  return (
    <div className="min-h-screen pt-20 px-8 pb-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">Food & Beverages</h1>
        <p className="text-gray-400 mb-2">Fuel up for the competition</p>
        <div className="bg-[#2f6bff]/20 border border-[#2f6bff] rounded-lg p-4 mb-8">
          <p className="text-sm text-[#2f6bff]">☕ Complimentary coffee, energy drinks, and water provided by NECS 2026</p>
        </div>
        <div className="flex gap-4 mb-12">
          {["All", "Mains", "Sides"].map(c => <button key={c} onClick={() => setCat(c)} className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${cat === c ? 'bg-[#2f6bff] text-white' : 'bg-[#1a1a1a] text-gray-400 hover:text-white'}`}>{c}</button>)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map(i => (
            <div key={i.id} className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg overflow-hidden hover:border-[#2f6bff] transition-all flex gap-4 p-4">
              <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-[#1a1a1a]">
                <img src={i.image} alt={i.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg">{i.name}</h3>
                    <span className="text-xl font-bold text-[#2f6bff]">${i.price}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{i.description}</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs bg-[#1a1a1a] px-2 py-1 rounded text-gray-400">{i.category}</span>
                  {i.spicy && <span className="text-xs bg-red-500/20 px-2 py-1 rounded text-red-400">🌶️ Spicy</span>}
                  {i.vegetarian && <span className="text-xs bg-green-500/20 px-2 py-1 rounded text-green-400">🥬 Vegetarian</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((o, i) => (
            <div key={i} className={`bg-gradient-to-br ${o.color} rounded-lg p-6`}>
              <h3 className="text-xl font-bold mb-2">{o.title}</h3>
              <p className="text-sm mb-4">{o.desc}</p>
              <div className="text-2xl font-bold">{o.badge}</div>
            </div>
          ))}
        </div>
        <div className="mt-12 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Dietary Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
            {dietary.map((d, i) => <p key={i}>{d}</p>)}
          </div>
        </div>
      </div>
    </div>
  );
}