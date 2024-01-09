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

<<<<<<< HEAD
export interface ProductsPhotos {
  id: Generated<number | null>;
  productId: number | null;
  url: string | null;
}

=======
>>>>>>> b204ba936b99884518cb914c884327e7a3074d0d
export interface ProductsReviews {
  id: Generated<number>;
  productId: number;
  rating: number;
  content: string | null;
<<<<<<< HEAD
  username: string;
=======
>>>>>>> b204ba936b99884518cb914c884327e7a3074d0d
}

export interface DB {
  products: Products;
<<<<<<< HEAD
  productsPhotos: ProductsPhotos;
=======
>>>>>>> b204ba936b99884518cb914c884327e7a3074d0d
  productsReviews: ProductsReviews;
}
