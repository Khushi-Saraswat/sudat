  interface Slide{
     id: number,
    image: string,
    buttonLink: string
}
  interface User {
  id: string;
  name: string;
  phone: string;
  type: "buyer" | "seller"| null;
}