'use client'

import { Title } from "./title";
import { Button } from "../ui";
import { PizzaImage } from "./pizza-image";
import { cn } from "@/shared/lib/utils";
import { doughTypes, PizzaSize, TypeDough } from "@/shared/constants/pizza";
import { Ingredient, Variants } from "@prisma/client";
import { IngredientItem } from "./ingredient-item";
import { getPizzaDetails } from "@/shared/lib";
import { usePizzaOptions } from "@/shared/hooks";
import { GroupVariants } from "./group-variants";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  variants: Variants[];
  onSubmit: (variantId: number, ingredients: number[]) => void;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({ 
  imageUrl,
  name,
  ingredients,
  variants,
  onSubmit,
  className, 
}) => {
  
const { 
  pizzaSize, 
  typeDough, 
  selectedIngredients, 
  availableSizes, 
  setPizzaSize, 
  currentVariantId, 
  setTypeDough, 
  addIngredient
} = usePizzaOptions(variants);

const { totalPrice, textDetails } = getPizzaDetails(
  typeDough, 
  pizzaSize, 
  variants, 
  ingredients, 
  selectedIngredients
);

const handleClickAdd = () => {
  if(currentVariantId){
    onSubmit(currentVariantId, Array.from(selectedIngredients));
  }
};

  return (
    <div className={cn('flex flex-1', className)}>

      <PizzaImage imageUrl={imageUrl} size={pizzaSize} />

      <div className="w-[490px] bg-[#FCFCFC] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1"/>

        <p className="text-gray-400">{textDetails}</p>

        <div className="flex flex-col gap-2 mt-5">
          <GroupVariants 
            items={availableSizes}
            value={String(pizzaSize)} 
            onClick={value => setPizzaSize(Number(value) as PizzaSize)}
          />
          
          <GroupVariants 
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

        <Button onClick={handleClickAdd} className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice} р
        </Button>
      </div>
    </div>
  )
}