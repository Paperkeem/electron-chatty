import { AppProps } from "next/app";
import React from "react";
import Layout from "../src/components/Layout";
import "../src/styles/global.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
