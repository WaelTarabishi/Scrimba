export interface ProductInterface {
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

export interface OrderInterface {
  order: {
    id: string;
    userId: string;
    amount: number;
    isPaid: boolean;
    status: "fullfilled" | "shipped" | "awaiting_shipment";
    shippingAddressId: string | null;
    billingAddressId: string | null;
    billingAddress: {
      id: string;
      name: string;
      street: string | null;
      city: string | null;
      postalCode: string | null;
      country: string;
      state: string | null;
      phoneNumber: string | null;
    };

    shippingAddress: {
      id: string;
      name: string;
      street: string | null;
      city: string | null;
      postalCode: string | null;
      country: string;
      state: string | null;
      phoneNumber: string | null;
    };
    createdAt: Date;
    updatedAt: Date;
  } | null;
}
