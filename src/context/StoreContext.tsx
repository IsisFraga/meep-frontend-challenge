import React, { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/api/products";
import type { IProduct } from "../services/api/products";
import calculateTotalPrice from "../utils/calculateTotalPrice";

export type CartItem = {
  productId: number;
  productQuantity: IStoreContext["productQuantity"];
  product?: IProduct
}

export interface IStoreContext {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  products: IProduct[];
  loading: boolean;
  handleAddToCart: (product: IProduct, quantity: number) => void,
  cartTotalItems: number,
  handleRemoveFromCart: (id: number) => void,
  handleChangeQuantity: (id: number, isIncrease: boolean) => void,
  getProductById: (id: number) => IProduct,
  productQuantity: number,
  setProductQuantity: (productQuantity: number) => void,
  totalPrice: number,
  handleChangeProductSpecificQuantity: (amount: number, id: number) => void,
  setLoading: (loading: boolean) => void,
  toastOpen: boolean,
  setToastOpen: (toastOpen: boolean) => void,
  handleProductPage: (id: number) => void,
}

const defaultState = {
  cartItems: ([] as CartItem[]),
  products: ([] as IProduct[]),
  loading: false,
} as IStoreContext;

type StoreProviderProps = {
  children: ReactNode
}

export const StoreContext = createContext(defaultState);

export default function StoreProvider({children}: StoreProviderProps) {

  const [cartItems, setCartItems] = useState<CartItem[]>(defaultState.cartItems);
  const [products, setProducts] = useState<IProduct[]>(defaultState.products);
  const [productQuantity, setProductQuantity] = useState(1);
  const [loading, setLoading] = useState<boolean>(defaultState.loading);
  const [toastOpen, setToastOpen] = useState(false)
  const handleAddToCart: IStoreContext["handleAddToCart"] = useCallback((
    { id }, quantity
  ) => {
    if (cartItems.some(p => p.productId === id)) return handleChangeQuantity(id, true);
    const updatedCart = [
      ...cartItems,
      {
        productId: id,
        productQuantity: quantity,
      },
    ]
    setCartItems(updatedCart);
    setProductQuantity(quantity);
    localStorage.setItem('previous-cart', JSON.stringify(updatedCart));
  }, [cartItems]);

  const handleRemoveFromCart = (id: number) => {
    const newCart = cartItems.filter((item) => item.productId !== id);

    setCartItems(newCart);
  };
  const navigate = useNavigate();

  const handleProductPage = (id: number) => {
    navigate(`/product/${id}`, { replace: true })
  }

  const cartTotalIndividual = cartItems?.map((product) => product.productQuantity)
  const cartTotalItems = cartTotalIndividual?.reduce((partialSum, a) => partialSum + a, 0) ?? 0;

  const fetchProducts = async() => {
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

  const getPreviousCart = () => {
    const previousCart = JSON.parse(localStorage.getItem('previous-cart') || '[]') as CartItem[];
    setCartItems(previousCart);
  }

  const getProductById = (id: number) => {
    return products.find(product => product.id === id) as IProduct;
  }

  const handleChangeQuantity = (id, isIncrease) => {
    const newArr = [...cartItems];
    const updatedProduct = newArr.find(p => p.productId === id) as CartItem;

    if (!updatedProduct.productQuantity) {
      updatedProduct.productQuantity = 0;
    }

    if (isIncrease) {
      updatedProduct.productQuantity += 1;
    } else {
      updatedProduct.productQuantity -= 1;
    }

    setCartItems(newArr);
    localStorage.setItem('previous-cart', JSON.stringify(newArr));
  }
  
  const totalPrice = useMemo(() => {
    console.log('cartitems', cartItems)
    console.log('products', products)
    return calculateTotalPrice({cartItems, products})
  }, [cartItems])

  const handleChangeProductSpecificQuantity = useCallback((amount: number, id: number) => {
    const newArr = [...cartItems];
    const newCartItem: CartItem = {
      productId: id,
      productQuantity: amount,
    }

    if (!newArr.some(p => p.productId === newCartItem.productId)) {
      newArr.push(newCartItem)
    } else {
      const previousCartItem = (newArr.find(p => p.productId === newCartItem.productId) as CartItem)
      previousCartItem.productQuantity += amount;
    }
  
    setCartItems(newArr);
    localStorage.setItem('previous-cart', JSON.stringify(newArr));
  },[cartItems]);

  useEffect(() => {
    getPreviousCart();
    fetchProducts();
  }, [])


  return (
    <StoreContext.Provider value={{
      cartItems, 
      setCartItems, 
      products, 
      loading,
      setLoading,
      handleAddToCart, 
      cartTotalItems, 
      handleRemoveFromCart, 
      getProductById,
      handleChangeQuantity,
      handleChangeProductSpecificQuantity,
      setProductQuantity,
      productQuantity,
      totalPrice,
      setToastOpen,
      toastOpen,
      handleProductPage
    }}>
      {children}
    </StoreContext.Provider>
  )
}

