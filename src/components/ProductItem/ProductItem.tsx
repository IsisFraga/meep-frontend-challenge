import { useEffect } from "react";
import { useStore } from "../../hooks/useStore";
import formatPrice from "../../utils/formatPrice";
import { CartItem } from "../../context/StoreContext";
interface IProductItem {
  product: CartItem
}

const ProductItem = ({product}: IProductItem) => {
  const { handleRemoveFromCart, getProductById, handleChangeQuantity } = useStore();
  
  const cartItem = getProductById(product.productId);
  const formattedIndividualPrice = cartItem?.price && formatPrice(cartItem?.price);
  const totalPriceByItem = (priceItem: number, itemQuantity: number) => {
    return priceItem * itemQuantity
  }

  const formattedTotalPriceByItem = cartItem?.price && formatPrice(totalPriceByItem(cartItem?.price, product.productQuantity))
  useEffect(() => {
    if (product.productQuantity === 0 && cartItem?.id) {
      handleRemoveFromCart(cartItem?.id)
    }

  }, [product.productQuantity])
  

  return (
    <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
    <div className="flex w-2/5">
      <div className="w-20">
        <img
          className="h-24"
          src={cartItem?.image}
          alt=""
        />
      </div>
      <div className="flex flex-col justify-between ml-4 flex-grow">
        
        <span className="font-bold text-sm">{cartItem?.title}</span>
        <span className="text-red-500 text-xs">{cartItem?.category}</span>
        <button
          onClick={() => cartItem?.id && handleRemoveFromCart(cartItem?.id)}
          className="font-semibold hover:text-red-500 text-gray-500 text-xs w-fit"
        >
          Remover
        </button>
      </div>
    </div>
    <div className="flex justify-center w-1/5">
      <button onClick={() => cartItem?.id && handleChangeQuantity(cartItem?.id, false)}>
        <svg
          className="fill-current text-gray-600 w-3"
          viewBox="0 0 448 512"
        >
          <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
        </svg>
      </button>
      <input
        className="mx-2 border text-center w-8"
        type="text"
        value={product.productQuantity}
      />
      <button onClick={() => cartItem?.id && handleChangeQuantity(cartItem?.id, true)}>
        <svg
          className="fill-current text-gray-600 w-3"
          viewBox="0 0 448 512"
        >
          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
        </svg>
      </button>
    </div>
    <span className="text-center w-1/5 font-semibold text-sm">
      {formattedIndividualPrice}
    </span>
    <span className="text-center w-1/5 font-semibold text-sm">
      {formattedTotalPriceByItem}
    </span>
  </div>
  )
}

export default ProductItem