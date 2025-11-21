export interface StandardArrayPanelProps {
  abilities: string[];
  assignedScores: Record<string, number>;
  onSelect: (ability: string, value: number) => void;
}
