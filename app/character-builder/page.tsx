"use client";

import { useEffect, useState } from "react";
import styles from "./CharacterBuilder.module.scss";
import BasicsForm from "@/components/BasicsForm/BasicsForm";
import TabsMenu from "@/components/TabsMenu/TabsMenu";
import TabsPanel from "@/components/TabsPanel/TabsPanel";
import speciesData from "@/DummyData/species.json";
import classesData from "@/DummyData/classes.json";
import { Species } from "@/types/species";
import { Classes } from "@/types/classes";
import { CharacterSkills } from "@/types/skills";
import { SKILLS } from "@/DummyData/skills";

export default function CharacterBuilderPage() {
  const tabs = ["Abilities", "Combat Stats", "Skills", "Powers", "Inventory"];
  const [activeTab, setActiveTab] = useState("Abilities");
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);
  const [selectedClass, setSelectedClass] = useState<Classes | null>(null);
  const [characterName, setCharacterName] = useState("");

  const abilitiesList = [
    "Strength",
    "Dexterity",
    "Constitution",
    "Intelligence",
    "Wisdom",
    "Charisma",
  ];

  const defensesList = ["AC", "Fortitude", "Reflex", "Willpower"];

  const [assignedScores, setAssignedScores] = useState<Record<string, number>>({
    Strength: 0,
    Dexterity: 0,
    Constitution: 0,
    Intelligence: 0,
    Wisdom: 0,
    Charisma: 0,
  });

  const [assignedDefenses, setAssignedDefense] = useState<
    Record<string, number>
  >({
    AC: 0,
    Fortitude: 0,
    Reflex: 0,
    Willpower: 0,
  });

  const handleSaveCharacter = async () => {
    console.log("you hit character save");
    const res = await fetch("http://localhost:4000/characters/save", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: characterName || "Unnamed",
        species: selectedSpecies?.name || null,
        className: selectedClass?.name || null,
        abilities: assignedScores,
        defenses: assignedDefenses,
      }),
    });

    const data = await res.json();
    console.log(data, "from character save button");
  };

  const initialSkills: CharacterSkills = Object.keys(SKILLS).reduce(
    (acc, skill) => {
      acc[skill as keyof CharacterSkills] = {
        trained: false,
        miscBonus: 0,
      };
      return acc;
    },
    {} as CharacterSkills
  );

  const [skills, setSkills] = useState<CharacterSkills>(initialSkills);

  return (
    <main className={styles.characterBuilderPage}>
      <h1>Character Builder</h1>
      <section>
        <div className={styles.characterBuilderPage__header}>
          <h2>Basic Information</h2>
          <button onClick={handleSaveCharacter}>Save my character</button>
        </div>

        <BasicsForm
          speciesList={speciesData}
          selectedSpecies={selectedSpecies}
          setSelectedSpecies={setSelectedSpecies}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
          classesList={classesData}
          characterName={characterName}
          setCharacterName={setCharacterName}
        />
      </section>

      <TabsMenu tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <TabsPanel
        activeTab={activeTab}
        abilitiesList={abilitiesList}
        selectedClass={selectedClass}
        selectedSpecies={selectedSpecies}
        assignedScores={assignedScores}
        setAssignedScores={setAssignedScores}
        defensesList={defensesList}
        setAssignedDefenses={setAssignedDefense}
        classDefenseBonus={selectedClass?.defense_bonus || undefined}
        skills={skills}
        setSkills={setSkills}
      />
    </main>
  );
}
