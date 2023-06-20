import type { CartItem } from "../context/StoreContext";
import type { IProduct } from "../services/api/products";

interface ICalculateTotalPrice {
  products: IProduct[],
  cartItems: CartItem[]
}

export default function calculateTotalPrice({products, cartItems}: ICalculateTotalPrice) {
  return cartItems.reduce((accumulator: number, currentItem: CartItem) => {
    if (!products.length) return 0;
    const currentProduct = products.find(product => product.id === currentItem?.productId) as IProduct;
    const currentTotalPrice = currentProduct.price * currentItem?.productQuantity;
    return accumulator + currentTotalPrice;
  }, 0)
} 