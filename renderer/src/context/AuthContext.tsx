import { createContext, useContext, useEffect, useState } from "react";
import { onAuth } from "../apis/firebase";

type TAuth = {
  username: string;
  setUsername: (newUsername: string) => void;
};
const AuthContext = createContext<TAuth | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    onAuth();
    console.log("auth 함수 부르는 중");
  }, []);

  return (
    <AuthContext.Provider value={{ username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
