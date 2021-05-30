import { Stock } from "./stock";

export type Product = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  stock: Stock;
};
