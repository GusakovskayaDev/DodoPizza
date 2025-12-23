import { mapTypeDough, PizzaSize, TypeDough } from "../constants/pizza";
import { CartStateItem } from "./get-cart-details";

export const getCartItemDetails = (
  ingredients: CartStateItem['ingredients'],
  typeDough: TypeDough,
  pizzaSize: PizzaSize,
): string => {
  const details = [];

  if(pizzaSize && typeDough){
    const typeName = mapTypeDough[typeDough];
    details.push(`${typeName} ${pizzaSize} см`)
  }

  if(ingredients){
    details.push(...ingredients.map((ingredients) => ingredients.name))
  }

  return details.join(', ');
}