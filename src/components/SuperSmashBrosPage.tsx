<<<<<<< HEAD
import smashImage from 'figma:asset/13106e410ec274380c5ed3457e761121ff7a9513.png';
=======
import smashImage from 'figma:asset/0f2a9c23d65f901adf302b77729392316771b373.png';
>>>>>>> ed37ba7e5134ef60801ee7d8b3ff4540e6400f5e
import { GamePage } from './shared/GamePage';

const tips = [
  "Learn your character's combo trees and kill confirms",
  "Stage control and edge-guarding win matches",
  "DI (Directional Influence) can save you from early KOs",
  "Mix up your recovery options to avoid being predictable",
  "Study matchups - know your character's strengths vs others"
];

export function SuperSmashBrosPage({ onBack }: { onBack: () => void }) {
  return <GamePage game="Super Smash Bros" image={smashImage} tips={tips} onBack={onBack} />;
}
