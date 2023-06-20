import type { IProduct } from "../../services/api/products";

interface IProductCard {
  id: number
  product: IProduct
}

const ProductCard = ({product}: IProductCard) => {
  return (
    <div>
      <a href="#teste" className="block w-full h-64 rounded-lg shadow-lg bg-white p-2.5">
        <img className="m-auto max-h-60 object-contain items-center" src={product.image} alt="imagem do produto" />
      </a>
      <div className="flex items-center justify-between mt-3">
        <div>
          <a href="#teste" className="font-medium">
            {product.title}
          </a>
        </div>
        <span className="flex items-center h-8 bg-indigo-200 text-indigo-600 text-sm px-2 rounded">
          {product.price}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
