"use client";

import { useState } from "react";
import styles from "./RegistrationForm.module.scss";
import { RegistrationFormProps } from "./RegistrationForm.types";

const RegistrationForm: React.FC<RegistrationFormProps> = ({ mode }) => {
  // const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("you hit submit!");
    setError(null);

    try {
      const res = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: userName,
          email: userEmail,
          password,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Registration failed");
        return;
      }

      window.location.href = "/character-builder";
    } catch (err) {
      console.error(err);
      setError("Network error");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("you are trying to login");
  };

  return (
    <form className={styles.registrationForm} onSubmit={handleSubmit}>
      <label>
        Type a username
        <input
          type="text"
          name="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </label>
      <label>
        Make a password
        <input
          type="text"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      {mode !== "login" && (
        <label>
          Write your email
          <input
            type="email"
            name="userEmail"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </label>
      )}

      <button type="submit">
        {mode === "register" ? "Register 🏹" : "Login ⚔️"}
      </button>
    </form>
  );
};

export default RegistrationForm;
