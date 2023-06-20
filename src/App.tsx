import Header from "./components/Header/Header";
import StoreProvider from "./context/StoreContext";
import StoreRoutes from "./routes";
import { HashRouter } from "react-router-dom";

function App() {
  return (
    <>
      <HashRouter>
        <StoreProvider>
          <Header />
          <StoreRoutes />
        </StoreProvider>
      </HashRouter>
    </>
  );
}

export default App;
