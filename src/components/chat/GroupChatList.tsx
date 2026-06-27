import { useChatStore } from "@/stores/useChatStore";
import { CONVERSATION_TYPE } from "@/types/chat";
import GroupChatCard from "./GroupChatCard";
const GroupChatList = () => {
  const { conversations } = useChatStore();
  if (!conversations) return;
  const directConversations = conversations.filter(
    (conv) => conv.type === CONVERSATION_TYPE.GROUP,
  );
  return (
    <div className="flex-1 overflow-y-auto p-2 space-y-2">
      {directConversations.map((convo) => (
        <GroupChatCard key={convo._id} convo={convo} />
      ))}
    </div>
  );
};

export default GroupChatList;
