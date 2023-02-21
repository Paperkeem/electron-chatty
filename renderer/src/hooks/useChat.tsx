import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { getChatMsg, setChatMsg } from "../apis/firebase";

export interface IChat {
  message: string;
  name: string;
  uid: string;
}

export default function useChat(roomId: string) {
  const queryClicent = useQueryClient();

  const chatQuery = useQuery<IChat[] | unknown[]>(
    ["chat", roomId],
    () => getChatMsg(roomId),
    { refetchInterval: 1000 }
  );

  const sendMsgQuery = useMutation(
    ({ roomId, uid, name, message }) => {
      setChatMsg(roomId, uid, name, message);
    },
    {
      onSuccess: () => {
        queryClicent.invalidateQueries(["chat", roomId]);
      },
    }
  );

  return { chatQuery, sendMsgQuery };
}
