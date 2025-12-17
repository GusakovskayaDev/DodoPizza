import { Ingredient, Variants } from "@prisma/client";
import { PizzaSize, TypeDough } from "../constants/pizza";

/**
  * Функция для подсчета общей стоимости пиццы
  * 
  * @param typeDough - тип теста
  * @param pizzaSize - размер выбранной пиццы
  * @param variants - список вариаций
  * @param ingredients - список ингредиентов
  * @param selectedIngredients - выбранные ингредиенты
  * 
  * @returns number - общую стоимость
 */
export const calcTotalPizzaPrice = (
  typeDough: TypeDough, 
  pizzaSize: PizzaSize, 
  variants: Variants[], 
  ingredients: Ingredient[], 
  selectedIngredients: Set<number>
) => {
  const pizzaPrice = variants.find((variant) => variant.typeDough === typeDough && variant.size === pizzaSize)?.price || 0;
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return pizzaPrice + totalIngredientsPrice;
}