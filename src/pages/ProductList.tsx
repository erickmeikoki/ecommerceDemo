import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  Select,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ProductCard from "../components/product/ProductCard";
import ProductCardSkeleton from "../components/product/ProductCardSkeleton";
import { api } from "../services/api";

interface ProductListProps {
  searchQuery: string;
}

const ProductList = ({ searchQuery }: ProductListProps) => {
  const [sortBy, setSortBy] = useState("default");
  const [category, setCategory] = useState("all");

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", category],
    queryFn: () =>
      category === "all"
        ? api.getProducts()
        : api.getProductsByCategory(category),
  });

  const filteredProducts = products?.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = filteredProducts?.sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return b.rating.rate - a.rating.rate;
      default:
        return 0;
    }
  });

  if (error) {
    return (
      <Container maxW="container.xl" py={8}>
        <Box textAlign="center">
          <Heading color="red.500">Error</Heading>
          <Text>Failed to load products. Please try again later.</Text>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <HStack spacing={4}>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            maxW="200px"
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </Select>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            maxW="200px"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Rating</option>
          </Select>
        </HStack>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {isLoading
            ? Array(6)
                .fill(0)
                .map((_, index) => <ProductCardSkeleton key={index} />)
            : sortedProducts?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default ProductList;
