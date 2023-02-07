import React, { PropsWithChildren } from "react";
import Seo from "./Seo";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Seo />
      {children}
    </>
  );
}
