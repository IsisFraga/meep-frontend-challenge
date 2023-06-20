import api from "../config";

export type rating = {
  rate: number
  count: number
}
export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: rating;
}

export async function getProducts() {
  return api.get("/products");
}