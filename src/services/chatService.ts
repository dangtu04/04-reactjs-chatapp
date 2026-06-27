import api from "@/lib/axios";
import type { Conversation } from "@/types/chat";

export const chatService = {
 async fetchConversations(): Promise<Conversation[]> {
    const res = await api.get("/v1/conversation", { withCredentials: true });
    return res.data.data;
  }
};