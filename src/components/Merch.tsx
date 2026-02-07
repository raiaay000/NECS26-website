import imgValorantJersey from "figma:asset/124c30e85729d638d2a7c7113fe212b660997b97.png";
import imgRocketLeagueJacket from "figma:asset/e1fbab3bbb71a3285e8ab43cd2032103f7696962.png";
import imgSmashHoodie from "figma:asset/3e5816a0b4dae1872977e9f4cc1b2c26872e6982.png";
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface MerchItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const merchItems: MerchItem[] = [
  { id: 1, name: "Valorant NECS Jersey", price: 89, image: imgValorantJersey, category: "Jerseys" },
  { id: 2, name: "Rocket League NECS Jacket", price: 129, image: imgRocketLeagueJacket, category: "Jackets" },
  { id: 3, name: "Super Smash Bros NECS Hoodie", price: 79, image: imgSmashHoodie, category: "Hoodies" },
  { id: 8, name: "NECS Limited Edition Mouse Pad", price: 29, image: "https://images.unsplash.com/photo-1629429408209-1f912961dbd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZSUyMHBhZHxlbnwxfHx8fDE3NzAxODkwMjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", category: "Accessories" },
  { id: 9, name: "NECS Water Bottle - Black", price: 25, image: "https://images.unsplash.com/photo-1720867181012-db0fd86d80fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGJvdHRsZSUyMGJsYWNrfGVufDF8fHx8MTc3MDI0NTM2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", category: "Accessories" },
];

interface MerchProps {
  onAddToCart: (item: { id: string; name: string; price: number; type: 'merch'; quantity: number }) => void;
}

export function Merch({ onAddToCart }: MerchProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ["All", "Jerseys", "Hoodies", "Jackets", "Accessories"];

  const headerRef = useScrollAnimation();
  const filtersRef = useScrollAnimation();
  const gridRef = useScrollAnimation();

  const filteredItems = selectedCategory === 'All' 
    ? merchItems 
    : merchItems.filter(item => item.category === selectedCategory);

  const addToCart = (item: MerchItem) => {
    onAddToCart({
      id: `merch-${item.id}`,
      name: item.name,
      price: item.price,
      type: 'merch',
      quantity: 1
    });
  };

  return (
    <div className="min-h-screen pt-20 px-8 pb-8">
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef.ref} className={`transition-all duration-700 ${headerRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl font-bold mb-4">Official Merchandise</h1>
          <p className="text-gray-400 mb-8">Rep your favorite teams and NECS 2026</p>
        </div>

        {/* Category Filter */}
        <div ref={filtersRef.ref} className={`flex gap-4 mb-12 transition-all duration-700 ${filtersRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-[#2f6bff] text-white'
                  : 'bg-[#1a1a1a] text-gray-400 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Merch Grid */}
        <div ref={gridRef.ref} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ${gridRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg overflow-hidden hover:border-[#2f6bff] transition-all group"
            >
              <div className="aspect-square overflow-hidden bg-[#1a1a1a]">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                />
              </div>
              <div className="p-6">
                <div className="text-xs text-[#2f6bff] mb-2">{item.category}</div>
                <h3 className="font-bold mb-2">{item.name}</h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold">${item.price}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-[#2f6bff] p-3 rounded-lg hover:bg-[#2557d6] transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}