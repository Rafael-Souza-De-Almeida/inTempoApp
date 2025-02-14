"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface LoginContextType {
  isLoggedIn: boolean | null;
  setIsLoggedIn: (value: boolean | null) => void;
}

interface LoginContextProps {
  children: ReactNode;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider: React.FC<LoginContextProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useIsLoggedIn = () => {
  const context = useContext(LoginContext);

  if (!context) {
    throw new Error("O context deve ser usado com um provider");
  }

  return context;
};
