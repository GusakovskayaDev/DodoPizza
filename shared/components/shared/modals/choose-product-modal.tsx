'use client';

import { useRouter } from 'next/navigation';
import { ChooseProductForm } from '../choose-product-form';
import { ProductWithRelations } from "@/@types/prisma";
import { ChoosePizzaForm } from "../choose-pizza-form";
import { Dialog } from '../../ui';
import { DialogContent } from '../../ui/dialog';
import { cn } from '@/shared/lib/utils';

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const isPizzaForm = Boolean(product.variant[0]);

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn(
    'p-0 w-[1060px] min-h-[510px] bg-white overflow-hidden',
    className
  )}
  style={{ maxWidth: '1060px' }}>
       {
        isPizzaForm ? (
          <ChoosePizzaForm 
            imageUrl={product.imageUrl} 
            name={product.name} 
            ingredients={product.ingredients}
            variants={product.variant}
          />
        ) :
        <ChooseProductForm imageUrl={product.imageUrl} name={product.name}/>
       }
      </DialogContent>
    </Dialog>
  );
};