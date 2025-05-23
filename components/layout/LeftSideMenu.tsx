"use client";
import Image from "next/image";
import React from "react";
import { Separator } from "../ui/separator";
import { leftMenubarItems } from "@/constants/menubarItems";
import { PowerIcon, PowerOff, Sparkles } from "lucide-react";
import { IoSparkles } from "react-icons/io5";
import {
  TbLayoutSidebarRightCollapseFilled,
  TbStarsFilled,
} from "react-icons/tb";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "../Proveiders/AuthProvider";

function LeftSideMenu() {
  const { signOut, isLoading } = useAuth();
  return (
    <div className="w-fit min-w-[60px] h-screen bg-white border-r-[1px] flex flex-col items-center py-4 px-1">
      <div className="w-fit relative">
        <Image
          src={"/whatsapp.png"}
          alt="Logo"
          width={25}
          height={25}
          className="object-contain mb-4"
        />
        <div className="absolute bottom-2 -right-2 px-1 bg-white rounded-full border border-white text-xs text-green-600 font-semibold">
          12
        </div>
      </div>
      <div className="flex flex-col items-center justify-between w-full h-full">
        <div className="flex flex-col items-center justify-center gap-1 w-[70%]">
          {leftMenubarItems.map((item, index) => (
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
                        size={20}
                        className={`${
                          item.name === "Chat"
                            ? "text-green-600"
                            : "text-gray-500"
                        } `}
                      />
                      {index === 6 && (
                        <IoSparkles
                          className="text-yellow-400 fill-yellow-400 absolute -right-1 top-0"
                          size={15}
                        />
                      )}
                    </div>
                    {(index === 0 ||
                      index === 3 ||
                      index === 6 ||
                      index === 8) && <Separator className="w-full" />}
                  </React.Fragment>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>
                    {item.name.charAt(0).toUpperCase() +
                      item.name.slice(1).toLowerCase()}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center gap-1 pt-4 w-[70%]">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger disabled={isLoading}>
                <div
                  onClick={signOut}
                  className={`flex flex-col items-center justify-center w-full rounded-md cursor-pointer p-2 hover:bg-red-200 relative`}
                >
                  <PowerIcon className="text-red-400" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Log out</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div
            className={`flex flex-col items-center justify-center w-full  hover:bg-gray-200 rounded-md cursor-pointer p-2 relative`}
          >
            <TbStarsFilled className="text-gray-500" />
          </div>
          <div
            className={`flex flex-col items-center justify-center w-full  hover:bg-gray-200 rounded-md cursor-pointer p-2 relative`}
          >
            <TbLayoutSidebarRightCollapseFilled className="text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSideMenu;
