import { Chat, ChatParticipantsMap } from "@/types";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const currentUserId = (await supabase.auth.getUser()).data.user?.id;

export type ChatParticipant = {
  chat_id: string;
  chat_name: string | null;
  is_group: boolean;
  chat_created_at: string;
  participant_id: string;
  participant_name: string;
  phone_number: string;
  avatar_url: string | null;
  last_message: string | null;
  last_message_time: string | null;
  sender_name: string | null;
};

// Fetching chat list for the current user
export async function fetchChatList(): Promise<Chat[]> {
  try {
    const response = await supabase.rpc(
      "get_user_chat_list_with_latest_message",
      {
        user_uuid: currentUserId,
      }
    );
    console.log(response);

    if (response.error) {
      throw new Error(response.error.message);
    }
    return response.data.map((item: any) => ({
      id: item.id,
      name: item.name,
      is_group: item.is_group,
      created_at: item.created_at,
      labels: item.labels || [],
      messages: item.messages || [],
      chat_participants: item.chat_participants.map((participant: any) => ({
        user: {
          id: participant.user.id,
          name: participant.user.name,
          phone_number: participant.user.phone_number,
          avatar_url: participant.user.avatar_url || null,
        },
      })),
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchParticipantsForChats(
  chatIds: string[]
): Promise<ChatParticipantsMap> {
  const { data, error } = await supabase
    .from("chat_participants")
    .select(
      `
        chat_id,
        user:users (
          id,
          name,
          phone_number,
          avatar_url
        )
      `
    )
    .in("chat_id", chatIds);
  console.log("chat participants : ", data);

  if (error) {
    throw new Error(error.message);
  }

  const participantsMap: ChatParticipantsMap = {};

  for (const entry of data) {
    if (!participantsMap[entry.chat_id]) {
      participantsMap[entry.chat_id] = [];
    }
    participantsMap[entry.chat_id].push({
      chat_id: entry.chat_id,
      user: Array.isArray(entry.user) ? entry.user[0] : entry.user,
    });
  }
  console.log(participantsMap);

  return participantsMap;
}

export async function fetchChatById(chatId: string) {
  const { data, error } = await supabase
    .from("chats")
    .select(
      `
      id,
      name,
      is_group,
      created_at,
      labels ( name ),
      chat_participants (
        user:users (
          id, name, phone_number, avatar_url
        )
      )
    `
    )
    .eq("id", chatId)
    .single();

  if (error) throw error;
  return data;
}

const example_res = {
  error: null,
  data: [
    {
      chat: {
        id: "aa3e8e33-d58d-4d8b-b54e-d94afbcc5343",
        name: "Friends Group",
        labels: [],
        is_group: true,
        messages: [
          {
            sender: {
              name: "Sayan1",
            },
            content: "Hii everyone, I am Sayan1",
            created_at: "2025-05-23T13:03:56.832109+00:00",
          },
          {
            sender: null,
            content: "Hii everyone, I am Sayan aot",
            created_at: "2025-05-23T13:04:33.072993+00:00",
          },
        ],
        created_at: "2025-05-23T13:00:30.918085+00:00",
        chat_participants: [
          {
            user: {
              phone_number: "9681251018",
            },
          },
        ],
      },
    },
    {
      chat: {
        id: "b3056a64-7ea4-44db-a96f-54d6b77a54ec",
        name: null,
        labels: [],
        is_group: false,
        messages: [
          {
            sender: {
              name: "Sayan1",
            },
            content: "Hii bro nice to meet you",
            created_at: "2025-05-23T13:05:29.532165+00:00",
          },
        ],
        created_at: "2025-05-23T13:00:47.857903+00:00",
        chat_participants: [
          {
            user: {
              phone_number: "9681251018",
            },
          },
        ],
      },
    },
  ],
  count: null,
  status: 200,
  statusText: "",
};
