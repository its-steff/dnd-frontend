import { CharacterSkills } from "@/types/skills";
import { Classes } from "@/types/classes";

export interface SkillsPanelProps {
  title: string;
  abilities: Record<string, number>;
  skills: CharacterSkills;
  setSkills: React.Dispatch<React.SetStateAction<CharacterSkills>>;
  selectedClass?: Classes | null;
}
