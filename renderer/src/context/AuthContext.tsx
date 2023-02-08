import { createContext, useContext, useEffect, useState } from "react";
import { onAuth } from "../apis/firebase";

type TAuth = {
  user: any;
  uid: string;
  name: string;
};

const AuthContext = createContext<TAuth | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    onAuth(setUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, uid: user?.uid, name: user?.name }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  return useContext(AuthContext);
};
