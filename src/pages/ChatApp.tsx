import Logout from "@/components/auth/logout";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "sonner";

const ChatApp = () => {
  const user = useAuthStore((state) => state.user);

  const handleOnclick = async () => {
    try {
      await api.get("/v1/auth/test", { withCredentials: true });
      toast.success("API test thành công!");
    } catch (error) {
      toast.error("API test thất bại. Vui lòng thử lại.");
      console.error("API test error:", error);
    }
  };

  return (
    <div>
      ChatApp
      <div>User: {user?.name}</div>
      <Logout />
      <Button onClick={handleOnclick}>Test API</Button>
    </div>
  );
};

export default ChatApp;
