import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  VStack,
  useToast,
  Link,
  Badge,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const toast = useToast();
  const { addItem } = useCart();

  const handleAddToCart = () => {
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
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      _hover={{ shadow: "md" }}
    >
      <VStack spacing={4} align="stretch">
        <Image
          src={product.image}
          alt={product.title}
          height="200px"
          objectFit="contain"
        />
        <VStack spacing={2} align="start">
          <Badge colorScheme="blue">{product.category}</Badge>
          <Heading size="md">
            <Link as={RouterLink} to={`/products/${product.id}`}>
              {product.title}
            </Link>
          </Heading>
          <Text color="gray.600" noOfLines={2}>
            {product.description}
          </Text>
          <Box>
            <Text fontWeight="bold" fontSize="xl">
              ${product.price.toFixed(2)}
            </Text>
            <Text fontSize="sm" color="gray.500">
              Rating: {product.rating.rate} ({product.rating.count} reviews)
            </Text>
          </Box>
        </VStack>
        <Button colorScheme="blue" width="full" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </VStack>
    </Box>
  );
};

export default ProductCard;
