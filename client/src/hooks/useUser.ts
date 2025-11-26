import api from "@/lib/axios";
import { useUserStore } from "@/stores/user.store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";


// import { useUserStore } from "@/stores/user.store";
import { Address, User } from "@/type";
// import { useMutation, useQuery } from "@tanstack/react-query";

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

export interface AddressResponse {
  addresses: Address[];
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
      setUser(data.user);
    },
  });
};

//used to edit profile 
export const useUpdateOrEditProfile = () =>{
   
    return useMutation({

       mutationFn:async(data:UserDetails) =>{

          const res=await api.put("/user/profile",data);
          return res.data;
       
        }
      
    });

}

// use to add address
export const addAddress = () =>{

     
    return useMutation({
 
      mutationFn:async(data:Address) =>{

       const res=await api.post("/user/address",data);
       return res.data;


      }
   
});}


//used to get all address
export const getAddress = () => {

    
 
 
  return useQuery<AddressResponse>({
    queryKey: ["Address"],
    queryFn: async () => {
      const res = await api.get("/user/address")
      
      console.log("Data------------>",res.data);
       return res.data ?? { addresses: [] };
      
    
    },
  });





};



// Verify OTP → return token + user
export const useLogout = () => {
  const setUser = useUserStore((s) => s.setUser);

  return useMutation({
    mutationFn: async () => {
      const res = await api.post("/user/logout");
      return res.data;
    },
    onSuccess: () => {  
      setUser(null);
      toast.success("Logout successful!");
    },
  });
};
