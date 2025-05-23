import { Button } from "@/components/ui/button";
import React from "react";
import { HiOutlineFolderDownload } from "react-icons/hi";
import { HiFolderArrowDown } from "react-icons/hi2";
import { IoFilter, IoSearch } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";

function SidebarHeader() {
  return (
    <div className="py-3 px-2 bg-[#FAFAFA] flex justify-between border-b text-xs font-semibold">
      <div className="flex items-center gap-2 text-green-600">
        <HiFolderArrowDown className="fill-green-600 stroke-white" size={20} />
        <p className="">Custom filter</p>
        <Button
          className=" px-3 text-black py-1 text-xs h-8"
          variant={"outline"}
        >
          Save
        </Button>
      </div>
      <div className="flex gap-2 items-center">
        <Button
          className=" px-3 text-black h-8 text-xs"
          variant={"outline"}
        >
          <IoSearch /> Search
        </Button>
        <Button
          className=" px-3 text-green-600 py-1 text-xs hover:text-green-600 relative font-semibold h-8"
          variant={"outline"}
        >
          <IoFilter /> Filtered
          <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
            <IoIosCloseCircle size={30}/>
          </div>
        </Button>
      </div>
    </div>
  );
}

export default SidebarHeader;
