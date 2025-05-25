export type User = {
  id: string;
  email: string;
  name: string;
  phone_number: string | null;
  avatar_url: string | null;
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
      id: string;
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
  content: string;
  created_at: string;
  sender: {
    id: string;
    name: string | null;
    phone_number: string | null;
    avatar_url: string | null;
  } | null;
};

export type ChatPreview = {
  id: string;
  name: string | null;
  is_group: boolean;
  created_at: string;
  labels: string[];
  last_message: Message | null;
};

export type Participant = {
  chat_id: string;
  user: {
    id: string;
    name: string | null;
    phone_number: string | null;
    avatar_url: string | null;
  };
};

export type ChatParticipantsMap = Record<string, Participant[]>;


export type Messages={
  chat_id: string;
  messages: Message[];
}