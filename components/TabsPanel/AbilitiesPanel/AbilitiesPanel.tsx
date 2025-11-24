"use client";

import { useState } from "react";
import styles from "./AbilitiesPanel.module.scss";
import { AbilitiesPanelProps } from "./AbilitiesPanelProps.types";
import StandardArrayPanel from "../StandardArrayPanel/StandardArrayPanel";
import PointBuyPanel from "../PointBuyPanel/PointBuyPanel";
import StatCard from "../../StatCard/StatCard";

const AbilitiesPanel: React.FC<AbilitiesPanelProps> = ({
  abilities,
  assignedScores,
  selectedSpecies,
  setAssignedScores,
  defenses,
  setAssignedDefenses,
  classDefenseBonus,
}) => {
  const [activeButtonPanel, setActiveButtonPanel] = useState<
    "standard" | "pointBuy" | null
  >(null);
  const [remainingPoints, setRemainingPoints] = useState(22);

  const pointBuyCosts: Record<number, number> = {
    8: 0,
    9: 1,
    10: 2,
    11: 3,
    12: 4,
    13: 5,
    14: 7,
    15: 9,
    16: 11,
    17: 14,
    18: 18,
  };

  const racialBonuses = selectedSpecies?.abilities ?? {};
  const racialDefenseBonuses = selectedSpecies?.defenses ?? {};

  const getModifier = (score: number) => {
    if (score <= 9) return -1;
    if (score <= 11) return 0;
    if (score <= 13) return +1;
    if (score <= 15) return +2;
    if (score <= 17) return +3;
    if (score <= 19) return +4;
    return +5; // 20+ etc.
  };

  function handleStandardSelect(ability: string, value: number) {
    setAssignedScores((prev) => {
      const updated = { ...prev };

      // Remove this score from any other ability that had it
      for (const key in updated) {
        if (updated[key] === value && key !== ability) {
          delete updated[key];
        }
      }

      updated[ability] = value;
      return updated;
    });
  }

  const handleSwitchPanel = (panel: "standard" | "pointBuy") => {
    if (activeButtonPanel === panel) {
      setActiveButtonPanel(null);
      return;
    }

    setActiveButtonPanel(panel);

    if (panel === "standard") {
      setAssignedScores({
        Strength: 0,
        Dexterity: 0,
        Constitution: 0,
        Intelligence: 0,
        Wisdom: 0,
        Charisma: 0,
      });
    } else if (panel === "pointBuy") {
      setAssignedScores({
        Strength: 8,
        Dexterity: 10,
        Constitution: 10,
        Intelligence: 10,
        Wisdom: 10,
        Charisma: 10,
      });
      setRemainingPoints(22);
    }
  };

  function handlePointBuySelect(ability: string, newScore: number) {
    setAssignedScores((prev) => {
      const updated = { ...prev };
      const oldScore = prev[ability];
      const costChange =
        (pointBuyCosts[newScore] ?? 0) - (pointBuyCosts[oldScore] ?? 0);
      const newRemaining = remainingPoints - costChange;

      // prevent overspending
      if (newRemaining < 0) {
        alert("You don’t have enough points left!");
        return prev;
      }

      // update
      updated[ability] = newScore;
      setRemainingPoints(newRemaining);
      return updated;
    });
  }

  function parseClassDefenseBonus(
    bonus: string | string[] | undefined
  ): Record<string, number> {
    if (!bonus) return {};
    const bonuses = Array.isArray(bonus) ? bonus : [bonus];

    const result: Record<string, number> = {};

    bonuses.forEach((entry) => {
      const match = entry.match(
        /([+-]?\d+)\s+(AC|Fortitude|Reflex|Willpower)/i
      );
      if (match) {
        const value = parseInt(match[1], 10);
        const defense = match[2];
        result[defense] = value;
      }
    });
    return result;
  }

  const getclassDefenseBonuses = parseClassDefenseBonus(classDefenseBonus);

  return (
    <div className={styles.abilitiesPanel}>
      <div className={styles.options}>
        <button onClick={() => handleSwitchPanel("standard")}>
          Standard Array
        </button>
        {activeButtonPanel === "standard" && (
          <StandardArrayPanel
            abilities={abilities}
            assignedScores={assignedScores}
            onSelect={handleStandardSelect}
          />
        )}

        <button onClick={() => handleSwitchPanel("pointBuy")}>Point Buy</button>
        {activeButtonPanel === "pointBuy" && (
          <PointBuyPanel
            abilities={abilities}
            assignedScores={assignedScores}
            remainingPoints={remainingPoints}
            onSelect={handlePointBuySelect}
          />
        )}
      </div>
      <div className={styles.abilities}>
        <h3>ABILITIES</h3>
        <div className={styles.abilitiesContainer}>
          {abilities.map((ability) => {
            const key = ability.toLowerCase();
            const racialBonus = racialBonuses[key]
              ? parseInt(racialBonuses[key], 10)
              : 0;
            const baseScore = assignedScores[ability] ?? 10;
            const totalScore = baseScore + racialBonus;
            const modifier = getModifier(totalScore);

            return (
              <StatCard
                type="ability"
                key={key}
                name={ability}
                score={assignedScores[ability]}
                racialBonus={racialBonus}
                modifier={modifier}
              />
            );
          })}
        </div>
        <h3>DEFENSES</h3>
        <div className={styles.defensesContainer}>
          {defenses.map((defense) => {
            const key = defense.toLowerCase();
            const racialDefenseBonus = racialDefenseBonuses[key]
              ? parseInt(racialDefenseBonuses[key], 10)
              : 0;

            const classBonus = getclassDefenseBonuses[defense] ?? 0;

            // 1. Compute the relevant ability modifiers here
            const dexMod = getModifier(
              (assignedScores["Dexterity"] ?? 10) +
                (racialBonuses["dexterity"]
                  ? parseInt(racialBonuses["dexterity"], 10)
                  : 0)
            );

            const intMod = getModifier(
              (assignedScores["Intelligence"] ?? 10) +
                (racialBonuses["intelligence"]
                  ? parseInt(racialBonuses["intelligence"], 10)
                  : 0)
            );

            const conMod = getModifier(
              (assignedScores["Constitution"] ?? 10) +
                (racialBonuses["constitution"]
                  ? parseInt(racialBonuses["constitution"], 10)
                  : 0)
            );

            const wisMod = getModifier(
              (assignedScores["Wisdom"] ?? 10) +
                (racialBonuses["wisdom"]
                  ? parseInt(racialBonuses["wisdom"], 10)
                  : 0)
            );

            // 2. Determine which ability applies
            let abilityBonus = 0;

            if (defense === "AC") {
              abilityBonus = Math.max(dexMod, intMod);
            } else if (defense === "Fortitude") {
              abilityBonus = conMod;
            } else if (defense === "Reflex") {
              abilityBonus = dexMod;
            } else if (defense === "Willpower") {
              abilityBonus = wisMod;
            }

            return (
              <StatCard
                key={key}
                name={defense}
                type="defense"
                score={10} // Base value
                abilityBonus={abilityBonus}
                classBonus={classBonus}
                armorBonus={0}
                featBonus={0}
                miscBonus={racialDefenseBonus}
                modifier={abilityBonus} // You might want total here instead
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AbilitiesPanel;
