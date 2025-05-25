import { createClient } from "@/utils/supabase/client";

export function listenToMessages(
  chatId: string,
  onNewMessage: (message: any) => void
) {
  const supabase = createClient();

  const channel = supabase
    .channel(`chat:${chatId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `chat_id=eq.${chatId}`,
      },
      async (payload) => {
        const enriched = await enrichMessage(payload.new);
        onNewMessage(enriched);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

async function enrichMessage(raw: any) {
  const supabase = createClient();
  const { data } = await supabase
    .from("users")
    .select("id, name, phone_number, avatar_url")
    .eq("id", raw.sender_id)
    .single();

  return {
    ...raw,
    sender: data,
  } as {
    id: string;
    chat_id: string;
    content: string;
    created_at: string;
    message_type: "text" | "image" | "video" | string; // Extend as needed
    sender_id: string;
    sender: {
      id: string;
      name: string;
      phone_number: string;
      avatar_url: string | null;
    };
  };
}
