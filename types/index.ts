export type User = {
  id: string;
  display_name: string;
  phone: string | null;
  avatar_url: string | null;
  last_seen: string;
  created_at: string;
};

export type Chat = {
  id: string;
  name: string | null;
  is_group: boolean;
  created_at: string;
  labels: {
    name: string;
  }[];
  messages: {
    content: string;
    created_at: string;
    sender: {
      avatar_url: string | null;
      phone_number: string;
      name: string;
    } | null;
  }[];
  chat_participants: {
    user: {
      name: string;
      avatar_url: string | null;
      phone_number: string;
    };
  }[];
};
export type ChatParticipant = {
  id: string;
  chat_id: string;
  user_id: string;
  joined_at: string;
};

export type Message = {
  id: string;
  chat_id: string;
  sender_id: string;
  content: string;
  created_at: string;
};
