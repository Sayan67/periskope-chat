import { createClient } from "@/utils/supabase/client";

export async function createOrGetOneToOneChat(targetUserId: string): Promise<
  | {
      id: string;
      error: null;
    }
  | { id: null; error: string }
> {
  const supabase = createClient();
  const currentUser = await supabase.auth.getUser();
  const userId = currentUser.data.user?.id;
  if (!userId || !targetUserId)
    return { id: null, error: "User ID or target user ID is missing" };

  // Step 1: Check if a 1:1 chat already exists
  const { data: existingChat } = await supabase.rpc(
    "get_existing_one_to_one_chat",
    {
      user1: userId,
      user2: targetUserId,
    }
  );

  if (existingChat && existingChat.length > 0) {
    return existingChat[0]; // Return the existing chat
  }

  // Step 2: Create new chat
  const { data: newChat, error: chatError } = await supabase
    .from("chats")
    .insert({ is_group: false })
    .select()
    .single();

  if (chatError) {
    console.error("Chat creation error:", chatError);
    return {
      id: null,
      error: chatError.message,
    };
  }

  const chatId = newChat.id;

  const { error: participantsError } = await supabase
    .from("chat_participants")
    .insert([
      { chat_id: chatId, user_id: userId },
      { chat_id: chatId, user_id: targetUserId },
    ]);

  if (participantsError) {
    console.error("Participants insert error:", participantsError);
    return {
      id: null,
      error: participantsError.message,
    };
  }

  return newChat;
}
