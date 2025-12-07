"use client";

import styles from "./CombatStatsPanel.module.scss";
import { CombatStatsPanelProps } from "./CombatStatsPanelProps.types";

const CombatStatsPanel: React.FC<CombatStatsPanelProps> = ({
  totalHP = 0,
  bloodied,
  surgeValue,
  surgesPerDay,
}) => {
  return (
    <div className={styles.combatStatsPanel}>
      <div className={styles.combatStatsPanel__container}>
        <h2>HIT POINTS</h2>
        <div className={styles.table}>
          <div>
            <span className={styles.title}>❤️ MAX HP </span>
            <span className={styles.amount}>{totalHP}</span>
          </div>
          <div>
            <span className={styles.title}>🩸 BLOODIED </span>
            <span className={styles.amount}>
              {bloodied !== undefined ? bloodied : "—"}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.combatStatsPanel__container}>
        <h2>HEALING SURGES</h2>
        <div className={styles.table}>
          <div>
            <span className={styles.title}>❤️‍🩹 SURGE VALUE</span>
            <span className={styles.amount}>{surgeValue}</span>
          </div>
          <div>
            <span className={styles.title}>💕 SURGES/DAY</span>
            <span className={styles.amount}>{surgesPerDay}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombatStatsPanel;
