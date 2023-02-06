import React from "react";
import Head from "next/head";
import Link from "next/link";

function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-typescript)</title>
      </Head>
      <div>
        <p>
          ⚡ Electron + Next.js ⚡ -
          <br />
          과연 얼마나 할 수 있을까? 부담갖지 말고,
          <br />
          그래도 이번 주 동안
          <br />
          내가 할 수 있는 곳까지 해보자!
          <br />
          <Link href="/next">
            <a>Go to next page</a>
          </Link>
        </p>
        <img src="/images/logo.png" />
      </div>
    </React.Fragment>
  );
}

export default Home;
