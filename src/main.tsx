import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Categories from "./pages/Categories";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import theme from "./theme";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
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

const queryClient = new QueryClient();

// Create a wrapped version of App with all providers
const WrappedApp = () => {
	return (
		<AuthProvider>
			<CartProvider>
				<WishlistProvider>
					<ComparisonProvider>
						<App />
					</ComparisonProvider>
				</WishlistProvider>
			</CartProvider>
		</AuthProvider>
	);
};

const router = createBrowserRouter([
	{
		path: "/",
		element: <WrappedApp />,
		children: [
			{
				index: true,
				element: <Home />
			},
			{
				path: "products",
				element: <ProductList />
			},
			{
				path: "products/:id",
				element: <ProductDetail />
			},
			{
				path: "categories",
				element: <Categories />
			},
			{
				path: "cart",
				element: <Cart />
			},
			{
				path: "checkout",
				element: <Checkout />
			},
			{
				path: "login",
				element: <Login />
			},
			{
				path: "register",
				element: <Register />
			},
			{
				path: "wishlist",
				element: <Wishlist />
			},
			{
				path: "profile",
				element: <Profile />
			}
		]
	}
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ErrorBoundary>
			<ChakraProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
				</QueryClientProvider>
			</ChakraProvider>
		</ErrorBoundary>
	</React.StrictMode>
);
