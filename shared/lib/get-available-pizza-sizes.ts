import { Variants } from "@prisma/client";
import { pizzaSizes, TypeDough } from "../constants/pizza";
import { Variant } from "../components/shared/group-variants";

export const getAvailablePizzaSize = (typeDough: TypeDough, variants: Variants[]): Variant[] => {
  const filteredPizzasByType = variants.filter((variant) => variant.typeDough === typeDough);
  const availablePizzaSizes = pizzaSizes.map((variant) => ({
    name: variant.name,
    value: variant.value,
    disabled: !filteredPizzasByType.some((pizza) => Number(pizza.size) === Number(variant.value)),
  }));

  return availablePizzaSizes;
}