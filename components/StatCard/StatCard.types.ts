export interface StatCardProps {
  racialBonus?: number;
  modifier: number;
  name: string;
  score: number;
  abilityBonus?: number;
  classBonus?: number;
  armorBonus?: number;
  featBonus?: number;
  miscBonus?: number;
  type: "ability" | "defense";
}
