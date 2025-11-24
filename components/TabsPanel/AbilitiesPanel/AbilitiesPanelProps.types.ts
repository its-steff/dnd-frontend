import { Species } from "@/types/species";

export interface AbilitiesPanelProps {
  abilities: string[];
  assignedScores: Record<string, number>;
  selectedSpecies?: Species | null;
  setAssignedScores: React.Dispatch<
    React.SetStateAction<Record<string, number>>
  >;
  setAssignedDefenses: React.Dispatch<
    React.SetStateAction<Record<string, number>>
  >;
  defenses: string[];
  classDefenseBonus?: string | string[];
}
