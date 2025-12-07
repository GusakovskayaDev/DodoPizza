import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

if (!process.env.DATABASE_URL) {
  throw new Error('❌ DATABASE_URL не задан в .env');
}

export const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Ошибка в GET /api/users:', error);
    return NextResponse.json({ error: 'Не удалось загрузить пользователей' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest){
  try {
    const data = await request.json();
    const { email, fullName, password } = data;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    if (!fullName) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    const user = await prisma.user.create({
      data
    });

      return NextResponse.json(user, { status: 201 });
    } catch (error) {
      console.error('Ошибка при создании пользователя:', error);
      return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
}