import valorantImage from "../assets/0f2a9c23d65f901adf302b77729392316771b373.png";
import { GamePage } from './shared/GamePage';

const tips = [
  "Master at least 3 agents across different roles",
  "Economy management wins rounds - know when to save",
  "Crosshair placement at head level saves milliseconds",
  "Use utility to gather info before committing",
  "Communication is key - always call out enemy positions"
];

export function ValorantPage({ onBack }: { onBack: () => void }) {
  return <GamePage game="Valorant" image={valorantImage} tips={tips} onBack={onBack} />;
}
