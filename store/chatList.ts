import { Chat, ChatParticipantsMap, Participant } from "@/types";
import { atom } from "jotai";

export const chatListAtom = atom<Chat[]>();

export const chatParticipantsAtom = atom<ChatParticipantsMap | null>(null);
