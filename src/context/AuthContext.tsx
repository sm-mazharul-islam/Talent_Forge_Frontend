"use client";

import React, { createContext, useContext, useState } from "react";
import { User, AuthState, AuthContextType } from "../types/auth";
import { useRouter } from "next/navigation";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  // 🧠 State Lazy Initializer: Hydrates state BEFORE the first render cycle safely
  const [state, setState] = useState<AuthState>(() => {
    if (typeof window !== "undefined") {
      try {
        const storedToken = localStorage.getItem("tf_token");
        const storedUser = localStorage.getItem("tf_user");

        // 🛡️ Strict Guard: Ensure values exist and that storedUser isn't a corrupted string or literal "undefined"
        if (storedToken && storedUser && storedUser !== "undefined") {
          return {
            token: storedToken,
            user: JSON.parse(storedUser),
            isAuthenticated: true,
            isLoading: false,
          };
        }
      } catch (error) {
        console.error(
          "Failed to parse local authentication tokens cleanly:",
          error,
        );
        // 🧼 Self-healing step: Evict corrupted parameters so subsequent mount runs stay secure
        localStorage.removeItem("tf_token");
        localStorage.removeItem("tf_user");
      }
    }

    // Default fallback state if localStorage is empty or corrupted
    return {
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    };
  });

  const login = (token: string, user: User) => {
    localStorage.setItem("tf_token", token);
    localStorage.setItem("tf_user", JSON.stringify(user));
    setState({
      token,
      user,
      isAuthenticated: true,
      isLoading: false,
    });
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("tf_token");
    localStorage.removeItem("tf_user");
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom React hook for consuming authentication state seamlessly
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth must be executed within an AuthProvider component wrapper.",
    );
  }
  return context;
};
