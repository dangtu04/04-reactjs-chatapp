import { useAuthStore } from "@/stores/useAuthStore";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";

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

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default Logout;
