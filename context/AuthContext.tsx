"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type User = {
  id: number;
  username: string;
  email?: string;
} | null;

type AuthContextType = {
  user: User;
  loggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const login = (newUser: User) => {
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    loggedIn: Boolean(user),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth mut be used within an AuthProvider");
  return context;
}
