import React, { createContext, ReactNode, useState } from "react";

export type Cart = {
  productId: number | undefined;
  productQuantity: number | undefined;
}

export interface ICartContext {
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
}


const defaultState = {
  cart: {
    productId: undefined,
    productQuantity: undefined,
  },
  setCart: (cart: Cart) => {},
} as ICartContext;

type CartProviderProps = {
  children: ReactNode
}


export const CartContext = createContext(defaultState);

export default function CartProvider({children}: CartProviderProps) {
  const [cart, setCart] = useState<Cart>(defaultState.cart);

  return (
    <CartContext.Provider value={{cart, setCart}}>
      {children}
    </CartContext.Provider>
  )
}