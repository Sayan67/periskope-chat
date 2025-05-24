import { Chat, ChatParticipantsMap } from "@/types";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const currentUserId = (await supabase.auth.getUser()).data.user?.id;

// Fetching chat list for the current user
export async function fetchChatList() {
  try {
    const response = await supabase
      .from("chat_participants")
      .select(
        `
      chat:chats (
        id,
        name,
        is_group,
        created_at,
        labels (
          name
        ),
        messages (
          content,
          created_at,
          sender:users (
            name,
            phone_number,
            avatar_url
          )
        ),
        chat_participants (
          user:users (
            name,
            phone_number,
            avatar_url
          )
        )
      )
    `
      )
      .eq("user_id", currentUserId);
    console.log(response);

    if (response.error) {
      throw new Error(response.error.message);
    }
    return response.data.map((item) => {
      const chatData = item.chat;
      return chatData as unknown as Chat;
    });
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
  console.log("chat participants : ",data);

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
