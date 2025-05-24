import { useState, useEffect, useCallback } from "react";
import { fetchChatList, fetchParticipantsForChats } from "@/services/chat-list";
import { Chat, ChatParticipantsMap } from "@/types";
import { useAuth } from "@/components/Proveiders/AuthProvider";
import { useAtom } from "jotai";
import { loadingAtom } from "@/store/loading";
import { useRouter } from "next/navigation";

export default function useChatData() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [participants, setParticipants] = useState<ChatParticipantsMap>({});
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  const fetchData = useCallback(async () => {
    try {
      setLoading({ ...loading, chatList: true, chatParticipants: true });
      setError(null);

      // Fetch chat list
      const chatData = await fetchChatList();
      setChats(chatData);

      // Fetch participants for all chats in one call
      if (chatData.length > 0) {
        const chatIds = chatData.map((chat) => chat.id);
        const participantData = await fetchParticipantsForChats(chatIds);
        setParticipants(participantData);
      }
    } catch (err) {
      console.error("Error fetching chat data:", err);
      setError(
        err instanceof Error ? err : new Error("Unknown error occurred")
      );
    } finally {
      setLoading({ ...loading, chatList: false, chatParticipants: false });
    }
  }, []);

  // Fetch data when the user changes or on initial mount
  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, fetchData, router]);

  // Function to refresh data manually
  const refreshData = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    chats,
    participants,
    loading,
    error,
    refreshData,
  };
}
