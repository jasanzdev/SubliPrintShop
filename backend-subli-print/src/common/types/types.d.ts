export type User = {
  id?: string;
  name: string;
  password: string;
  email: string;
  phone: string;
  role: string;
};

export type Product = {
  id?: string;
  name: string;
  description: string;
  category: string;
  stock: number;
  price: number;
  image: string;
  availableForSale: boolean;
};

export type ProductVariant = {
  parentId?: string;
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: number;
};

export interface BadRequestResponse {
  statusCode: number;
  error: string;
  message: string[] | string;
  timestamp: string;
}
