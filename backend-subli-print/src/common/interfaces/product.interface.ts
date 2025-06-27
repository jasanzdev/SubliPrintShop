export interface Product {
  id?: string;
  name: string;
  description: string;
  category: string;
  stock: number;
  price: number;
  image: string;
  availableForSale: boolean;
}

export interface ProductVariant {
  parentId?: string;
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: number;
}
