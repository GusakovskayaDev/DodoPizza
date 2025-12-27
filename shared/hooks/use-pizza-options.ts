import { useEffect, useState } from "react";
import { PizzaSize, TypeDough } from "../constants/pizza";
import { useSet } from "react-use";
import { getAvailablePizzaSize } from "../lib";
import { Variants } from "@prisma/client";
import { Variant } from "../components/shared/group-variants";

interface ReturnProps {
  pizzaSize: PizzaSize,
  typeDough: TypeDough,
  selectedIngredients: Set<number>,
  availableSizes: Variant[],
  currentVariantId?: number;
  setPizzaSize: (pizzaSize: PizzaSize) => void,
  setTypeDough: (typeDough: TypeDough) => void,
  addIngredient: (id: number) => void,
}

export const usePizzaOptions = (variants: Variants[]): ReturnProps => {
  const [pizzaSize, setPizzaSize] = useState<PizzaSize>(20);
  const [typeDough, setTypeDough] = useState<TypeDough>(1);
  const [selectedIngredients, { toggle: addIngredient}] = useSet(new Set<number>([]));

  const availableSizes = getAvailablePizzaSize(typeDough, variants);

  const currentVariantId = variants.find((variant) => variant.typeDough === typeDough && variant.size === pizzaSize)?.id;

  useEffect(() => {
    const isAvailableSize = availableSizes?.find((item) => Number(item.value) === pizzaSize && !item.disabled);
    const availableSize = availableSizes?.find((item) => !item.disabled);

    if(!isAvailableSize && availableSize){
      setPizzaSize(Number(availableSize.value) as PizzaSize);
    }
  }, [typeDough]);

  return {
    pizzaSize,
    typeDough,
    selectedIngredients,
    availableSizes,
    currentVariantId,
    setPizzaSize,
    setTypeDough,
    addIngredient,
  }
}