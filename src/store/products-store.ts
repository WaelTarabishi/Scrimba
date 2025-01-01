import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Product {
  id: string;
  title: string | null;
  price: number | null;
  color: string | null;
  size: string | null;
  category: string | null;
  description: string | null;
  image: string | null;
  count?: number;
}
interface Products {
  id: string;
  title: string | null;
  price: number | null;
  color: string | null;
  size: string | null;
  category: string | null;
  description: string | null;
  image: string | null;
  count?: number;
}
[];
interface ProductStore {
  products: Product[];
  searchedProducts: Product[];
  name: string;
  size: string;
  color: string;
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  increaseCount: (productId: string) => void;
  decreaseCount: (productId: string) => void;
  addProducts: (products: Products) => void;
  setName: (name: string) => void;
  setSize: (size: string) => void;
  setColor: (color: string) => void;
  getTotalPrice: () => number;
  removeAllProducts: () => void;
}

const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: [],
      searchedProducts: [],

      color: "",
      size: "",
      name: "",
      setColor: (color: string) => {
        set({ color });
      },
      setSize: (size: string) => {
        set({ size });
      },
      setName: (name: string) => {
        set({ name });
      },
      addProducts: (products) => {
        {
          {
            set(() => ({
              searchedProducts: [products],
            }));
          }
        }
      },
      addProduct: (product) =>
        set((state) => {
          const existingProductIndex = state.products.findIndex(
            (p) => p.id === product.id
          );
          if (existingProductIndex !== -1) {
            const updatedProducts = [...state.products];

            updatedProducts[existingProductIndex].count! += 1;
            return { products: updatedProducts };
          } else {
            return {
              products: [
                ...state.products,
                { ...product, count: 1, loved: false },
              ],
            };
          }
        }),
      removeProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      increaseCount: (productId) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === productId ? { ...p, count: p.count! + 1 } : p
          ),
        })),

      decreaseCount: (productId) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === productId && p.count! > 1
              ? { ...p, count: p.count! - 1 }
              : p
          ),
        })),
      getTotalPrice: () => {
        const { products } = get();
        return products.reduce(
          (total, product) =>
            total +
            (product.price ? product.price : 0) *
              (product.count ? product.count : 0),
          0
        );
      },
      removeAllProducts: () => set({ products: [] }),
    }),
    {
      name: "product-storage-task-project",
      getStorage: () => localStorage,
    }
  )
);

export default useProductStore;
