"use client";

import styles from "./TabsPanel.module.scss";
import { TabsPanelProps } from "./TabsPanelProps.types";
import AbilitiesPanel from "./AbilitiesPanel/AbilitiesPanel";
import CombatStatsPanel from "./CombatStatsPanel/CombatStatsPanel";
import SkillsPanel from "./SkillsPanel/SkillsPanel";

const TabsPanel: React.FC<TabsPanelProps> = ({
  activeTab,
  abilitiesList,
  selectedClass,
  selectedSpecies,
  assignedScores,
  setAssignedScores,
  defensesList,
  setAssignedDefenses,
  classDefenseBonus,
  skills,
  setSkills,
}) => {
  // Shared modifier calculation function (same logic as AbilitiesPanel)
  const getModifier = (score: number) => {
    if (score <= 9) return -1;
    if (score <= 11) return 0;
    if (score <= 13) return +1;
    if (score <= 15) return +2;
    if (score <= 17) return +3;
    if (score <= 19) return +4;
    return +5; // 20+ etc.
  };

  const calculateTotalHP = () => {
    if (assignedScores.Constitution > 0 && selectedClass) {
      const classHP = parseInt(selectedClass?.starting_hp);
      const constitutionScore = assignedScores.Constitution;
      return classHP + constitutionScore;
    }
    return undefined;
  };

  const calculateBloodied = (hp: number | undefined) => {
    if (hp) {
      return Math.floor(hp / 2);
    }
    return undefined;
  };

  const calculateConstitutionModifier = () => {
    const racialBonuses = selectedSpecies?.abilities ?? {};
    const constitutionKey = "constitution";
    const racialBonus = racialBonuses[constitutionKey]
      ? parseInt(racialBonuses[constitutionKey], 10)
      : 0;
    const baseScore = assignedScores.Constitution ?? 10;
    const totalScore = baseScore + racialBonus;
    return getModifier(totalScore);
  };

  const calculateSurgesPerDay = () => {
    const constitutionModifier = calculateConstitutionModifier();

    const classHealingSurges = selectedClass?.healing_surges_per_day;

    if (classHealingSurges) {
      return classHealingSurges + constitutionModifier;
    } else return 0;
  };

  const calculateSurgeValue = (hp: number | undefined) => {
    if (hp) {
      // Healing surge value is typically 1/4 of max HP
      return Math.floor(hp / 4);
    }
    return 0;
  };

  const totalHP = calculateTotalHP();
  const bloodiedValue = calculateBloodied(totalHP);
  const surgesPerDay = calculateSurgesPerDay();
  const surgeValue = calculateSurgeValue(totalHP);

  const panelMap: Record<string, React.ReactNode> = {
    Abilities: (
      <AbilitiesPanel
        abilities={abilitiesList}
        selectedSpecies={selectedSpecies}
        assignedScores={assignedScores}
        setAssignedScores={setAssignedScores}
        defenses={defensesList}
        setAssignedDefenses={setAssignedDefenses}
        classDefenseBonus={classDefenseBonus || undefined}
      />
    ),
    "Combat Stats": (
      <CombatStatsPanel
        totalHP={totalHP}
        bloodied={bloodiedValue}
        surgeValue={surgeValue}
        surgesPerDay={surgesPerDay}
      />
    ),
    Skills: (
      <SkillsPanel
        title="Skills Panel"
        skills={skills}
        abilities={assignedScores}
        setSkills={setSkills}
        selectedClass={selectedClass}
      />
    ),
    Powers: <div>Powers panel coming soon…</div>,
    Inventory: <div>Inventory panel coming soon…</div>,
  };



  return (
    <section className={styles.panelSection}>
      {panelMap[activeTab] ?? null}
    </section>
  );
};

export default TabsPanel;
