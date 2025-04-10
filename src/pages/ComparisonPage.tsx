import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useComparison } from "../context/ComparisonContext";
import { ProductCard } from "../components/products/ProductCard";
import { Link as RouterLink } from "react-router-dom";

export const ComparisonPage: React.FC = () => {
  const { comparisonProducts, removeFromComparison, clearComparison } =
    useComparison();

  if (comparisonProducts.length === 0) {
    return (
      <Container maxW="container.xl" py={8}>
        <VStack spacing={6} align="center">
          <Heading>No Products to Compare</Heading>
          <Text>Add products to comparison to see them here.</Text>
          <Button as={RouterLink} to="/" colorScheme="blue">
            Browse Products
          </Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8}>
        <Flex justify="space-between" width="full" align="center">
          <Heading>Product Comparison</Heading>
          <Button onClick={clearComparison} colorScheme="red" size="sm">
            Clear All
          </Button>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {comparisonProducts.map((product) => (
            <Box key={product.id} position="relative">
              <Button
                position="absolute"
                top={2}
                right={2}
                size="sm"
                colorScheme="red"
                onClick={() => removeFromComparison(product.id)}
                zIndex={1}
              >
                Remove
              </Button>
              <ProductCard product={product} />
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};
