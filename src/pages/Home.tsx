import {
  Box,
  Button,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Skeleton,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/product/ProductCard";
import ProductCardSkeleton from "../components/product/ProductCardSkeleton";
import { api } from "../services/api";

interface HomeProps {
  searchQuery: string;
}

const Home = ({ searchQuery }: HomeProps) => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", searchQuery],
    queryFn: () => api.getProducts(),
  });

  const filteredProducts = products?.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (error) {
    return (
      <Box textAlign="center" py={10}>
        <Text color="red.500">Error loading products</Text>
      </Box>
    );
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box bg="blue.500" color="white" py={20}>
        <Container maxW="container.xl">
          <VStack spacing={6} align="start">
            <Heading size="2xl">Welcome to Our Store</Heading>
            <Text fontSize="xl">Discover amazing products at great prices</Text>
            <Button
              as={RouterLink}
              to="/products"
              colorScheme="white"
              variant="outline"
              size="lg"
            >
              Shop Now
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Featured Products Section */}
      <Container maxW="container.xl" py={12}>
        <VStack spacing={8} align="stretch">
          <Heading size="xl" textAlign="center">
            Featured Products
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {isLoading
              ? Array(6)
                  .fill(0)
                  .map((_, index) => <ProductCardSkeleton key={index} />)
              : filteredProducts?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Home;
