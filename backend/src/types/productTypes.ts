import Product from "../models/Product";

export interface ProductResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
  userId: number;
}

export const productToResponse = (product: Product): ProductResponse => ({
  id: product.id,
  name: product.name,
  description: product.description,
  price: product.price,
  image: product.image,
  userId: product.userId,
});
