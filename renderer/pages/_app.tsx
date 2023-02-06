import { AppProps } from "next/app";
import Link from "next/link";
import React from "react";
import Layout from "../src/components/Layout";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      {/* <Link href="/home">홈</Link> */}
      <Component {...pageProps} />
      <style jsx>{`
        body {
          margin: 0;
          padding: 0;
          border: 0;
          font-size: 100%;
          font: inherit;
          vertical-align: baseline;
        }
      `}</style>
    </Layout>
  );
}
