import { Chat } from "@/types"
import {atom} from "jotai"

export const chatListAtom = atom<Chat[]>()