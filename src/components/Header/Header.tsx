import { useEffect, useState } from "react";
import { useStore } from "../../hooks/useStore";
import formatPrice from "../../utils/formatPrice";

const Header = () => {
  const { products, cartTotalItems, totalPrice } = useStore();

  const [addProduct, setAddProduct] = useState(false)
  const productsCategories = products?.map((product) => (product.category))
  const uniqueCategories = [...new Set(productsCategories)]
  const formattedTotalPrice = formatPrice(totalPrice)

  useEffect(() => {
    setAddProduct(true)
    setTimeout(() => setAddProduct(false), 1000);
  }, [cartTotalItems])

  return (
    <div className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 md:py-4">
        <div className="flex items-center justify-between md:justify-start">
          <button
            type="button"
            className="md:hidden w-10 h-10 rounded-lg -ml-2 flex justify-center items-center"
          >
            <svg
              className="text-gray-500 w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1>
            <a href="/" className="font-bold text-gray-700 text-2xl">
              Tudo Aqui
            </a>
          </h1>

          <div className="hidden md:flex space-x-3 flex-1 lg:ml-8">
            {uniqueCategories?.map((category, id) => (
              <a
                href={category}
                className="px-2 py-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600"
                key={id}
              >
                {category}
              </a>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="#/cart"
              className={addProduct ? "flex h-10 items-center px-2 rounded-lg border-2 border-indigo-500 hover:border-gray-300 focus:outline-none hover:shadow-inner" : "flex h-10 items-center px-2 rounded-lg border border-gray-200 hover:border-gray-300 focus:outline-none hover:shadow-inner"}
            >
              <svg
                className="h-6 w-6 leading-none text-gray-300 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="pl-1 text-gray-500 text-md">{cartTotalItems}</span>
            </a>
            <div className="hidden md:flex space-x-3 flex-1 lg:ml-8">
              {formattedTotalPrice}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
