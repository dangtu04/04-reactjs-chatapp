import { useChatStore } from "@/stores/useChatStore";
import { CONVERSATION_TYPE } from "@/types/chat";
import DirectMessageCard from "@/components/chat/DirectMessageCard";
const DirectMessageList = () => {
  const { conversations } = useChatStore();
  if (!conversations) return;
  const directConversations = conversations.filter(
    (conv) => conv.type === CONVERSATION_TYPE.DIRECT,
  );
  return (
    <div className="flex-1 overflow-y-auto p-2 space-y-2">
      {directConversations.map((convo) => (
        <DirectMessageCard key={convo._id} convo={convo} />
      ))}
    </div>
  );
};

export default DirectMessageList;
