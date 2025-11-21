export interface PointBuyPanelProps {
  abilities: string[];
  assignedScores: Record<string, number>;
  onSelect: (ability: string, value: number) => void;
  remainingPoints: number;
  // setRemainingPoints: (points: number) => void;
}
