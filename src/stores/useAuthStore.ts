import { authService } from "@/services/authService";
import type { AuthState } from "@/types/store";
import { toast } from "sonner";
import { create } from "zustand";

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,

  clearState: () => {
    set({
      accessToken: null,
      user: null,
      loading: false,
    });
  },

  signUp: async (email, name, password) => {
    try {
      set({ loading: true });

      await authService.signUp(email, name, password);
      toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
    } catch (error) {
      console.log("Error signing up:", error);
      toast.error("Đăng ký thất bại. Vui lòng thử lại.");
    } finally {
      set({ loading: false });
    }
  },

  signIn: async (email, password) => {
    try {
      set({ loading: true });

      const accessToken = await authService.signIn(email, password);
      get().setAccessToken(accessToken);

      await get().fetchMe();

      toast.success("Đăng nhập thành công!");
    } catch (error) {
      console.log("Error signing in:", error);
      toast.error("Đăng nhập thất bại. Vui lòng thử lại.");
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    try {
      get().clearState();
      await authService.signOut();
      toast.success("Đăng xuất thành công!");
    } catch (error) {
      console.log("Error signing out:", error);
      toast.error("Đăng xuất thất bại. Vui lòng thử lại.");
    }
  },

  fetchMe: async () => {
    try {
      set({ loading: true });
      const user = await authService.fetchMe();
      set({ user: user });
    } catch (error) {
      console.log("Error fetching user:", error);
      set({ user: null, accessToken: null });
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      set({ loading: false });
    }
  },

  refresh: async () => {
    try {
      set({ loading: true });
      const { user, fetchMe, setAccessToken } = get();
      const accessToken = await authService.refresh();
      setAccessToken(accessToken);
      if (!user) {
        await fetchMe();
      }
    } catch (error) {
      console.log("Error refreshing token:", error);
      get().clearState();
      toast.error("Phiên đã hết hạn. Vui lòng đăng nhập lại.");
    } finally {
      set({ loading: false });
    }
  },

  setAccessToken: (accessToken: string) => {
    set({ accessToken });
  }
}));
