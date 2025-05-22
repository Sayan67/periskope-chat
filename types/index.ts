export type User = {
  id: string
  display_name: string
  phone: string | null
  avatar_url: string | null
  last_seen: string
  created_at: string
}

export type Chat = {
  id: string
  is_group: boolean
  name: string | null
  created_by: string
  created_at: string
}

export type ChatParticipant = {
  id: string
  chat_id: string
  user_id: string
  joined_at: string
}

export type Message = {
  id: string
  chat_id: string
  sender_id: string
  content: string
  created_at: string
}

