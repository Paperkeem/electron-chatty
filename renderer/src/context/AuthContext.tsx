import { createContext, useContext, useEffect, useState } from "react";
import { onAuth } from "../apis/firebase";

type TAuth = {
  user?: any;
  uid: string;
  name: string;
  email: string;
};

const AuthContext = createContext<TAuth | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    onAuth(setUser);
    console.log("auth 함수 콜링 중");
  }, []);

  return (
    <AuthContext.Provider
      value={{ uid: user?.uid, name: user?.displayName, email: user?.email }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  return useContext(AuthContext);
};
