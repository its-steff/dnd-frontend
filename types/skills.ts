import { SkillName } from "@/DummyData/skills";

export type CharacterSkill = {
  trained: boolean;
  miscBonus: number;
  totalBonus: number;
};

export type CharacterSkills = Record<SkillName, CharacterSkill>;
