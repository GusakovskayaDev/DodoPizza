import { prisma } from "./prisma";

export interface GetSearchParams {
  query?: string,
  sortBy?: string,
  sizes?: string,
  typeDough?: string,
  ingredients?: string,
  priceFrom?: string,
  priceTo?: string,
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (params: GetSearchParams) => {
  const sizes = params.sizes?.split(',').map(Number);
  const typeDough = params.typeDough?.split(',').map(Number);
  const ingredientsId = params.ingredients?.split(',').map(Number);

  const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

  const categories = await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: 'desc',
        },
        where: {
          ingredients: ingredientsId ? {
            some: {
              id: {
                in: ingredientsId,
              }
            }
          } : undefined,
          variant: {
            some: {
              size: {
                in: sizes,
              },
              typeDough: {
                in: typeDough,
              },
              price: {
                gte: minPrice,
                lte: maxPrice,
              }
            },
          },
        },
        include: {
          ingredients: true,
          variant: {
            where: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
            orderBy: {
              price: 'asc',
            },
          },
        },
      },
    },
  });

  return categories;
}