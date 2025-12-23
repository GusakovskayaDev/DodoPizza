'use client';

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import { Button } from '../ui';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { CartDrawerItem } from './cart-drawer-item';
import { getCartItemDetails } from '@/shared/lib';
import { useEffect } from 'react';
import { useCartStore } from '@/shared/store';
import { PizzaSize, TypeDough } from '@/shared/constants/pizza';
import { useShallow } from 'zustand/shallow';

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {

const { totalAmount, fetchCartItems, items } = useCartStore(
  useShallow((state) => ({
    totalAmount: state.totalAmount,
    fetchCartItems: state.fetchCartItems,
    items: state.items,
  }))
);
  
  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">

          <SheetHeader>
            <SheetTitle>
              В корзине <span className="font-bold">3 товара</span>
            </SheetTitle>
          </SheetHeader>

        {
          items.map((item) => (
            <div className='mb-2' key={item.id}>
            <CartDrawerItem 
              id={item.id} 
              imageUrl={item.imageUrl} 
              details={
              item.pizzaSize && item.typeDough 
              ? getCartItemDetails(
                item.ingredients,
                item.typeDough as TypeDough,
                item.pizzaSize as PizzaSize, 
                ) 
              : ''} name={item.name} 
              price={item.price} 
              quantity={item.quantity}
            />
            </div>
          ))
        }

        <SheetFooter className="bg-white p-5">

            <div className="flex mb-4">
              <span className='flex flex-1 text-lg text-neutral-500'>
                Итого
                <div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2'/>
              </span>

              <span className='font-bold rext-lg'>{totalAmount} Р</span>
            </div>

            <Link href="/cart">
              <Button
                type='submit'
                className='w-full h-12 text-base'
              >
                Оформить заказ
                <ArrowRight className='w-5 ml-2'/>
              </Button>
            </Link>

        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
