import { BsEmojiSmile, BsPaperclip } from "react-icons/bs";
import { GoClock } from "react-icons/go";
import { HiOutlineSparkles } from "react-icons/hi";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { TbAlignBoxLeftMiddleFilled } from "react-icons/tb";
import { TiMicrophone } from "react-icons/ti";

export const CHAT_INPUT_ATTACHMENTS = [
  {
    name: "Attachments",
    icon: BsPaperclip,
  },
  {
    name: "Emojis",
    icon: BsEmojiSmile,
  },
  {
    name: "Time",
    icon: GoClock,
  },
  {
    name: "Back time",
    icon: RxCounterClockwiseClock,
  },
  {
    name : "AI Assistant",
    icon:HiOutlineSparkles
  },
  {
    name:"Documents",
    icon: TbAlignBoxLeftMiddleFilled
  },
  {
    name:"Audio",
    icon: TiMicrophone
  }
];
