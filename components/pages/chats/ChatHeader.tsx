import { useAuth } from "@/components/Proveiders/AuthProvider";
import { chatParticipantsAtom } from "@/store/chatList";
import { selectedChatAtom } from "@/store/selectedChat";
import { Participant } from "@/types";
import { useAtom } from "jotai";
import { SearchIcon, SparkleIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi2";
import { IoSparkles } from "react-icons/io5";

function ChatHeader() {
  const [selectedChat, setSelectedChat] = useAtom(selectedChatAtom);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [chatParticipants, setChatParticipants] = useAtom(chatParticipantsAtom);
  const [chatName, setChatName] = useState<string>("");
  useEffect(() => {
    const chatId = selectedChat?.id;
    setParticipants(chatParticipants?.[chatId as string] ?? []);
  }, [selectedChat, chatParticipants]);
  const maxAvatars = 5;
  const visibleAvatars = participants.slice(0, maxAvatars);
  const remainingCount = participants.length - maxAvatars;
  const { user } = useAuth();
  useEffect(() => {
    const uid = user?.id;
    const name = selectedChat?.is_group
      ? selectedChat.name
      : selectedChat?.chat_participants.filter((p) => p.user.id !== uid)[0]?.user
          .name;
    setChatName(name || "");
  }, [selectedChat, user?.id]);

  return (
    <div className="flex items-center justify-between p-4 bg-[#fff] border-b cursor-pointer h-[55px]">
      <div className="flex items-center space-x-3">
        {/* Group Avatar (placeholder icon) */}
        <div className="w-8 h-8 bg-gray-300 rounded-full mr-4 flex items-center justify-center">
          {selectedChat?.is_group ? (
            <HiUsers className=" text-gray-500" size={15} />
          ) : (
            <FaUser className=" text-gray-500" size={15} />
          )}
        </div>

        {/* Chat Name & Participant Names */}
        <div>
          <h1 className="font-bold text-gray-950 text-base">{chatName}</h1>
          {selectedChat?.is_group && (
            <div className="text-sm text-gray-500 truncate w-[400px]">
              You, {participants
                .filter((item) => item.user.id !== user?.id)
                .map((p) => p.user.name)
                .join(", ")}
            </div>
          )}
        </div>
      </div>

      {/* Avatars + Action Icons */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center -space-x-2">
          {visibleAvatars.map((user, i) =>
            user.user.avatar_url ? (
              <div className="relative w-fit h-fit" key={user.user.id}>
                <img
                  src={user.user.avatar_url || "/default-avatar.png"}
                  alt={user.user.name ?? ""}
                  style={{ zIndex: i }}
                  className="w-8 h-8 rounded-full object-cover border-2 border-white"
                />
                <div className="absolute bg-green-500 w-3 h-3 right-0 bottom-0 rounded-full border-2 border-white"></div>
              </div>
            ) : (
              <div
                key={user.user.id}
                style={{ zIndex: i }}
                className="relative w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center border-2 border-white "
              >
                <FaUser className=" text-gray-500" size={15} />
                <div className="absolute bg-green-500 w-3 h-3 right-0 bottom-0 rounded-full border-2 border-white"></div>
              </div>
            )
          )}
          {remainingCount > 0 && (
            <div className="w-6 h-6 rounded-full bg-gray-300 text-xs flex items-center justify-center -ml-2 border-2 border-white">
              +{remainingCount}
            </div>
          )}
        </div>
        {/* Icons */}
        <button className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-colors duration-200">
          <IoSparkles className="w-4 h-4 -rotate-90" />
        </button>
        <button className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-colors duration-200">
          <SearchIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;
