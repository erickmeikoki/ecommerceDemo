import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import theme from "./theme";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ComparisonProvider } from "./context/ComparisonContext";
import { ErrorBoundary } from "./components/ErrorBoundary";

// Register service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      })
      .catch((error) => {
        console.log("ServiceWorker registration failed: ", error);
      });
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ChakraProvider theme={theme}>
        <CartProvider>
          <WishlistProvider>
            <ComparisonProvider>
              <App />
            </ComparisonProvider>
          </WishlistProvider>
        </CartProvider>
      </ChakraProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
