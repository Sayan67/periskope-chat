import { atom } from "jotai";

export const authPageStateAtom = atom<"login" | "signup">("login");
