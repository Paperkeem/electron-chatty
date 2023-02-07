import { createContext, useContext, useEffect, useState } from "react";
import { onAuth } from "../apis/firebase";

type TAuth = {
  user: any;
};

const AuthContext = createContext<TAuth | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    onAuth(setUser);
    console.log("auth 함수 부르는 중");
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  return useContext(AuthContext);
};
