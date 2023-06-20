import React, { createContext, ReactNode, useEffect, useState } from "react";
import { getProducts } from "../services/api/products";
import type { IProduct } from "../services/api/products";

export type CartItem = {
  productId: number | undefined;
  productQuantity: number | undefined;
}

export interface IStoreContext {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  products: IProduct[];
  loading: boolean;
}

const defaultState = {
  cart: ([] as CartItem[]),
  products: ([] as IProduct[]),
  loading: false,
} as IStoreContext;

type StoreProviderProps = {
  children: ReactNode
}

export const StoreContext = createContext(defaultState);

export default function StoreProvider({children}: StoreProviderProps) {

  const [cart, setCart] = useState<CartItem[]>(defaultState.cart);
  const [products, setProducts] = useState<IProduct[]>(defaultState.products);
  const [loading, setLoading] = useState<boolean>(defaultState.loading);

  async function fetchProducts() {
    try {
      setLoading(true)
      const response = await getProducts()
      setProducts(response.data)
    } catch (e) {
      console.log('Error', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [])


  return (
    <StoreContext.Provider value={{cart, setCart, products, loading}}>
      {children}
    </StoreContext.Provider>
  )
}

