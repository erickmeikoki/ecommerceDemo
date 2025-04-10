import {
  Box,
  Image,
  Text,
  Button,
  HStack,
  IconButton,
  useToast,
  Skeleton,
  useDisclosure,
} from "@chakra-ui/react";
import { Product } from "../../services/api";
import { Link } from "@chakra-ui/react";
import { useComparison } from "../../context/ComparisonContext";
import { useWishlist } from "../../context/WishlistContext";
import { FaExchangeAlt, FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import { QuickViewModal } from "./QuickViewModal";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToComparison, isInComparison, removeFromComparison } =
    useComparison();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const toast = useToast();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleComparisonClick = () => {
    if (isInComparison(product.id)) {
      removeFromComparison(product.id);
      toast({
        title: "Product removed from comparison",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    } else {
      addToComparison(product);
      toast({
        title: "Product added to comparison",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleWishlistClick = () => {
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
    <>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        _hover={{ shadow: "md" }}
        role="article"
        aria-label={`Product: ${product.title}`}
      >
        <Skeleton isLoaded={isImageLoaded} height="200px">
          <Image
            src={product.image}
            alt={product.title}
            height="200px"
            objectFit="contain"
            mx="auto"
            loading="lazy"
            onLoad={() => setIsImageLoaded(true)}
            fallbackSrc="https://via.placeholder.com/300?text=Loading..."
            cursor="pointer"
            onClick={onOpen}
          />
        </Skeleton>
        <Box mt={4}>
          <Link href={`/products/${product.id}`}>
            <Text fontWeight="bold" fontSize="lg" noOfLines={2}>
              {product.title}
            </Text>
          </Link>
          <Text color="gray.600" fontSize="sm" noOfLines={2} mt={2}>
            {product.description}
          </Text>
          <HStack justify="space-between" mt={4}>
            <Text fontWeight="bold" color="blue.600">
              ${product.price}
            </Text>
            <HStack>
              <IconButton
                aria-label={
                  isInWishlist(product.id)
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
                icon={isInWishlist(product.id) ? <FaHeart /> : <FaRegHeart />}
                colorScheme={isInWishlist(product.id) ? "red" : "gray"}
                onClick={handleWishlistClick}
                size="sm"
              />
              <IconButton
                aria-label={
                  isInComparison(product.id)
                    ? "Remove from comparison"
                    : "Add to comparison"
                }
                icon={<FaExchangeAlt />}
                colorScheme={isInComparison(product.id) ? "blue" : "gray"}
                onClick={handleComparisonClick}
                size="sm"
              />
            </HStack>
          </HStack>
          <Button
            colorScheme="blue"
            size="sm"
            mt={4}
            width="full"
            onClick={onOpen}
            aria-label={`Quick view ${product.title}`}
          >
            Quick View
          </Button>
        </Box>
      </Box>
      <QuickViewModal isOpen={isOpen} onClose={onClose} product={product} />
    </>
  );
};
