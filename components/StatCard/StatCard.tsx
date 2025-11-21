import { StatCardProps } from "./StatCard.types";
import styles from "./StatCard.module.scss";

const StatCard: React.FC<StatCardProps> = ({
  racialBonus,
  abilityBonus = 0,
  classBonus,
  armorBonus,
  featBonus,
  miscBonus,
  modifier,
  name,
  score,
  type,
}) => {
  const getTotalScore = () => {
    if (type === "ability") {
      if (racialBonus) {
        return score + racialBonus;
      } else return score;
    } else if (type === "defense") {
      if (miscBonus) {
        return score + abilityBonus + miscBonus;
      } else return score + abilityBonus;
    }
  };

  return (
    <div className={styles.statCard}>
      <span className={styles.statTitle}>{name}</span>
      <div className={styles.statHighlight}>
        <span>Total Score:</span>
        <span className={styles.statNumber}>{getTotalScore()}</span>
      </div>
      <div className={styles.statHighlight}>
        <span>Modifier:</span>
        <span className={styles.statNumber}>{modifier}</span>
      </div>
      <div>
        <span>Base Score:</span>
        <span className={styles.statNumber}>{score}</span>
      </div>
      {type === "ability" ? (
        <div>
          <span>Racial Bonus:</span>
          <span className={styles.statNumber}>{racialBonus}</span>
        </div>
      ) : (
        <>
          <div>
            <span>Ability Bonus:</span>
            <span className={styles.statNumber}>{abilityBonus}</span>
          </div>
          <div>
            <span>Armor Bonus:</span>
            <span className={styles.statNumber}>{armorBonus}</span>
          </div>
          <div>
            <span>Class Bonus:</span>
            <span className={styles.statNumber}>{classBonus}</span>
          </div>
          <div>
            <span>Feat Bonus:</span>
            <span className={styles.statNumber}>{featBonus}</span>
          </div>
          <div>
            <span>Misc Bonus:</span>
            <span className={styles.statNumber}>{miscBonus}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default StatCard;
