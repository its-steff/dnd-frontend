"use client";

import { useEffect, useState } from "react";
import styles from "./SkillsPanel.module.scss";
import { SkillsPanelProps } from "./SkillsPanelProps.types";
import { SKILLS, SkillName } from "@/DummyData/skills";

const SkillsPanel: React.FC<SkillsPanelProps> = ({
  title,
  abilities,
  skills,
  setSkills,
  selectedClass,
}) => {
  useEffect(() => {
    if (!selectedClass) return;

    setSkills((prev) => {
      const next = { ...prev };

      // reset all trained flags
      (Object.keys(next) as SkillName[]).forEach((skill) => {
        next[skill] = {
          ...next[skill],
          trained: false,
        };
      });

      // apply class trained skill
      if (
        selectedClass.trained_skill &&
        selectedClass.trained_skill in SKILLS
      ) {
        const skill = selectedClass.trained_skill as SkillName;
        next[skill] = {
          ...next[skill],
          trained: true,
        };
      }

      return next;
    });
  }, [selectedClass]);

  const classTrainedSkill = selectedClass?.trained_skill as
    | SkillName
    | undefined;

  const maxExtraTrained = selectedClass?.trained_skill_choice_amount ?? 0;

  const extraTrainedCount = (Object.keys(skills) as SkillName[]).filter(
    (skill) => skills[skill].trained && skill !== classTrainedSkill,
  ).length;

  return (
    <div className={styles.skillsPanel}>
      <h2>{title}</h2>
      {selectedClass ? (
        <p>
          As a {selectedClass.name} you are trained in {selectedClass.trained_skill} and can pick {selectedClass.trained_skill_choice_amount} aditional skills
        </p>
      ) : (
        <p>Select a class</p>
      )}
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
          {(Object.keys(SKILLS) as SkillName[]).map((skill) => {
            const trainedBonus = skills[skill].trained ? 5 : 0;
            const miscBonus = skills[skill].miscBonus;

            const totalBonus = trainedBonus + miscBonus;

            const isClassSkill = classTrainedSkill === skill;

            const disableCheckbox =
              !skills[skill].trained &&
              !isClassSkill &&
              extraTrainedCount >= maxExtraTrained;

            return (
              <tr key={skill}>
                <td className={styles.bonusCell}>{totalBonus}</td>
                <td className={styles.nameCell}>{skill}</td>
                <td className={styles.abilityCell}>0</td>
                <td className={styles.trainedCell}>
                  <input
                    type="checkbox"
                    checked={skills[skill].trained}
                    disabled={isClassSkill || disableCheckbox}
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SkillsPanel;
