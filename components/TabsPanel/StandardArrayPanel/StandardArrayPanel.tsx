import { StandardArrayPanelProps } from "./StandardArrayPanelProps.types";
import styles from "./StandardArrayPanel.module.scss";

const StandardArrayPanel: React.FC<StandardArrayPanelProps> = ({
  abilities,
  assignedScores,
  onSelect,
}) => {
  const standardArray = [16, 14, 13, 12, 11, 10];
  return (
    <div className={styles.standardArrayPanel}>
      <p>The standard array is 16, 14, 13, 12, 11 and 10.</p>
      <div className={styles.selectContainer}>
        {abilities.map((ability) => (
          <label key={ability}>
            <span>{ability}</span>

            <select
              value={assignedScores[ability] ?? ""}
              onChange={(e) => onSelect(ability, Number(e.target.value))}
            >
              <option value="">0</option>
              {standardArray.map((number) => (
                <option
                  key={number}
                  disabled={Object.values(assignedScores).includes(number)}
                >
                  {number}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
    </div>
  );
};

export default StandardArrayPanel;
