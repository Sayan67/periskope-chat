import useChatData  from "@/hooks/useChatData";
import React, { useEffect } from "react";
import { useAuth } from "../Proveiders/AuthProvider";
import { useAtom, useSetAtom } from "jotai";
import { chatListAtom, chatParticipantsAtom } from "@/store/chatList";

function Layout({ children }: { children: React.ReactNode }) {
  const { chats, participants } = useChatData();
  const { user } = useAuth();
  const [, setChatParticipants] = useAtom(chatParticipantsAtom);
  const setChatLIst = useSetAtom(chatListAtom);

  useEffect(() => {
    if (user && chats.length > 0) {
      setChatParticipants(participants);
      setChatLIst(chats);
    }
  }, [chats, participants, user, setChatParticipants]);
  return children;
}

export default Layout;
