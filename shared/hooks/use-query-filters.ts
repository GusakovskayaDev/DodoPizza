import { useEffect, useMemo } from "react";
import { Filters } from "./use-filters";
import qs from "qs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const nextQueryString = useMemo(() => {
    const params = {
      ...filters.prices,
      typeDough: Array.from(filters.typeDough),
      sizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngredients),
    };
    return qs.stringify(params, { arrayFormat: 'comma' });
  }, [filters]);

  const currentQueryString = useMemo(() => {
    const current = Object.fromEntries(searchParams.entries());
    return qs.stringify(current, { arrayFormat: 'comma' });
  }, [searchParams]);

  useEffect(() => {
    if (nextQueryString !== currentQueryString) {
      const query = nextQueryString ? `?${nextQueryString}` : '';
      router.replace(`${pathname}${query}`, { scroll: false });
    }
  }, [nextQueryString, currentQueryString, pathname, router]);
};