import { useRouter } from "next/router";
import React from "react";
import SideBar from "../../src/components/Sidebar";

export default function chatRoom() {
  const router = useRouter();
  console.log(router);
  return <SideBar></SideBar>;
}
