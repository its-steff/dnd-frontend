"use client";

import styles from "./TabsPanel.module.scss";
import { TabsPanelProps } from "./TabsPanelProps.types";
import AbilitiesPanel from "./AbilitiesPanel/AbilitiesPanel";

const TabsPanel: React.FC<TabsPanelProps> = ({
  activeTab,
  abilitiesList,
  selectedSpecies,
  assignedScores,
  setAssignedScores,
  defensesList,
  setAssignedDefenses,
  classDefenseBonus,
}) => {
  const findPanel =
    activeTab === "Abilities" ? (
      <AbilitiesPanel
        abilities={abilitiesList}
        selectedSpecies={selectedSpecies}
        assignedScores={assignedScores}
        setAssignedScores={setAssignedScores}
        defenses={defensesList}
        setAssignedDefenses={setAssignedDefenses}
        classDefenseBonus={classDefenseBonus || undefined}
      />
    ) : undefined;

  return <section className={styles.panelSection}>{findPanel}</section>;
};

export default TabsPanel;
