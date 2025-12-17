'use client'

import { Title } from "./title";
import { Button } from "../ui";
import { PizzaImage } from "./pizza-image";
import { cn } from "@/shared/lib/utils";
import { VariantsComponent } from "./variants-component";
import { doughTypes, mapTypeDough, PizzaSize, pizzaSizes, TypeDough } from "@/shared/constants/pizza";
import { useEffect, useState } from "react";
import { Ingredient, Variants } from "@prisma/client";
import { IngredientItem } from "./ingredient-item";
import { useSet } from "react-use";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  variants: Variants[];
  onClickAddCart?: () => void;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({ 
  imageUrl,
  name,
  ingredients,
  variants,
  onClickAddCart,
  className, 
}) => {
  const [pizzaSize, setPizzaSize] = useState<PizzaSize>(20);
  const [typeDough, setTypeDough] = useState<TypeDough>(1);
  const [selectedIngredients, { toggle: addIngredient}] = useSet(new Set<number>([]));

  const textDetails = `${pizzaSize} см, ${mapTypeDough[typeDough]} тесто`;
  
  const pizzaPrice = variants.find((variant) => variant.typeDough === typeDough && variant.size === pizzaSize)?.price || 0;
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  const totalPrice = pizzaPrice + totalIngredientsPrice;

  const availablePizzas = variants.filter((variant) => variant.typeDough === typeDough);
  const availablePizzaSizes = pizzaSizes.map((variant) => ({
    name: variant.name,
    value: variant.value,
    disabled: !availablePizzas.some((pizza) => Number(pizza.size) === Number(variant.value)),
  }));

  useEffect(() => {
    const isAvailableSize = availablePizzaSizes?.find((item) => Number(item.value) === pizzaSize && !item.disabled);
    const availableSize = availablePizzaSizes?.find((item) => !item.disabled);

    if(!isAvailableSize && availableSize){
      setPizzaSize(Number(availableSize.value) as PizzaSize);
    }
  }, [typeDough]);

  return (
    <div className={cn('flex flex-1', className)}>

      <PizzaImage imageUrl={imageUrl} size={pizzaSize} />

      <div className="w-[490px] bg-[#FCFCFC] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1"/>

        <p className="text-gray-400">{textDetails}</p>

        <div className="flex flex-col gap-2 mt-5">
          <VariantsComponent 
            items={availablePizzaSizes}
            value={String(pizzaSize)} 
            onClick={value => setPizzaSize(Number(value) as PizzaSize)}
          />
          
          <VariantsComponent 
            items={doughTypes}
            value={String(typeDough)} 
            onClick={value => setTypeDough(Number(value) as TypeDough)}
          />
        </div>

       <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-4">
        <div className="grid grid-cols-3 gap-3">
          {
            ingredients.map((ingredient) => (
              <IngredientItem 
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))
          }
        </div>
       </div>

        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice} р
        </Button>
      </div>
    </div>
  )
}