import api from "@/lib/axios";


import { useUserStore } from "@/stores/user.store";
import { User } from "@/type";
import { useMutation, useQuery } from "@tanstack/react-query";

// ------------------------
// Define User type
// Make sure this matches the API response exactly
// ------------------------
// ------------------------
// Store state interface
// ------------------------
interface UserState {
  user: User | null;
  setUser: (user: User) => void;
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

interface UserDetails{
   name:string;
   email:string
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
      const res = await api.get("/user")
      setUser(res.data.user);
      console.log("Data------------>",res.data);
      
      return res.data.user;
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
  const setUser = useUserStore((s) => s.setUser);

  return useMutation({
    mutationFn: async (data: VerifyOtpPayload) => {
      const res = await api.post<{ token: string; user: User }>(
        "/user/verify-otp",
        data
      );
      return res.data;
    },
    onSuccess: (data) => {
      console.log("logging from useVerifyOtp:" ,data);
      
      setUser(data.user);
    },
  });
};


export const useUpdateOrEditProfile = () =>{
   
    return useMutation({

       mutationFn:async(data:UserDetails) =>{

          const res=await api.put("/user/profile",data);
          return res.data;
       
        }
      
    });

}






