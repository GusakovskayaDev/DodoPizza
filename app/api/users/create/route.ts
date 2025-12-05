
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: { email, name },
    });

      return NextResponse.json(user, { status: 201 });
    } catch (error) {
      console.error('Ошибка при создании пользователя:', error);
      return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
}