import { PointBuyPanelProps } from "../PointBuyPanelProps.types";
import styles from "./PointBuyPanel.module.scss";

const PointBuyPanel: React.FC<PointBuyPanelProps> = ({
  abilities,
  assignedScores,
  onSelect,
  remainingPoints,
  // setRemainingPoints,
}) => {
  return (
    <div className={styles.pointBuyPanel}>
      <p>You have {remainingPoints}/22 points</p>
      <div className={styles.selectContainer}>
        {abilities.map((ability) => (
          <label key={ability}>
            <span>{ability}</span>

            <select
              value={assignedScores[ability]}
              onChange={(e) => onSelect(ability, Number(e.target.value))}
            >
              {Array.from({ length: 11 }, (_, i) => i + 8).map((score) => (
                <option key={score} value={score}>
                  {score}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PointBuyPanel;
