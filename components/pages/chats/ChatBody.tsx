import { useAuth } from "@/components/Proveiders/AuthProvider";
import { fetchChatMessages } from "@/services/fetchChatMessages";
import { listenToMessages } from "@/services/listenToMessages";
import { selectedChatAtom } from "@/store/selectedChat";
import { Message, Messages } from "@/types";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { FaUser } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi2";

function ChatBody() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [selectedChat, setSelectedChat] = useAtom(selectedChatAtom);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchMessages() {
      const res = await fetchChatMessages(selectedChat?.id as string);
      console.log("Fetched messages:", res);
      setMessages(res as Message[]);
    }
    fetchMessages();
    const unsubscribe = listenToMessages(selectedChat?.id ?? "", (newMsg:{
        id: string;
        chat_id: string;
        content: string;
        created_at: string;
        message_type: "text" | "image" | "video" | string;
        sender_id: string;
        sender: {
          id: string;
          name: string;
          phone_number: string;
          avatar_url: string | null;
        };
      }) => {
        setMessages((prev) => [...prev, newMsg]);
    });
    return () => unsubscribe();
  }, [selectedChat?.id, user?.id]);
  return (
    <div className="w-full h-[calc(100dvh-215px)] overflow-y-auto p-4 space-y-4">
      {messages?.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-gray-500 text-sm">
            No messages found, Say Hi, to start the conversation!
          </div>
        </div>
      ) : (
        messages?.map((msg, idx) => {
          const isCurrentUser = msg.sender?.id === user?.id;

          return (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                isCurrentUser ? "justify-end" : "justify-start"
              }`}
            >
              {!isCurrentUser && msg.sender?.avatar_url ? (
                <img
                  src={msg.sender?.avatar_url || "/default-avatar.png"}
                  alt={
                    msg.sender?.name ??
                    msg.sender?.phone_number ??
                    "Unknow user"
                  }
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <FaUser className=" text-gray-500" size={15} />
                </div>
              )}

              <div className={`max-w-xs md:max-w-sm break-words text-left`}>
                <div
                  className={`px-4 py-2 rounded-md drop-shadow-sm text-sm space-y-2 min-w-[200px] max-w-[300px] w-full ${
                    isCurrentUser
                      ? "bg-[#dcf8c6] text-black rounded-tr-none"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none"
                  }`}
                >
                  {!isCurrentUser && (
                    <div className="text-xs font-medium text-green-700 dark:text-[#bfd9ab] flex justify-between gap-2">
                      <p className="font-semibold">{msg.sender?.name?.split(" ")[0]} {msg.sender?.name?.split(" ")[1].charAt(0).toUpperCase()}.</p>
                      {msg.sender?.name && (
                        <p className="text-gray-400">
                          {msg.sender?.phone_number}
                        </p>
                      )}
                    </div>
                  )}
                  {msg.content}
                  <div className="text-xs text-gray-400 mt-1 text-right w-full">
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default ChatBody;
