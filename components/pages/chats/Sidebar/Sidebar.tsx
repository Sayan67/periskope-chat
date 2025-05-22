import { FiMoreVertical, FiMessageSquare, FiUsers, FiSearch } from 'react-icons/fi'
import { ChatItem } from './ChatItem'

import { Chat } from '@/types'

type SidebarProps = {
  chats: ChatCardProps[]
  onSelectChat: (chat: ChatCardProps) => void
}

export type ChatCardProps = {
  id: string
  name: string
  lastMessage: string
  time: string
}


export default function Sidebar({ chats = [], onSelectChat }: SidebarProps) {
  return (
    <div className="w-80 border-r border-gray-200 h-screen flex flex-col bg-white">
    </div>
  )
}
