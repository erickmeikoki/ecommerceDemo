import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "../services/api";

interface ComparisonContextType {
  comparisonProducts: Product[];
  addToComparison: (product: Product) => void;
  removeFromComparison: (productId: number) => void;
  isInComparison: (productId: number) => boolean;
  clearComparison: () => void;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(
  undefined
);

export const ComparisonProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [comparisonProducts, setComparisonProducts] = useState<Product[]>([]);

  useEffect(() => {
    const savedComparison = localStorage.getItem("comparisonProducts");
    if (savedComparison) {
      setComparisonProducts(JSON.parse(savedComparison));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "comparisonProducts",
      JSON.stringify(comparisonProducts)
    );
  }, [comparisonProducts]);

  const addToComparison = (product: Product) => {
    if (comparisonProducts.length >= 4) {
      alert("You can compare up to 4 products at a time");
      return;
    }
    if (!comparisonProducts.some((p) => p.id === product.id)) {
      setComparisonProducts([...comparisonProducts, product]);
    }
  };

  const removeFromComparison = (productId: number) => {
    setComparisonProducts(comparisonProducts.filter((p) => p.id !== productId));
  };

  const isInComparison = (productId: number) => {
    return comparisonProducts.some((p) => p.id === productId);
  };

  const clearComparison = () => {
    setComparisonProducts([]);
  };

  return (
    <ComparisonContext.Provider
      value={{
        comparisonProducts,
        addToComparison,
        removeFromComparison,
        isInComparison,
        clearComparison,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error("useComparison must be used within a ComparisonProvider");
  }
  return context;
};
