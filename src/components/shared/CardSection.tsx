import { ArrowRight } from 'lucide-react';

interface InfoCardProps {
  title: string;
  description: string;
  badge?: string;
  price?: string;
  priceColor?: string;
}

interface CardSectionProps {
  cards: InfoCardProps[];
  buttonText: string;
  onButtonClick: () => void;
  buttonPrimary?: boolean;
}

const getBadgeStyle = (title: string) => {
  if (title.includes('Valorant')) return 'bg-[#10b981]/20 text-[#10b981] border-[#10b981]';
  if (title.includes('Rocket')) return 'bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]';
  if (title.includes('Smash')) return 'bg-gray-500/20 text-gray-300 border-gray-500';
  return 'bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]';
};

export function CardSection({ cards, buttonText, onButtonClick, buttonPrimary }: CardSectionProps) {
  return (
    <>
      <div className={`grid grid-cols-1 ${cards.length > 2 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-6 mb-6`}>
        {cards.map((card, i) => (
          <div key={i} className="bg-[#1a1a1a] border border-[#2a3342] rounded-lg p-6 hover:border-[#2f6bff] transition-colors">
            <h3 className="text-xl font-bold mb-2">{card.title}</h3>
            <p className="text-gray-400 mb-4">{card.description}</p>
            {card.badge && (
              <div className={`text-sm px-4 py-2 rounded-md border inline-block ${getBadgeStyle(card.title)}`}>
                {card.badge}
              </div>
            )}
            {card.price && (
              <div className={`text-3xl font-bold ${card.priceColor || 'text-white'}`}>{card.price}</div>
            )}
          </div>
        ))}
      </div>
      <button 
        onClick={onButtonClick}
        className={`w-full px-6 py-4 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 ${
          buttonPrimary 
            ? 'bg-[#2f6bff] text-white hover:bg-[#2557d6]' 
            : 'bg-[#1a1a1a] border border-[#2f6bff] text-[#2f6bff] hover:bg-[#2f6bff] hover:text-white'
        }`}
      >
        {buttonText} <ArrowRight className="w-5 h-5" />
      </button>
    </>
  );
}
