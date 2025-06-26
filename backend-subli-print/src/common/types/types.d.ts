import { Request, Response } from 'express';

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

export interface GqlContext {
  req: Request;
  res: Response;
}
