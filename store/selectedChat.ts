import { ChatCardProps } from '@/components/pages/chats/Sidebar/Sidebar'
import {atom} from 'jotai'

export const selectedChatAtom = atom<ChatCardProps | null>(null)