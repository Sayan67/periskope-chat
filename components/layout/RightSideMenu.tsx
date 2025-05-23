import Image from "next/image";
import React from "react";
import { Separator } from "../ui/separator";
import { rightMenubarItems } from "@/constants/menubarItems";
import { IoSparkles } from "react-icons/io5";
import { TbLayoutSidebarRightCollapseFilled, TbStarsFilled } from "react-icons/tb";

function RightSideMenu() {
  return (
    <div className="w-fit min-w-[60px] h-[calc(100vh-60px)] bg-white border-l border-gray-200 flex flex-col items-center py-2 px-1">
      <div className="flex flex-col items-center justify-between w-full h-full">
        <div className="flex flex-col items-center justify-center gap-1 w-[70%]">
          {rightMenubarItems.map((item, index) => (
            <React.Fragment key={item.name}>
              <div
                key={item.name}
                className={`flex flex-col items-center justify-center w-full  hover:bg-gray-200 rounded-md cursor-pointer p-2 ${
                  item.name === "Chat" && "bg-gray-200"
                } relative`}
              >
                <item.icon
                  size={20}
                  className={`${
                    item.name === "Chat" ? "text-green-600" : "text-gray-400"
                  } `}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RightSideMenu;
