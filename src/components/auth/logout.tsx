import { useAuthStore } from "@/stores/useAuthStore";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { LogOut } from "lucide-react";

const Logout = () => {
  const { signOut } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/sign-in");
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  return (
    <Button variant="completeGhost" onClick={handleLogout}>
      <LogOut />
      Logout
    </Button>
  );
};

export default Logout;
