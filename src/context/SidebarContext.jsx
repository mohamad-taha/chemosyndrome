// ====================
// Imports
// ====================

import { createContext, useState } from "react";

// ====================
// Context Setup
// ====================

export const SidebarContext = createContext();

// ====================
// Provider
// ====================

export const SidebarProvider = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        showSidebar,
        setShowSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};