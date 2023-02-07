import { AppProps } from "next/app";
import React from "react";
import Layout from "../src/components/Layout";
import { AuthProvider } from "../src/context/AuthContext";
import "../src/styles/global.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
