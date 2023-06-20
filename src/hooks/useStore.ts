import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

export const useStore = () => {
    const context = useContext(StoreContext);
  
    if (!context) {
      throw new Error(
        `useCart must be used within a StoreContext Provider.`
      );
    }
    return context;
  };
  