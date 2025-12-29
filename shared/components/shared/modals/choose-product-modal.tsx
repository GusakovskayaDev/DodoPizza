'use client';

import { useRouter } from 'next/navigation';
import { ChooseProductForm } from '../choose-product-form';
import { ProductWithRelations } from "@/@types/prisma";
import { ChoosePizzaForm } from "../choose-pizza-form";
import { Dialog } from '../../ui';
import { DialogContent, DialogTitle } from '../../ui/dialog';
import { cn } from '@/shared/lib/utils';
import { useCartStore } from '@/shared/store';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/shallow';

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const firstVariant = product.variant[0];
  const isPizzaForm = Boolean(firstVariant.typeDough);

  const [addCartItem, loading] = useCartStore(useShallow(state => [
    state.addCartItem, state.loading
  ]));

  const onSumbit = async (variantId?: number, ingredients?: number[]) => {
    try {
      await addCartItem(
      isPizzaForm 
      ? {variantId, ingredients} 
      : { variantId: firstVariant.id}
    );
      toast.success(`${isPizzaForm ? 'Пицца' : 'Продукт'} добавлена в корзину`);
      router.back();
    } catch (error) {
      toast.error(`Не удалось добавить ${isPizzaForm ? 'пиццу' : 'продукт'} в корзину`);
      console.log(error);
    }
  }

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
              onSubmit={onSumbit}
              loading={loading}
            />
          ) :
            <ChooseProductForm 
              imageUrl={product.imageUrl} 
              name={product.name} 
              price={firstVariant.price}
              onSubmit={onSumbit}
              loading={loading}
            />
       }
      </DialogContent>
    </Dialog>
  );
};