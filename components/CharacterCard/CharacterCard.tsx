import { CharacterCardProps } from "./CharacterCard.types";
import styles from "./CharacterCard.module.scss";

const CharacterCard: React.FC<CharacterCardProps> = ({
  class_name,
  name,
  species,
}) => {
  return (
    <div className={styles.characterCard}>
      <h2>{name}</h2>
      <div className={styles.characterCard__labelContainer}>
        <span>{species}</span>
        <span>{class_name}</span>
      </div>
      <div className={styles.characterCard__buttonsContainer}>
        <button>See More</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default CharacterCard;
