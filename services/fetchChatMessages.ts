import { Message, Messages } from "@/types";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function fetchChatMessages(chatId: string) {
  const { data, error } = await supabase.rpc("get_chat_messages", {
    chat_uuid: chatId,
  });
  console.log("Fetched chat messages:", data);

  if (error) {
    console.error("Error fetching chat messages:", error);
    return [];
  }
  return !data
    ? []
    : data?.map(
        (item: {
          id: string;
          content: string;
          chat_id: string;
          created_at: string;
          sender: {
            id: string;
            name: string;
            phone_number: string;
            avatar_url: string;
          };
        }) =>
          ({
            content: item.content,
            created_at: item.created_at,
            sender: {
              id: item.sender.id,
              name: item.sender.name || null,
              phone_number: item.sender.phone_number || null,
              avatar_url: item.sender.avatar_url || null,
            },
          } as Message)
      );
}
