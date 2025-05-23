import { fetchChatList } from "@/services/chat-list";
import { chatListAtom } from "@/store/chatList";
import { useAtom } from "jotai";
import React, { useEffect } from "react";

function ChatList() {
  const [chatLIst, setChatList] = useAtom(chatListAtom);
  useEffect(() => {
    fetchChatList()
  },[])
  return <div>ChatList</div>;
}

export default ChatList;
