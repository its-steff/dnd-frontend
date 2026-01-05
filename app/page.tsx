"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import styles from "./page.module.scss";
import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";
import { CharacterSummary } from "@/types/character";
import CharacterCard from "@/components/CharacterCard/CharacterCard";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [mode, setMode] = useState<"register" | "login" | undefined>(undefined);
  const [characters, setCharacters] = useState<CharacterSummary[]>([]);

  const handleFormDisplay = (chosenMode: "register" | "login") => {
    return (
      <RegistrationForm
        loggedIn={loggedIn}
        mode={chosenMode}
        setLoggedIn={setLoggedIn}
      />
    );
  };

  const { user } = useAuth();

  useEffect(() => {
    if (!loggedIn) return;

    const fetchCharacters = async () => {
      console.log("trying to get characters");
      const res = await fetch("http://localhost:4000/characters", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setCharacters(data);
      }
    };
    fetchCharacters();
  }, [loggedIn]);

  return (
    <main className={styles.homePage}>
      <h1>Welcome to the D&D 4th Edition Character Builder</h1>
      <p>
        This is a character builder for 4th edition Dungeons & Dragons. Register
        an account to save your characters!
      </p>

      <div className={styles.homePage__content}>
        {loggedIn && user ? (
          <div>
            <p>{user.username}&apos;s Characters:</p>
            {characters.length === 0 ? (
              <p>You do not have any characters yet</p>
            ) : (
              <ul>
                {characters.map((char) => (
                  <li key={char.id}>
                    <CharacterCard
                    name={char.name}
                    class_name={char.class_name}
                    species={char.species}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div>
            {mode !== "register" && mode !== "login" && (
              <div className={styles.container}>
                <button onClick={() => setMode("login")}>Login</button>
                <button onClick={() => setMode("register")}>Sign Up</button>
              </div>
            )}

            {mode && handleFormDisplay(mode)}
          </div>
        )}
      </div>
    </main>
  );
}
