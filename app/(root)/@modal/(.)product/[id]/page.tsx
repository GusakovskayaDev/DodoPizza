import { ChooseProductModal } from "@/shared/components/shared";
import { prisma } from "@/shared/lib/prisma";
import { notFound } from "next/navigation";

export default async function ProductModalPage({ params }: { params: { id: string } }) {
  const id = (await params).id;
  const product = await prisma.product.findFirst({ 
    where: {
      id: Number(id),
    }, 
    include: {
      ingredients: true,
      variant: true,
    },
  });

  if(!product){
    return notFound();
  }

  return <ChooseProductModal product={product}/>
}