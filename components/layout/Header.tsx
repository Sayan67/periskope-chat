"use client";
import React from "react";
import { MdHelpOutline, MdOutlineBrowserUpdated } from "react-icons/md";
import { Button } from "../ui/button";
import { LuLogs } from "react-icons/lu";
import { Sparkle, Sparkles } from "lucide-react";
import { TbRefreshDot } from "react-icons/tb";
import { Combobox } from "../Header/ComboBox";
import { BsChatDotsFill } from "react-icons/bs";
import { IoMdNotificationsOff } from "react-icons/io";

function Header() {
  return (
    <div className="w-full h-[60px] bg-white border-b border-gray-200 flex items-center justify-bewteen px-4 gap-4">
      <div className="flex items-center gap-2">
        <BsChatDotsFill className="text-gray-500" size={20} />
        <p className="font-semibold text-gray-500">Chats</p>
      </div>
      <div className="flex items-center justify-end gap-4 w-full h-full">
        {/* Refresh */}
        <Button className="drop-shadow px-4 h-8" variant={"outline"}>
          <TbRefreshDot className="text-lg" size={30} /> Refresh
        </Button>
        {/* Help */}
        <Button className="drop-shadow px-4 h-8" variant={"outline"}>
          <MdHelpOutline className="text-lg" size={30} /> Help
        </Button>

        <Combobox />

        {/* Update */}
        <Button className="drop-shadow px-4 h-8" variant={"outline"}>
          <MdOutlineBrowserUpdated className="text-lg" size={30} />
        </Button>
        <Button className="drop-shadow px-4 h-8" variant={"outline"}>
          <IoMdNotificationsOff className="text-lg" size={30} />
        </Button>
        {/* Logs */}
        <Button className="drop-shadow px-4 h-8" variant={"outline"}>
          <Sparkles className="text-yellow-400 fill-yellow-400" size={30} />
          <LuLogs className="text-lg" size={30} />
        </Button>
      </div>
    </div>
  );
}

export default Header;
