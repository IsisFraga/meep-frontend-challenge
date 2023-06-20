import CatalogPage from "./pages/CatalogPage"
import Header from "./components/Header/Header"
import StoreProvider from "./context/StoreContext"
import StoreRoutes from "./routes"

function App() {
  return (
    <>
      <StoreRoutes/>
      <StoreProvider>
        <Header />
        <CatalogPage />
      </StoreProvider>
    </>
  )
}

export default App
