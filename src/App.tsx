import {
  ChakraProvider,
  Box,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
} from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Categories from "./pages/Categories";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Wishlist from "./pages/Wishlist";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ComparisonProvider } from "./context/ComparisonContext";
import theme from "./theme";

const queryClient = new QueryClient();

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <ComparisonProvider>
                <Router>
                  <Box minH="100vh" display="flex" flexDirection="column">
                    <Navbar />
                    <Container maxW="container.xl" py={8} flex="1">
                      <VStack spacing={8} align="stretch">
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            <SearchIcon color="gray.300" />
                          </InputLeftElement>
                          <Input
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </InputGroup>
                        <Routes>
                          <Route
                            path="/"
                            element={<Home searchQuery={searchQuery} />}
                          />
                          <Route
                            path="/products"
                            element={<ProductList searchQuery={searchQuery} />}
                          />
                          <Route
                            path="/products/:id"
                            element={<ProductDetail />}
                          />
                          <Route path="/categories" element={<Categories />} />
                          <Route path="/cart" element={<Cart />} />
                          <Route path="/checkout" element={<Checkout />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/register" element={<Register />} />
                          <Route path="/wishlist" element={<Wishlist />} />
                        </Routes>
                      </VStack>
                    </Container>
                    <Footer />
                  </Box>
                </Router>
              </ComparisonProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
