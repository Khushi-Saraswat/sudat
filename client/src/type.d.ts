  interface Slide{
     id: number,
    image: string,
    buttonLink: string
}
interface User {
  _id: string;
  fullName: string | null;
  email: string | null;
  phone: string;
  address: string[];          // array of address IDs or strings
  isAdmin: boolean;
  userType: "seller" | "customer";
  createdAt: string;          // ISO date string
  updatedAt: string;          // ISO date string
  __v: number;
}