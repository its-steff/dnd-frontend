import { Species } from "@/types/species";
import { Classes } from "@/types/classes";

export interface TabsPanelProps {
  activeTab: string;
  abilitiesList: string[];
  selectedClass?: Classes | null;
  selectedSpecies?: Species | null;
  assignedScores: Record<string, number>;
  setAssignedScores: React.Dispatch<
    React.SetStateAction<Record<string, number>>
  >;
  setAssignedDefenses: React.Dispatch<
    React.SetStateAction<Record<string, number>>
  >;
  defensesList: string[];
  classDefenseBonus?: string | string[];
}
