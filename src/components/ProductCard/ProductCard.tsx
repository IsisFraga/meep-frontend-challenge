import { useStore } from "../../hooks/useStore";
import type { IProduct } from "../../services/api/products";
import formatPrice from "../../utils/formatPrice";

interface IProductCard {
  product: IProduct;
}

const ProductCard = ({ product }: IProductCard) => {
  const { handleAddToCart, handleProductPage } = useStore();
  const formattedPrice = formatPrice(product.price);
  const priceBeforeDiscount = formatPrice(product.price + 10);



  return (
    <div className="flex flex-col	justify-between bg-white shadow-md hover:scale-105 hover:shadow-xl duration-500 rounded-xl p-3">
      <img
        src={product.image}
        alt="imagem do produto"
        className="max-h-80 m-auto"
      />
      <div className="flex flex-col px-4 py-3 w-72 w-full">
        <span className="text-gray-400 mr-3 uppercase text-xs">
          {product.category}
        </span>
        <p className="text-lg font-bold text-black truncate block capitalize">
          {product.title}
        </p>
        <div className="flex items-center">
          <p className="text-lg font-semibold text-black cursor-auto my-3">
            {formattedPrice}
          </p>
          <del>
            <p className="text-sm text-gray-600 cursor-auto ml-2">
              {priceBeforeDiscount}
            </p>
          </del>
        </div>
        <div className="flex justify-between items-center pb-2 text-sm">
          <div className="w-1/2 p-1 flex align-center">
            <button onClick={() => handleProductPage(product.id)} className="flex align-center justify-between my-auto w-full bg-indigo-600 hover:bg-indigo-500 text-white border-2 border-indigo-500 hover:border-indigo-600 px-3 py-2 rounded uppercase font-poppins font-medium">
              <svg viewBox="0 0 24 24" className="inline w-4 h-4 mr-0.5">
                <path
                  fill="currentColor"
                  d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"
                />
              </svg>
              Detalhes
            </button>
          </div>
          <div className="w-1/2 p-1">
            <button 
              className="block w-full bg-white hover:bg-indigo-100 text-indigo-500 border-2 border-indigo-500 px-3 py-2 rounded uppercase font-poppins font-medium"
              onClick={() => handleAddToCart(product, 1)}
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
