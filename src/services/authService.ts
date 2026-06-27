import api from "@/lib/axios";

export const authService = {
  signUp: async (email: string, name: string, password: string) => {
    const response = await api.post(
      "/v1/auth/register",
      {
        email,
        name,
        password,
      },
      { withCredentials: true },
    );
    return response.data;
  },
  signIn: async (email: string, password: string) => {
    const response = await api.post(
      "/v2/auth/login",
      {
        email,
        password,
      },
      { withCredentials: true },
    );
    return response.data.data.access_token;
  },

  signOut: async () => {
    return await api.post("/v1/auth/logout", {}, { withCredentials: true });
  },

  fetchMe: async () => {
    const user = await api.get("/v1/users/profile/me", { withCredentials: true });
    return user.data.data;
  },

  refresh: async () => {
    const response = await api.post("/v1/auth/refresh", {}, { withCredentials: true });
    return response.data.data.access_token;
  }
};
