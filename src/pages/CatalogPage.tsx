import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import { getProducts } from "../services/api/products";
import type { IProduct } from "../services/api/products";

const CatalogPage = () => {

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
    <section className="flex flex-col w-screen min-h-screen p-10 bg-gray-100 text-gray-800">
      <h1 className="text-3xl">Catálogo de produtos</h1>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mt-6">
        <span className="text-sm font-semibold">1-10 de {products?.length} Produtos</span>
      </div>
      <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-12 w-full mt-6">
      {products?.map((product, id) => (
        <ProductCard id={id} product={product}/>
      ))}
      </div>
      <div className="flex justify-center mt-10 space-x-1">
        <button className="flex items-center justify-center h-8 w-8 rounded text-gray-400">
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <button
          className="flex items-center justify-center h-8 px-2 rounded text-sm font-medium text-gray-400"
          disabled
        >
          Anterior
        </button>
        <button
          className="flex items-center justify-center h-8 w-8 rounded bg-indigo-200 text-sm font-medium text-indigo-600"
          disabled
        >
          1
        </button>
        <button className="flex items-center justify-center h-8 w-8 rounded hover:bg-indigo-200 text-sm font-medium text-gray-600 hover:text-indigo-600">
          2
        </button>
        <button className="flex items-center justify-center h-8 w-8 rounded hover:bg-indigo-200 text-sm font-medium text-gray-600 hover:text-indigo-600">
          3
        </button>
        <button className="flex items-center justify-center h-8 px-2 rounded hover:bg-indigo-200 text-sm font-medium text-gray-600 hover:text-indigo-600">
          Próxima
        </button>
        <button className="flex items-center justify-center h-8 w-8 rounded hover:bg-indigo-200 text-gray-600 hover:text-indigo-600">
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default CatalogPage;
