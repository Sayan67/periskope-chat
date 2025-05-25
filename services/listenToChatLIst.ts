import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export function listenForNewChats(
  userId: string,
  onNewChat: (chatId: string) => void
) {
  return supabase
    .channel("chat_participants-insert")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "chat_participants",
        filter: `user_id=eq.${userId}`,
      },
      async (payload) => {
        const chatId = payload.new.chat_id;
        onNewChat(chatId);
      }
    )
    .subscribe();
}
