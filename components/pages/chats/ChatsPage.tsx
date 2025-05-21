import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ChatList from "@/components/pages/chats/ChatList";
import { cookies } from "next/headers";

export default async function ChatsPage() {
  const supabase = createClient(cookies());

  // Check if user is authenticated (redundant with middleware but adds security
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  // Fetch the user's chats
  const { data: chats, error } = await supabase
    .from("chats")
    .select("*")
    .eq("user_id", session.user.id)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error fetching chats:", error);
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Your Conversations</h1>
      <ChatList chats={chats || []} />
    </div>
  );
}
