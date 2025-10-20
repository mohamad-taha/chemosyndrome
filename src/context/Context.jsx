import { createContext, useEffect, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [update, setUpdate] = useState(false);
  const [products, setProducts] = useState([]);

  return (
    <Context.Provider
      value={{
        showSidebar,
        setShowSidebar,
        update,
        setUpdate,
        products,
        setProducts,
      }}
    >
      {children}
    </Context.Provider>
  );
};
