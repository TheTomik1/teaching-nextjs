import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Products {
  id: Generated<number>;
  name: string;
  description: string;
  price: number;
}

export interface ProductsPhotos {
<<<<<<< HEAD
  id: Generated<number | null>;
=======
  id: Generated<number>;
>>>>>>> f4f4cbf7f45952da4f1eab21efc6908f03b62473
  productId: number;
  url: string;
}

export interface ProductsReviews {
  id: Generated<number>;
  productId: number;
  rating: number;
  content: string | null;
  username: string;
}

export interface DB {
  products: Products;
  productsPhotos: ProductsPhotos;
  productsReviews: ProductsReviews;
}
