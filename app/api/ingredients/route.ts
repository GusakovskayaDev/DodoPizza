import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(){
  const ingredients = await prisma.ingredient.findMany();

  return NextResponse.json(ingredients);
}