"use client";

import { useEffect, useState } from "react";
import styles from "./CharacterBuilder.module.scss";
import BasicsForm from "@/components/BasicsForm/BasicsForm";
import TabsMenu from "@/components/TabsMenu/TabsMenu";
import TabsPanel from "@/components/TabsPanel/TabsPanel";
import speciesData from "@/DummyData/species.json";
import { Species } from "@/types/species";

export default function CharacterBuilderPage() {
  const tabs = ["Abilities", "Comabt Stats", "Skills", "Powers", "Inventory"];
  const [activeTab, setActiveTab] = useState("Abilities");
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);

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

  return (
    <main className={styles.characterBuilderPage}>
      <h1>Character Builder</h1>
      <section>
        <h2>Basic Information</h2>
        <BasicsForm
          speciesList={speciesData}
          selectedSpecies={selectedSpecies}
          setSelectedSpecies={setSelectedSpecies}
        />
      </section>

      <TabsMenu tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <TabsPanel
        activeTab={activeTab}
        abilitiesList={abilitiesList}
        selectedSpecies={selectedSpecies}
        assignedScores={assignedScores}
        setAssignedScores={setAssignedScores}
        defensesList={defensesList}
        setAssignedDefenses={setAssignedDefense}

      />
    </main>
  );
}
