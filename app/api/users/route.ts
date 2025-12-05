import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

if (!process.env.DATABASE_URL) {
  throw new Error('❌ DATABASE_URL не задан в .env');
}

const prisma = new PrismaClient({
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