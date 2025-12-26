import { prisma } from "./prisma";

export const findOrCreateCart = async(token: string) => {
  let userCart = await prisma.cart.findFirst({
    where: {
      token,
    },
  });

  console.log('Нашлась ли корзинка??? ', userCart);

  if(!userCart){
    userCart = await prisma.cart.create({
      data:{
        token,
      },
    });
  }

  return userCart;
}