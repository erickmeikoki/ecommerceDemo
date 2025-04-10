import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Text,
  VStack,
  HStack,
  IconButton,
  useToast,
  Box,
} from "@chakra-ui/react";
import { Product } from "../../services/api";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { FaHeart, FaRegHeart, FaExchangeAlt } from "react-icons/fa";

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const toast = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Product added to cart",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast({
        title: "Product removed from wishlist",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Product added to wishlist",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{product.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack spacing={4} align="start">
            <Box flex="1">
              <Image
                src={product.image}
                alt={product.title}
                objectFit="contain"
                height="300px"
                width="100%"
              />
            </Box>
            <VStack flex="1" align="start" spacing={4}>
              <Text fontSize="2xl" fontWeight="bold">
                ${product.price}
              </Text>
              <Text>{product.description}</Text>
              <Text>
                <strong>Category:</strong> {product.category}
              </Text>
              <Text>
                <strong>Rating:</strong> {product.rating.rate} (
                {product.rating.count} reviews)
              </Text>
            </VStack>
          </HStack>
        </ModalBody>

        <ModalFooter>
          <HStack spacing={4}>
            <IconButton
              aria-label={
                isInWishlist(product.id)
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
              icon={isInWishlist(product.id) ? <FaHeart /> : <FaRegHeart />}
              colorScheme={isInWishlist(product.id) ? "red" : "gray"}
              onClick={handleWishlistToggle}
            />
            <IconButton
              aria-label="Compare product"
              icon={<FaExchangeAlt />}
              colorScheme="blue"
            />
            <Button colorScheme="blue" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
