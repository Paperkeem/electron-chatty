import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getGroupMsg, setChatMsgInGroup } from "../apis/firebase";
import { IChat } from "./useChat";

export default function useGroup(idx: string) {
  const queryClicent = useQueryClient();

  const groupQuery = useQuery<IChat[] | unknown[]>(
    ["group", idx],
    () => getGroupMsg(idx),
    { refetchInterval: 1000 }
  );

  const sendGroupQuery = useMutation(
    ({ idx, uid, name, message }) => {
      setChatMsgInGroup(idx, uid, name, message);
    },
    {
      onSuccess: () => {
        queryClicent.invalidateQueries(["group", idx]);
      },
    }
  );

  return { groupQuery, sendGroupQuery };
}
