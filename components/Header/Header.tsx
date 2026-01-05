"use client"; // Because this will likely include navigation or buttons

import styles from "./Header.module.scss";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      {user ? (
        <span className={styles.messageContainer}>
          👋 Hello {user.username}{" "}
        </span>
      ) : null}
      <span className={styles.heading}>4E Character Builder</span>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/character-builder">Character Builder</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
