import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CHAT_INPUT_ATTACHMENTS } from "@/constants/chatInput";
import { sendMessage } from "@/services/send-message";
import { selectedChatAtom } from "@/store/selectedChat";
import { useAtom } from "jotai";
import React from "react";
import { IoSparkles } from "react-icons/io5";
import { RiSendPlaneFill } from "react-icons/ri";

function ChatInput() {
  const [message, setMessage] = React.useState<string>("");
  const [selectedChat, setSelectedChat] = useAtom(selectedChatAtom);

  async function handleSendMessage() {
    if (message.trim() === "") return;

    console.log("Sending message:", message);
    const res = await sendMessage(selectedChat?.id as string, message);
    setMessage("");
  }
  return (
    <div className="w-full bg-white py-2 px-3 border-t border-gray-200 flex gap-2 flex-col h-[100px]">
      <div className="flex justify-between items-center w-full">
        <textarea
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message..."
          className="resize-none flex-1 p-2 focus:outline-none focus:ring-0 placeholder:text-gray-400 placeholder:font-medium text-sm text-gray-800"
        />
        <button className="rounded-full pr-3 pl-2 py-2.5 hover:bg-green-200 transition-colors duration-200 flex items-center justify-center" onClick={handleSendMessage}>
          <RiSendPlaneFill className="text-green-700 rotate-45" />
        </button>
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          {CHAT_INPUT_ATTACHMENTS.map((item, index) => (
            <TooltipProvider key={item.name + `${index}`}>
              <Tooltip>
                <TooltipTrigger>
                  <React.Fragment>
                    <div
                      className={`flex flex-col items-center justify-center w-full  hover:bg-gray-200 rounded-md cursor-pointer p-2 ${
                        item.name === "Chat" && "bg-gray-200"
                      } relative`}
                    >
                      <item.icon
                        size={15}
                        className={`${
                          item.name === "Chat"
                            ? "text-green-700"
                            : "text-gray-500"
                        } `}
                      />
                    </div>
                  </React.Fragment>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>
                    {item.name.charAt(0).toUpperCase() +
                      item.name.slice(1).toLowerCase()}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatInput;
