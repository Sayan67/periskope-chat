import { Button } from "@/components/ui/button";
import React from "react";
import { HiOutlineFolderDownload } from "react-icons/hi";
import { HiFolderArrowDown } from "react-icons/hi2";
import { IoFilter, IoSearch } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { SearchIcon } from "lucide-react";
import { useAtom } from "jotai";
import { filtersAtom } from "@/store/filters";

function SidebarHeader() {
  const [filterState, setFilterState] = useAtom(filtersAtom);
  function toggleFilterState(state: "search" | "filter") {
    if (filterState.state === state) {
      setFilterState({...filterState, state: ""});
    } else {
      setFilterState({...filterState, state});
    }
  }
  return (
    <div className="py-3 px-3 bg-[#FAFAFA] flex justify-between border-b text-xs font-semibold h-[55px]">
      <div className="flex items-center gap-2 text-green-700">
        <HiFolderArrowDown className="fill-green-700 stroke-white" size={20} />
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
          onClick={() => toggleFilterState("search")}
          className={`px-3 text-black h-8 text-xs ${
            filterState.state === "search" &&
            "text-green-700 bg-green-100 hover:bg-green-100"
          } hover:text-green-700 font-semibold`}
          variant={"outline"}
        >
          <IoSearch /> Search
        </Button>
        <Button
          onClick={() => toggleFilterState("filter")}
          className=" px-3 text-green-700 py-1 text-xs hover:text-green-700 relative font-semibold h-8"
          variant={"outline"}
        >
          <IoFilter /> Filtered
          <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
            <IoIosCloseCircle size={30} />
          </div>
        </Button>
      </div>
      
    </div>
  );
}

export default SidebarHeader;
