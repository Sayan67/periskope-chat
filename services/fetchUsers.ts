import { createClient } from "@/utils/supabase/client";

export async function searchUsers(query: string) {
  if (!query || query === "" || query.trim() === "") return [];
  const supabase = createClient();
  try {
    const user = await supabase.auth.getUser();
    const currentUserId = user?.data?.user?.id;
    if (!user?.data?.user?.id) {
      console.error("User not authenticated");
      return [];
    }

    const { data, error } = await supabase
      .from("users")
      .select("id, name, email, phone_number, avatar_url")
      .or(`email.ilike.%${query}%,phone_number.ilike.%${query}%`)
      .neq("id", user.data.user.id); // only match email

    if (error) {
      console.error("Search error:", error);
      return [];
    }
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
