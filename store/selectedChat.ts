import { ChatCardProps } from '@/components/pages/chats/Sidebar/Sidebar'
import { Chat } from '@/types'
import {atom} from 'jotai'

export const selectedChatAtom = atom<Chat | null>(null)