import { atom } from "jotai";

type modalSatate = "createChat";

export const modalAtom = atom<modalSatate | "">("");
