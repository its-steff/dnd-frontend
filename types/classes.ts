export interface Classes {
  armor_proficiencies: string[];
  class_features: Partial<Record<string, string>>;
  defense_bonus: string | string[];
  healing_surges_per_day: number;
  hp_per_level: string;
  implement?: string;
  key_abilities: string[];
  name: string;
  power_source: string;
  role: string;
  starting_hp: string;
  trained_skill?: string;
  trained_skill_choices: string[];
  weapon_proficiencies: string[];
}
