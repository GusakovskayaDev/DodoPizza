import { Ingredient } from "@prisma/client";
import { mapTypeDough, PizzaSize, TypeDough } from "../constants/pizza";

export const getCartItemDetails = (
  typeDough: TypeDough,
  pizzaSize: PizzaSize,
  ingredients: Ingredient[]
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