import React, { useEffect, useRef } from "react";

export default function useScroll(chat) {
  const chatWindowRef = useRef(null);

  useEffect(() => {
    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  }, [chat]);

  return { chatWindowRef };
}
