import { CharacterSkills } from "@/types/skills";

export interface SkillsPanelProps {
  title: string;
  abilities: Record<string, number>;
  skills: CharacterSkills;
  setSkills: React.Dispatch<React.SetStateAction<CharacterSkills>>;
}
