import { atom } from "jotai";

export const loadingAtom = atom<{
  chatList: boolean;
  chatParticipants: boolean;
  messages: boolean;
  user: boolean;
  auth: boolean;
  notifications: boolean;
  settings: boolean;
  profile: boolean;
  upload: boolean;
  download: boolean;
  [key: string]: boolean;
}>({
  chatList: false,
  chatParticipants: false,
  messages: false,
  user: false,
  auth: false,
  notifications: false,
  settings: false,
  profile: false,
  upload: false,
  download: false,
});
