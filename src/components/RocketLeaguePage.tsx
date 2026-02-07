import rocketLeagueImage from "../assets/a26a918307d87e9094af78a572bbb63e3b9ab4bf.png";
import { GamePage } from './shared/GamePage';

const tips = [
  "Rotation is everything - always maintain field position",
  "Master aerials and ceiling shots for offensive pressure",
  "Boost management can make or break plays",
  "Defense first - don't over-commit on offense",
  "Practice wall plays and recoveries"
];

export function RocketLeaguePage({ onBack }: { onBack: () => void }) {
  return <GamePage game="Rocket League" image={rocketLeagueImage} tips={tips} onBack={onBack} />;
}
