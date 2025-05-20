import { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <Context.Provider value={{ showSidebar, setShowSidebar }}>
      {children}
    </Context.Provider>
  );
};
