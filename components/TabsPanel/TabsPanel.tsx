"use client";

import styles from "./TabsPanel.module.scss";
import { TabsPanelProps } from "./TabsPanelProps.types";
import AbilitiesPanel from "./AbilitiesPanel/AbilitiesPanel";
import CombatStatsPanel from "./CombatStatsPanel/CombatStatsPanel";

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
}) => {
  const calculateTotalHP = () => {
    if (assignedScores.Constitution > 0 && selectedClass) {
      const classHP = parseInt(selectedClass?.starting_hp);
      const constitutionScore = assignedScores.Constitution;
      return classHP + constitutionScore;
    }
  };

  const calculateBloodied = () => {
    if (totalHP) {
      return totalHP % 2;
    }
  };

//   const calculateSurgesPerDay = () => {
//     if(assignedScores.Constitution > 0){
// return assignedScores.Constitution
//     }
//   }

  const totalHP = calculateTotalHP();
  const bloodiedValue = calculateBloodied();

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
        surgeValue={0}
        surgesPerDay={0}
      />
    ),
    Skills: <div>Skills panel coming soon…</div>,
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
