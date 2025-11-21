export interface Species {
  name: string;
  description?: string;
  size?: string;
  speed?: string | number;
  vision?: string;
  languages?: string[];
  abilities?: Partial<Record<string, string>>;
  defenses?: Partial<Record<string, string>>;
  skill_bonuses?: Partial<Record<string, string>>;
  racial_powers?: Partial<Record<string, string>>;
}
