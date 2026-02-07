const smashImage = '';
import { GamePage } from './shared/GamePage';

const tips = [
  "Learn your character's combo trees and kill confirms",
  "Stage control and edge-guarding win matches",
  "DI (Directional Influence) can save you from early KOs",
  "Mix up your recovery options to avoid being predictable",
  "Study matchups — know your character's strengths vs others"
];

export function SuperSmashBrosPage({ onBack }: { onBack: () => void }) {
  return <GamePage game="Super Smash Bros" image={smashImage} tips={tips} onBack={onBack} />;
}
