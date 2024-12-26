interface ProductInterface {
  products?: {
    id: string;
    title: string | null;
    price: number | null;
    color: string | null;
    size: string | null;
    category: string | null;
    description: string | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
  }[];
}
