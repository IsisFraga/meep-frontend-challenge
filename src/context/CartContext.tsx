import React, { createContext, ReactNode, useEffect, useState } from "react";
import { getProducts } from "../services/api/products";
import type { IProduct } from "../services/api/products";

export type Cart = {
  productId: number | undefined;
  productQuantity: number | undefined;
}

export interface ICartContext {
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
  products: IProduct[]
}


const defaultState = {
  cart: {
    productId: undefined,
    productQuantity: undefined,
  },
  setCart: (cart: Cart) => {},
  products: [],
} as ICartContext;

type CartProviderProps = {
  children: ReactNode
}


export const CartContext = createContext(defaultState);

export default function CartProvider({children}: CartProviderProps) {

  const [cart, setCart] = useState<Cart>(defaultState.cart);
  const [products, setProducts] = useState<IProduct[]>([])

  async function fetchProducts() {
    try {
      // setLoading(true)
      const response = await getProducts()
      setProducts(response.data)
    } catch (e) {
      console.log('Error', e)
    } finally {
      // setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])


  return (
    <CartContext.Provider value={{cart, setCart, products}}>
      {children}
    </CartContext.Provider>
  )
}