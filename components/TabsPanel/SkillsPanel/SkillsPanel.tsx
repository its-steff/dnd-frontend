"use client";

import styles from "./SkillsPanel.module.scss";
import { SkillsPanelProps } from "./SkillsPanelProps.types";
import { SKILLS, SkillName } from "@/DummyData/skills";

const SkillsPanel: React.FC<SkillsPanelProps> = ({
  title,
  abilities,
  skills,
  setSkills,
}) => {
  return (
    <div className={styles.skillsPanel}>
      <h2>{title}</h2>
      <table className={styles.skillsPanel__table}>
        <thead>
          <tr>
            <th scope="col">Bonus</th>
            <th scope="col">Skill</th>
            <th scope="col">Ability Modifier + 1/2 Level</th>
            <th scope="col">Trained</th>
            <th scope="col">Misc</th>
          </tr>
        </thead>
        <tbody>
          {(Object.keys(SKILLS) as SkillName[]).map((skill) => (
            <tr key={skill}>
              <td className={styles.bonusCell}>0</td>
              <td className={styles.nameCell}>{skill}</td>
              <td className={styles.abilityCell}>0</td>
              <td className={styles.trainedCell}>
                <input
                  type="checkbox"
                  checked={skills[skill].trained}
                  onChange={(e) =>
                    setSkills((prev) => ({
                      ...prev,
                      [skill]: {
                        ...prev[skill],
                        trained: e.target.checked,
                      },
                    }))
                  }
                />
              </td>
              <td className={styles.miscBonusCell}>
                <input
                  type="number"
                  value={skills[skill].miscBonus}
                  onChange={(e) =>
                    setSkills((prev) => ({
                      ...prev,
                      [skill]: {
                        ...prev[skill],
                        miscBonus: Number(e.target.value),
                      },
                    }))
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkillsPanel;
