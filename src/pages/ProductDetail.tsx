import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Button,
  Badge,
  useToast,
  Skeleton,
  Divider,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const toast = useToast();
  const { addItem } = useCart();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => api.getProduct(Number(id)),
  });

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id.toString(),
        name: product.title,
        price: product.price,
        image: product.image,
      });
      toast({
        title: "Added to cart",
        description: `${product.title} has been added to your cart`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (error) {
    return (
      <Container maxW="container.xl" py={8}>
        <Box textAlign="center">
          <Heading color="red.500">Error</Heading>
          <Text>Failed to load product. Please try again later.</Text>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      {isLoading ? (
        <VStack spacing={8}>
          <Skeleton height="400px" width="full" />
          <VStack spacing={4} align="stretch" width="full">
            <Skeleton height="40px" width="60%" />
            <Skeleton height="24px" width="40%" />
            <Skeleton height="100px" width="full" />
          </VStack>
        </VStack>
      ) : product ? (
        <VStack spacing={8} align="stretch">
          <HStack spacing={8} align="start">
            <Box flex="1">
              <Image
                src={product.image}
                alt={product.title}
                objectFit="contain"
                height="400px"
                width="full"
              />
            </Box>
            <VStack spacing={4} align="start" flex="1">
              <Badge colorScheme="blue" fontSize="lg">
                {product.category}
              </Badge>
              <Heading size="xl">{product.title}</Heading>
              <Text fontSize="2xl" fontWeight="bold">
                ${product.price.toFixed(2)}
              </Text>
              <HStack>
                <Badge colorScheme="green" fontSize="md">
                  Rating: {product.rating.rate} ({product.rating.count} reviews)
                </Badge>
              </HStack>
              <Text>{product.description}</Text>
              <Button
                colorScheme="blue"
                size="lg"
                onClick={handleAddToCart}
                width="full"
              >
                Add to Cart
              </Button>
            </VStack>
          </HStack>
          <Divider />
          <VStack spacing={4} align="start">
            <Heading size="md">Product Details</Heading>
            <Text>
              <strong>Category:</strong> {product.category}
            </Text>
            <Text>
              <strong>Price:</strong> ${product.price.toFixed(2)}
            </Text>
            <Text>
              <strong>Rating:</strong> {product.rating.rate} out of 5 (
              {product.rating.count} reviews)
            </Text>
          </VStack>
        </VStack>
      ) : null}
    </Container>
  );
};

export default ProductDetail;
