import { Ingredient, Variants } from "@prisma/client";
import { calcTotalPizzaPrice } from "./calc-total-pizza-price";
import { mapTypeDough, PizzaSize, TypeDough } from "../constants/pizza";

export const getPizzaDetails = ( 
  typeDough: TypeDough, 
  pizzaSize: PizzaSize, 
  variants: Variants[], 
  ingredients: Ingredient[], 
  selectedIngredients: Set<number>
) => { 
  const totalPrice = calcTotalPizzaPrice(typeDough, pizzaSize, variants, ingredients, selectedIngredients
  );
   const textDetails = `${pizzaSize} см, ${mapTypeDough[typeDough]} тесто`;

  return { totalPrice, textDetails };
}