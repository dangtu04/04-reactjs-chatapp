export const CONVERSATION_TYPE = {
  DIRECT: "DIRECT",
  GROUP: "GROUP",
} as const;

export type ConversationType =
  (typeof CONVERSATION_TYPE)[keyof typeof CONVERSATION_TYPE];

export interface Participant {
    _id: string;
    name: string;
    avatarUrl?: string | null;
    joinedAt: string;
}

export interface SeenUser {
    _id: string;
    name?: string;
    avatarUrl?: string | null;
}

export interface Group {
    name: string;
    createdBy: string;
}

export interface LastMessage {
    _id: string;
    content: string;
    createdAt: string;
    sender: { // CHECK
        _id: string;
        name: string;
        avatarUrl?: string | null;
    };
}

export interface Conversation {
    _id: string;
    type: ConversationType;
    group: Group;
    participants: Participant[];
    lastMessageAt: string;
    seenBy: SeenUser[];
    lastMessage: LastMessage | null;
    unreadCounts: Record<string, number>; // key = userId, value = unread count
    createdAt: string;
    updatedAt: string;
}

export interface Message {
    _id: string;
    conversationId: string;
    senderId: string;
    content: string | null;
    imgUrl?: string | null;
    updatedAt?: string | null;
    createdAt: string;
    isOwn?: boolean;
}
