"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import styles from "./RegistrationForm.module.scss";
import { RegistrationFormProps } from "./RegistrationForm.types";

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  mode,
  setLoggedIn,
}) => {
  // const [loggedIn, setLoggedIn] = useState(false);

  const { login } = useAuth();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const endpoint =
    mode === "register"
      ? "http://localhost:4000/auth/register"
      : "http://localhost:4000/auth/login";

  const body =
    mode === "register"
      ? { username: userName, email: userEmail, password }
      : { username: userName, password };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("you hit submit!");
    setError(null);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Registration or Login failed");
        return;
      }

      login({
        id: data.id,
        username: data.username,
        email: data.email,
      });
      setLoggedIn(true);

      // window.location.href = "/character-builder";
    } catch (err) {
      console.error(err);
      setError("Network error");
    }
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
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      {mode === "register" && (
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
