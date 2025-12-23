

import { Cart, CartItem, Ingredient, Product, Variants } from "@prisma/client";

export type CartItemDTO = CartItem & {
  variant: Variants & {
    product: Product,
  }
  ingredients: Ingredient[],
}

export interface CartDTO extends Cart {
  items: CartItemDTO[],
}