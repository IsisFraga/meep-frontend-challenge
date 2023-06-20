import CatalogPage from "./pages/CatalogPage"
import Header from "./components/Header/Header"
import CartContext from "./context/CartContext"

function App() {
  return (
    <>
      <CartContext>
        <Header />
        <CatalogPage />
      </CartContext>
    </>
  )
}

export default App
