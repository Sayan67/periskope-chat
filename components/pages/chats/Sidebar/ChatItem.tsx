import { selectedChatAtom } from "@/store/selectedChat";
import { Chat } from "@/types";
import { formatMessageDate } from "@/utils/general";
import { useAtom } from "jotai";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi";

type ChatItemProps = {
  chat: {
    id: string;
    name: string;
    lastMessage: string;
    time: string;
  };
  style: React.CSSProperties;
};

export function ChatItem({
  chat,
  style,
}: {
  chat: Chat | undefined;
  style: React.CSSProperties;
}) {
  const [selectedChat, setSelectedChat] = useAtom(selectedChatAtom);
  return (
    <div
      onClick={() =>
        setSelectedChat({
          name: chat?.name ?? "",
          id: chat?.id ?? "",
          lastMessage: chat?.messages?.[0]?.content ?? "",
          time: formatMessageDate(chat?.messages?.[0]?.created_at ?? ""),
        })
      }
      style={style}
      className="flex items-start px-3 pt-3 pb-2 border-b border-gray-100 cursor-pointer hover:bg-gray-100"
    >
      <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 flex items-center justify-center">
        {!chat?.is_group && chat?.chat_participants[0].user.avatar_url ? (
          <Image
            src={chat?.chat_participants?.[0]?.user.avatar_url}
            alt="Avatar"
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        ) : chat?.is_group ? (
          <HiUsers className=" text-gray-500" size={20} />
        ) : (
          <FaUser className=" text-gray-500" size={20} />
        )}
      </div>
      <div className="flex-1">
        <div className="font-medium">
          {chat?.name
            ? chat.name
            : chat?.chat_participants[0].user.name ?? "Unknown"}
        </div>
        <div className="text-sm text-gray-500 truncate">
          {chat?.messages?.[0]?.content.length &&
          chat?.messages?.[0]?.content.length <= 20
            ? chat?.messages?.[0]?.content
            : chat?.messages?.[0]?.content.slice(0, 20) + "..."}
        </div>
        <div className="bg-gray-100 rounded-sm px-2 py-1 text-xs text-gray-500 w-fit">
          {chat?.chat_participants?.[0]?.user.phone_number}
          {chat?.chat_participants.length &&
            chat?.chat_participants.length - 1 > 0 && (
              <span className="text-gray-400">
                {` +${chat?.chat_participants.length - 1} more`}
              </span>
            )}
        </div>
      </div>
      <div className="text-xs text-gray-400 flex flex-col items-end justify-between h-full">
        <div className="flex space-x-2 mb-1">
          {chat?.labels.map((label, i) => (
            <p
              className={`${
                i === 0
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
              } rounded-sm px-2 py-1 text-xs text-gray-500 w-fit`}
              key={i}
            >
              {label.name}
            </p>
          ))}
          {chat?.labels.length &&
            chat?.labels.length > 2 &&
            chat?.labels.length - 2 > 0 && (
              <p
                className={`bg-gray-100 text-gray-500 rounded-sm px-2 py-1 text-xs w-fit`}
                key={2}
              >
                {`+${chat?.labels.length - 2}`}
              </p>
            )}
        </div>
        {chat?.is_group && (
          <div className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center">
            {chat?.messages[0]?.sender?.avatar_url ? (
              <Image
                src={chat?.chat_participants?.[0]?.user.avatar_url as string}
                alt="Avatar"
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
            ) : (
              <FaUser className=" text-gray-500" size={20} />
            )}
          </div>
        )}

        <p>{formatMessageDate(chat?.messages?.[0]?.created_at ?? "")}</p>
      </div>
    </div>
  );
}
