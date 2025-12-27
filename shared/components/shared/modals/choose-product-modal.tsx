'use client';

import { useRouter } from 'next/navigation';
import { ChooseProductForm } from '../choose-product-form';
import { ProductWithRelations } from "@/@types/prisma";
import { ChoosePizzaForm } from "../choose-pizza-form";
import { Dialog } from '../../ui';
import { DialogContent, DialogTitle } from '../../ui/dialog';
import { cn } from '@/shared/lib/utils';
import { useCartStore } from '@/shared/store';

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const firstVariant = product.variant[0];
  const isPizzaForm = Boolean(firstVariant.typeDough);
  const addCartItem = useCartStore(state => state.addCartItem);

  const onAddProduct = () => {
    addCartItem({
      variantId: firstVariant.id,
    });
  };

  const onAddPizza = (variantId: number, ingredients: number[]) => {
    addCartItem({
      variantId,
      ingredients,
    });
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogTitle/>
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
              onSubmit={onAddPizza}
            />
          ) :
            <ChooseProductForm 
              imageUrl={product.imageUrl} 
              name={product.name} 
              price={firstVariant.price}
              onSubmit={onAddProduct}
            />
       }
      </DialogContent>
    </Dialog>
  );
};