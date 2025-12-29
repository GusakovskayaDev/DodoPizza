'use client'

import { useIntersection } from 'react-use';
import { Title } from "./title"
import { ProductCard } from "./product-card"
import { useEffect, useRef } from 'react';
import { cn } from '@/shared/lib/utils';
import { useCategoryStore } from '@/shared/store';


interface Props {
  title: string,
  products: any[],
  listClassName?: string,
  categoryId: number,
  className?: string,
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  products,
  listClassName,
  categoryId,
  className,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = useRef<HTMLDivElement>(null!);
  const intersection = useIntersection(intersectionRef, {
      threshold: 0.4,
  });

  useEffect(() => {
    if(intersection?.isIntersecting){
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, title])

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5"/>

      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {products.map((product, i) => (
          <ProductCard
            key = {product.id}
            id = {product.id}
            name = {product.name}
            imageUrl = {product.imageUrl}
            price = {product.variant[0].price}
          />
        ))}
      </div>
    </div>
  )
}