"use client";

import { useEffect, useState } from "react";

import styles from "./BasicsForm.module.scss";
import { BasicsFormProps } from "./BasicsForm.types";

const BasicsForm: React.FC<BasicsFormProps> = ({
  speciesList,
  selectedSpecies,
  setSelectedSpecies,
  selectedClass,
  setSelectedClass,
  classesList,
}) => {
  return (
    <form className={styles.basicsForm}>
      <div className={styles.formRow}>
        <label>
          Charater Name
          <input type="text" name="characterName" />
        </label>
        <label>
          Player Name
          <input type="text" name="playerName" />
        </label>
        <label>
          Experience
          <input type="text" name="characterExperience" />
        </label>
      </div>
      <div className={styles.formRow}>
        <label>
          Character Level
          <input type="number" name="charater level" placeholder="1" />
        </label>
        <label>
          Species
          <select
            name="species"
            value={selectedSpecies?.name ?? ""}
            onChange={(e) => {
              const species =
                speciesList.find((s) => s.name === e.target.value) || null;
              setSelectedSpecies(species);
            }}
          >
            <option value="">Select a race</option>
            {speciesList.map((species) => (
              <option key={species.name} value={species.name}>
                {species.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Class
          <select
            name="classes"
            value={selectedClass?.name ?? ""}
            onChange={(e) => {
              const charClass =
                classesList.find((c) => c.name === e.target.value) || null;
              setSelectedClass(charClass);
            }}
          >
            <option value="">Select a class</option>
            {classesList.map((charClass) => (
              <option key={charClass.name} value={charClass.name}>
                {charClass.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className={styles.formRow}>
        <label>
          Character Deity
          <input type="text" name="character-deity" />
        </label>
        <label>
          Character Alignment
          <select>
            <option value="">Select an alignment</option>
            <option value="Lawful Good" key="lawfulgood">
              Lawful Good
            </option>
            <option value="Neutral Good" key="neutralgood">
              Neutral Good
            </option>
            <option value="Chaotic Good" key="chaoticgood">
              Chaotic Good
            </option>
            <option value="Lawful Neutral" key="lawfulneutral">
              Lawful Neutral
            </option>
            <option value="True Neutral" key="trueneutral">
              True Neutral
            </option>
            <option value="Chaotic Neutral" key="Chaotic Neutral">
              Chaotic Neutral
            </option>
            <option value="Lawful Evil" key="lawfulevil">
              Lawful Evil
            </option>
            <option value="Neutral Evil" key="neutralevil">
              Neutral Evil
            </option>
            <option value="Chaotic Evil" key="chaoticevil">
              Chaotic Evil
            </option>
          </select>
        </label>
        <label>
          Character Background
          <select>
            <option value="">Select a background</option>
            <option value="soldier" key="soldier">
              Soldier
            </option>
            <option value="acoloyte" key="acoloyte">
              Acoloyte
            </option>
            <option value="criminal" key="criminal">
              Criminal
            </option>
          </select>
        </label>
      </div>
    </form>
  );
};

export default BasicsForm;
