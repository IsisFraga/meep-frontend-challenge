import CatalogPage from "./pages/CatalogPage"
import Header from "./components/Header/Header"
import StoreProvider from "./context/StoreContext"

function App() {
  return (
    <>
      <StoreProvider>
        <Header />
        <CatalogPage />
      </StoreProvider>
    </>
  )
}

export default App
