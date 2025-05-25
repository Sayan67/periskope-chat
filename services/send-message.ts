import { createClient } from "@/utils/supabase/client";

export async function sendMessage(chatId: string, content: string) {
  const supabase = createClient();
  const user = (await supabase.auth.getUser()).data.user;

  if (!user) throw new Error("User not authenticated");

  const { error, data } = await supabase.from("messages").insert([
    {
      chat_id: chatId,
      sender_id: user.id,
      content,
    },
  ]);

  if (error) throw new Error(error.message);
  return data;
}
