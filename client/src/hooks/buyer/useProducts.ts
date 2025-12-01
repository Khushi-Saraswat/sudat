import api from "@/lib/axios";
import { useProductStore } from "@/stores/buyer/products.store";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGetProducts = () => {
  const setProducts = useProductStore((s) => s.setProducts);

  return useQuery<Product[]>({
    queryKey: ["product-store"],
    queryFn: async () => {
      const res = await api.get("/product")
      setProducts(res.data);
    // console.log("Data------------>",res.data);
      return res.data;
    },
  });
};
export const useGetMainProduct = (productId: string) => {
    const setMainProduct = useProductStore((s) => s.setMainProduct);
    const setVariants = useProductStore((s) => s.setVariants);

    return useQuery<MainProduct>({
        queryKey: ["main-product", productId],
        queryFn: async () => {
            const res = await api.get(`/product/${productId}`)
            setMainProduct(res.data.product);
            setVariants(res.data.variants)
            console.log("Data------------>", res.data.product);
            console.log("Data------------>", res.data.variants);
            return res.data.product;
        },
    });
};
