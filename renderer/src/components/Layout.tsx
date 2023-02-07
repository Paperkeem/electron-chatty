import React, { PropsWithChildren } from "react";
import { AuthProvider } from "../context/AuthContext";
import Seo from "./Seo";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <AuthProvider>
        <Seo />
        {children}
      </AuthProvider>
    </>
  );
}
