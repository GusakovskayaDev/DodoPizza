
import { Ingredient, Product, Variants } from "@prisma/client";

export type ProductWithRelations = Product & { variant: Variants[]; ingredients: Ingredient[] };