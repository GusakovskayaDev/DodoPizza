import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcrypt';
import { categories, ingredients, products } from './constants';

const prisma = new PrismaClient();

async function up(){
  await prisma.user.createMany({
    data: [
      {
        fullName: 'TestUser',
        email: 'testuser@gmail.com',
        password: hashSync('qwert', 10),
        verified: new Date(),
        role: 'USER',
      },
      {
        fullName: 'Admin',
        email: 'admin@yandex.ru',
        password: hashSync('qwert', 10),
        verified: new Date(),
        role: 'ADMIN',
      },
    ]
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
   data: {
        name: 'Пепперони фреш',
        imageUrl: 'pizzas/11EE7D61304FAF5A98A6958F2BB2D260.webp',
        categoryId: 1,
        ingredients: {
            connect: ingredients.slice(0, 5),
        }
      }
  });

  const pizza2 = await prisma.product.create({
   data: {
        name: 'Сырная',
        imageUrl: 'pizzas/0198bf40eb1171aabe90b1b3ce07c0c5.avif',
        categoryId: 1,
        ingredients: {
            connect: ingredients.slice(5, 10),
        }
      }
  });

  const pizza3 = await prisma.product.create({
   data: {
        name: 'Охотничья',
        imageUrl: 'pizzas/019a109ea75376fe9b51989f221bd92c.avif',
        categoryId: 1,
        ingredients: {
            connect: ingredients.slice(10, 40),
        }
      }
  });

  await prisma.variants.createMany({
    data: [
        // Пиццы
        {
            productId: pizza1.id,
            typeDough: 1,
            price: 400,
            size: 20,
        },
        {
            productId: pizza1.id,
            typeDough: 1,
            price: 450,
            size: 30,
        },
        {
            productId: pizza1.id,
            typeDough: 1,
            price: 500,
            size: 40,
        },
        {
            productId: pizza1.id,
            typeDough: 2,
            price: 400,
            size: 20,
        },
        {
            productId: pizza1.id,
            typeDough: 2,
            price: 450,
            size: 30,
        },
        {
            productId: pizza1.id,
            typeDough: 2,
            price: 500,
            size: 40,
        },
        {
            productId: pizza2.id,
            typeDough: 1,
            price: 400,
            size: 20,
        },
        {
            productId: pizza2.id,
            typeDough: 1,
            price: 450,
            size: 30,
        },
        {
            productId: pizza2.id,
            typeDough: 1,
            price: 500,
            size: 40,
        },
        {
            productId: pizza2.id,
            typeDough: 2,
            price: 400,
            size: 20,
        },
        {
            productId: pizza2.id,
            typeDough: 2,
            price: 450,
            size: 30,
        },
        {
            productId: pizza2.id,
            typeDough: 2,
            price: 500,
            size: 40,
        },
        {
            productId: pizza3.id,
            typeDough: 1,
            price: 400,
            size: 20,
        },
        {
            productId: pizza3.id,
            typeDough: 1,
            price: 450,
            size: 30,
        },
        {
            productId: pizza3.id,
            typeDough: 1,
            price: 500,
            size: 40,
        },
        {
            productId: pizza3.id,
            typeDough: 2,
            price: 400,
            size: 20,
        },
        {
            productId: pizza3.id,
            typeDough: 2,
            price: 450,
            size: 30,
        },
        {
            productId: pizza3.id,
            typeDough: 2,
            price: 500,
            size: 40,
        },
        // Другие продукты
        {
            productId: 1,
            typeDough: null,
            price: 249,
            size: null,
        },
    ]
  });

  await prisma.cart.createMany({
    data: [
        {
            userId: 1,
            totalAmount: 0,
            token: '1111',
        },
        {
            userId: 2,
            totalAmount: 0,
            token: '2222',
        },
    ]
  });

  await prisma.cartItem.create({
    data: {
            variantId: 1,
            cartId: 1,
            quantity: 2,
            ingredients: {
                connect: [{id: 1}, {id: 2}, {id: 3}]
            }
        },
  })
}

async function down(){
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Variants" RESTART IDENTITY CASCADE`;
}

async function main(){
  try{
    await down();
    await up();
  } catch(e){
    console.error(e);
  }
}

main()
  .then(async () => {
  await prisma.$disconnect();
})
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })