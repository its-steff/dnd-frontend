"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import styles from "./page.module.scss";
import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [mode, setMode] = useState<"register" | "login" | undefined>(undefined);

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

  return (
    <main className={styles.homePage}>
      <h1>Welcome to the D&D 4th Edition Character Builder</h1>
      <p>
        This is a character builder for 4th edition Dungeons & Dragons. Register
        an account to save your characters!
      </p>

      <div className={styles.homePage__content}>
        {loggedIn && user ? (
          <p>Hey, {user.username}! Here are your characters</p>
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
