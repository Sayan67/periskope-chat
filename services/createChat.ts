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

interface User {
  id: string;
}

interface CreateGroupChatOptions {
  name: string;
  members: User[];
  avatarFile?: File | null;
}

export async function createGroupChat({
  name,
  members,
  avatarFile,
}: CreateGroupChatOptions): Promise<
  { id: string; error: null } | { id: null; error: string }
> {
  const supabase = createClient();
  const { data: currentUser, error: userError } = await supabase.auth.getUser();
  const userId = currentUser?.user?.id;

  if (!userId) return { id: null, error: "User not authenticated" };
  if (!name.trim()) return { id: null, error: "Group name is required" };
  if (members.length < 2)
    return { id: null, error: "At least 2 members required" };

  let avatarUrl: string | null = null;

  if (avatarFile) {
    const fileExt = avatarFile.name.split(".").pop();
    const filePath = `groups/${crypto.randomUUID()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, avatarFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      return { id: null, error: "Failed to upload avatar" };
    }

    const { data: urlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    avatarUrl = urlData.publicUrl;
  }

  const { data: chat, error: chatError } = await supabase
    .from("chats")
    .insert({
      name,
      is_group: true,
      group_avatar_url: avatarUrl,
    })
    .select()
    .single();

  if (chatError) {
    return { id: null, error: chatError.message };
  }

  const participantIds = [...members.map((u) => u.id), userId];
  const { error: participantError } = await supabase
    .from("chat_participants")
    .insert(
      participantIds.map((uid) => ({
        chat_id: chat.id,
        user_id: uid,
      }))
    );

  if (participantError) {
    return { id: null, error: participantError.message };
  }

  return { id: chat.id, error: null };
}
