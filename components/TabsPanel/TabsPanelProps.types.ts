import { Species } from "@/types/species";

export interface TabsPanelProps {
  activeTab: string;
  abilitiesList: string[];
  selectedSpecies?: Species | null;
  assignedScores: Record<string, number>;
  setAssignedScores: React.Dispatch<
    React.SetStateAction<Record<string, number>>
  >;
  setAssignedDefenses: React.Dispatch<
    React.SetStateAction<Record<string, number>>
  >;
  defensesList: string[];
}
