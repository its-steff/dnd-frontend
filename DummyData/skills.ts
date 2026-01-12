export type SkillName =
  | "Acrobatics"
  | "Arcana"
  | "Athletics"
  | "Bluff"
  | "Diplomacy"
  | "Dungeoneering"
  | "Endurance"
  | "Heal"
  | "History"
  | "Insight"
  | "Intimidate"
  | "Nature"
  | "Perception"
  | "Religion"
  | "Stealth"
  | "Streetwise"
  | "Thievery";

export const SKILLS: Record<
  SkillName,
  { ability: string; hasArmorPenalty: boolean }
> = {
  Acrobatics: { ability: "Dexterity", hasArmorPenalty: false },
  Athletics: { ability: "Strength", hasArmorPenalty: true },
  Arcana: { ability: "Intelligence", hasArmorPenalty: false },
  Bluff: { ability: "Charisma", hasArmorPenalty: false },
  Diplomacy: { ability: "Charisma", hasArmorPenalty: false },
  Dungeoneering: { ability: "Wisdom", hasArmorPenalty: false },
  Endurance: { ability: "Constitution", hasArmorPenalty: true },
  Heal: { ability: "Wisdom", hasArmorPenalty: false },
  History: { ability: "Intelligence", hasArmorPenalty: false },
  Insight: { ability: "Wisdom", hasArmorPenalty: false },
  Intimidate: { ability: "Charisma", hasArmorPenalty: false },
  Nature: { ability: "Wisdom", hasArmorPenalty: false },
  Perception: { ability: "Wisdom", hasArmorPenalty: false },
  Religion: { ability: "Intelligence", hasArmorPenalty: false },
  Stealth: { ability: "Dexterity", hasArmorPenalty: true },
  Streetwise: { ability: "Charisma", hasArmorPenalty: false },
  Thievery: { ability: "Dexterity", hasArmorPenalty: true },
};
