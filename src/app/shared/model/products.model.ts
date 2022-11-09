export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  count?: number;
}
export interface IResponse {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}
export interface IShipping {
  type: string;
  price: number;
}
