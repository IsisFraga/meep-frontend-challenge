import { useEffect, useState } from "react";
import {
  useParams
} from "react-router-dom";
import { randomImages } from "../contants/randomImages";
import { useStore } from "../hooks/useStore";
import { IProduct } from "../services/api/products";
import formatPrice from "../utils/formatPrice";

const ProductPage = () => {
  const { getProductById, handleChangeProductSpecificQuantity } = useStore();
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [listOfImages, setListOfImages] = useState(randomImages)
  const [currentAmountSelection, setCurrentAmountSelection] = useState(1)
  const { id } = useParams();
  const selectedId = id && parseInt(id) as number
  const selectedProduct = (selectedId && getProductById(selectedId)) as IProduct;
  const formattedPrice = formatPrice(selectedProduct?.price).replace('R$','')
  
  useEffect(() => {
    setListOfImages([{ id: 0, sampleUrl: selectedProduct.image}, ...randomImages])
  }, [selectedId])


  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 text-gray-400 text-sm">
          <a href="#" className="hover:underline hover:text-gray-600">
            Home
          </a>
          <span>
            <svg
              className="h-5 w-5 leading-none text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
          <a href="#" className="hover:underline hover:text-gray-600">
            {selectedProduct?.category}
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div>
              <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                <div
                  className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center bg-contain bg-no-repeat mx-auto"
                  style={{
                    backgroundImage: `url(${
                       (listOfImages?.find((im) => im.id === currentImage)?.sampleUrl)
                    })`,
                  }}
                >
                </div>
              </div>
              <div className="flex mb-4 gap-2">
                {listOfImages.map((image) => (
                  <div
                    className="flex-1 px-2 bg-cover rounded scale-100 hover:scale-[1.02] transition-all"
                    style={{ backgroundImage: `url(${image.sampleUrl})` }}
                  >
                    <button
                      onClick={() => setCurrentImage(image.id)}
                      className={`bg-transparent focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center { 'ring-2 ring-indigo-300 ring-inset': ${currentImage} === ${image.id} }`}
                    >
                      <span x-text="i" className="text-2xl"></span>
                    </button>
                  </div>
                )).slice(0, 4)}
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
              {selectedProduct?.title}
            </h2>
            <p className="text-gray-500 text-sm">
              {selectedProduct?.category}
            </p>

            <div className="flex items-center space-x-4 my-4">
              <div>
                <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                  <span className="text-indigo-400 mr-1 mt-1">R$</span>
                  <span className="font-bold text-indigo-600 text-3xl">{formattedPrice}</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-green-500 text-xl font-semibold">Economize 12%</p>
                <p className="text-gray-400 text-sm">Todas as taxas inclusas.</p>
              </div>
            </div>

            <p className="text-gray-500">
              {selectedProduct?.description}
            </p>

            <div className="flex py-4 space-x-4">
              <div className="relative">
                <div className="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold">
                  Qtd
                </div>
                <select 
                  onChange={(e) => setCurrentAmountSelection(parseInt(e.target.value))}  
                  className="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex items-end pb-1">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>

                <svg
                  className="w-5 h-5 text-gray-400 absolute right-0 bottom-0 mb-2 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                  />
                </svg>
              </div>

              <button
                type="button"
                onClick={() => handleChangeProductSpecificQuantity(currentAmountSelection, selectedProduct.id)}
                className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
