import { AiFillHome } from "react-icons/ai";
import { BsChatDotsFill, BsGraphUp, BsListNested } from "react-icons/bs";
import { FaListUl } from "react-icons/fa6";
import { FiEdit3 } from "react-icons/fi";
import { HiMegaphone } from "react-icons/hi2";
import { IoTicket } from "react-icons/io5";
import { LuLogs, LuRefreshCw } from "react-icons/lu";
import { MdAlternateEmail, MdChecklist } from "react-icons/md";
import {
  RiContactsBookFill,
  RiFolderImageFill,
  RiListSettingsLine,
  RiSettings5Fill,
} from "react-icons/ri";
import { SiHubspot } from "react-icons/si";
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbListDetails,
} from "react-icons/tb";
import { TiFlowMerge } from "react-icons/ti";

export const leftMenubarItems = [
  {
    name: "Home",
    icon: AiFillHome,
  },
  {
    name: "Chat",
    icon: BsChatDotsFill,
  },
  {
    name: "Ticket",
    icon: IoTicket,
  },
  {
    name: "analytics",
    icon: BsGraphUp,
  },
  {
    name: "logs",
    icon: FaListUl,
  },
  {
    name: "announcements",
    icon: HiMegaphone,
  },
  {
    name: "merge",
    icon: TiFlowMerge,
  },
  {
    name: "contacts",
    icon: RiContactsBookFill,
  },
  {
    name: "images",
    icon: RiFolderImageFill,
  },
  {
    name: "checklist",
    icon: MdChecklist,
  },
  {
    name: "Settings",
    icon: RiSettings5Fill,
  },
];

export const rightMenubarItems = [
  {
    name: "Collapse",
    icon: TbLayoutSidebarLeftCollapseFilled,
  },
  {
    name: "Refresh",
    icon: LuRefreshCw,
  },
  {
    name: "Edit",
    icon: FiEdit3,
  },
  {
    name: "List",
    icon: BsListNested,
  },
  {
    name: "Details",
    icon: TbListDetails,
  },
  {
    name: "Hubspot",
    icon: SiHubspot,
  },
  {
    name: "Email",
    icon: MdAlternateEmail,
  },
  {
    name: "Images",
    icon: RiFolderImageFill,
  },
  {
    name: "List Setting",
    icon: RiListSettingsLine,
  },
];
