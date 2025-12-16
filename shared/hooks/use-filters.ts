import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import { useState } from "react";

interface PriceProps {
  priceFrom?: number,
  priceTo?: number,
}

interface QueryFilters extends PriceProps {
  typeDough: string;
  sizes: string;
  ingredients: string;
}

export interface Filters {
  sizes: Set<string>;
  selectedIngredients: Set<string>;
  typeDough: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setSizes: (value: string) => void;
  setTypeDough: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

  // Фильтр ингредиентов
  const getIngredients = searchParams.get('ingredients')?.split(',');
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(new Set<string>(getIngredients));

  // Фильтр размера
  const hasSizes = searchParams.has('sizes');
  const getSizes = searchParams.get('sizes')?.split(',');
  const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>(hasSizes ? getSizes : []));

  // Фильтр типа теста
  const hasTypeDough = searchParams.has('typeDough');
  const getTypeDough = searchParams.get('typeDough')?.split(',')
  const [typeDough, { toggle: toggleTypeDough }] = useSet(new Set<string>( hasTypeDough ? getTypeDough : []));

  // Фильтр стоимости
  const getPriceFrom = searchParams.get('priceFrom');
  const getPriceTo = searchParams.get('priceTo');
  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: Number(getPriceFrom) || undefined,
    priceTo: Number(getPriceTo) || undefined,
  });

  const updatePrices = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    sizes, 
    typeDough, 
    prices, 
    selectedIngredients,
    setPrices: updatePrices,
    setSizes: toggleSizes,
    setTypeDough: toggleTypeDough,
    setSelectedIngredients: toggleIngredients,
  }
}