import api from "@/lib/axios";


import { useUserStore } from "@/stores/user.store";
import { useMutation, useQuery } from "@tanstack/react-query";

// ------------------------
// Define User type
// Make sure this matches the API response exactly
// ------------------------

interface User {
  id: string;
  name: string;
  phone: string;
  type: "buyer" | "seller"| null;
}
// ------------------------
// Store state interface
// ------------------------
interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  setAuth: (user: User, token: string) => void;
}

// ------------------------
// Payload types
// ------------------------
interface SendOtpPayload {
  phone: string;
}

interface VerifyOtpPayload {
  phone: string;
  otp: string;
  userType: "seller" | "customer";
}

// ------------------------
// GET current user
// ------------------------
export const useCurrentUser = () => {
  // Explicitly type 's' to UserState
  const setUser = useUserStore((s: UserState) => s.setUser);

  return useQuery<User>({
    queryKey: ["current-user"],
    queryFn: async () => {
      const res = await api.get<User>("/user");
      // Ensure the API response matches the User type
      setUser(res.data);
      return res.data;
    },
  });
};

// ------------------------
// Send OTP
// ------------------------
export const useSendOtp = () => {
  return useMutation({
    mutationFn: async (data: SendOtpPayload) => {
      const res = await api.post("/user/login", data);
      return res.data;
    },
  });
};

// ------------------------
// Verify OTP → return token + user
// ------------------------
export const useVerifyOtp = () => {
  const setAuth = useUserStore((s: UserState) => s.setAuth);

  return useMutation({
    mutationFn: async (data: VerifyOtpPayload) => {
      const res = await api.post<{ token: string; user: User }>(
        "/user/verify-otp",
        data
      );
      return res.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      setAuth(data.user, data.token);
    },
  });
};
