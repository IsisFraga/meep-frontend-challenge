import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductItem from "../components/ProductItem/ProductItem";
import { useStore } from "../hooks/useStore";
import formatPrice from "../utils/formatPrice";
import ToastSuccess from "../components/Toast/Toast";

const CartPage = () => {
  const {
    cartItems,
    cartTotalItems,
    totalPrice,
    loading,
    setLoading,
    setToastOpen,
    toastOpen,
    setCartItems
  } = useStore();
  const [isSuccess, setIsSuccess] = useState(false);
  const shippingValue = 10;
  const formattedShippingValue = formatPrice(shippingValue);
  const formattedTotalValueWithShippingValue = formatPrice(
    totalPrice + shippingValue
  );

  const toastText = "Compra realizada com sucesso.";

  const navigate = useNavigate();

  const actionsAfterSuccess = () => {
    setToastOpen(true)
    setLoading(false)
    setCartItems([])
  }

  const handlePurchase = () => {
    setLoading(true);
    setIsSuccess(true);
    setTimeout(() => actionsAfterSuccess(), 2000);
    setTimeout(() => {
      navigate('/#/catalog', { replace: true })
    }, 3000);
    
  };

  return (
    <>
     {isSuccess && toastOpen && <ToastSuccess toastText={toastText} />}
      <section className="bg-gray-100">
        <div className="container mx-auto mt-10">
          <div className="flex shadow-md my-10">
            <div className="w-3/4 bg-white px-10 py-10">
              <div className="flex justify-between border-b pb-8">
                <h2 className="font-semibold text-2xl">Carrinho</h2>
                <h2 className="font-semibold text-2xl">
                  {cartTotalItems} Items
                </h2>
              </div>
              <div className="flex mt-10 mb-5">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                  Detalhes dos produtos
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                  Quantidade
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                  Preço
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                  Total
                </h3>
              </div>
              {cartItems &&
                cartItems?.map((product) => (
                  <ProductItem key={product.productId} product={product} />
                ))}
              <a
                href="#/catalog"
                className="flex font-semibold text-indigo-600 text-sm mt-10"
              >
                <svg
                  className="fill-current mr-2 text-indigo-600 w-4"
                  viewBox="0 0 448 512"
                >
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                Continue Comprando
              </a>
            </div>

            <div id="summary" className="w-1/4 px-8 py-10">
              <h3 className="font-semibold text-2xl border-b pb-8">
                Resumo da Compra
              </h3>
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">
                  Itens {cartTotalItems}
                </span>
                <span className="font-semibold text-sm">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <div>
                <label className="font-medium inline-block mb-3 text-sm uppercase">
                  Entrega
                </label>
                <select className="block p-2 text-gray-600 w-full text-sm">
                  <option>Entrega padrão - {formattedShippingValue}</option>
                </select>
              </div>
              <div className="border-t mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Valor Total</span>
                  <span>{formattedTotalValueWithShippingValue}</span>
                </div>
                <button
                  onClick={handlePurchase}
                  className="flex justify-center bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
                >
                  {loading ? (
                    <div
                      className="w-5 h-5 rounded-full animate-spin
                    border-4 border-solid border-white border-t-transparent"
                    ></div>
                  ) : (
                    "Comprar"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
     
    </>
  );
};
export default CartPage;
