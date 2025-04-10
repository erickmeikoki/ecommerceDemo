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
import { useWishlist } from "../context/WishlistContext";
import { ProductCard } from "../components/products/ProductCard";
import { Link as RouterLink } from "react-router-dom";

export const Wishlist: React.FC = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <Container maxW="container.xl" py={8}>
        <VStack spacing={6} align="center">
          <Heading>Your Wishlist is Empty</Heading>
          <Text>Add products to your wishlist to see them here.</Text>
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
          <Heading>Your Wishlist</Heading>
          <Button onClick={clearWishlist} colorScheme="red" size="sm">
            Clear All
          </Button>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {wishlistItems.map((product) => (
            <Box key={product.id} position="relative">
              <Button
                position="absolute"
                top={2}
                right={2}
                size="sm"
                colorScheme="red"
                onClick={() => removeFromWishlist(product.id)}
                zIndex={1}
                aria-label={`Remove ${product.title} from wishlist`}
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
