import {
	Box,
	Button,
	Heading,
	Image,
	Text,
	VStack,
	useToast,
	IconButton,
	useColorModeValue
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishlist } from "../../context/WishlistContext";
import { Product } from "../../lib/database";

interface ProductCardProps {
	product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
	const toast = useToast();
	const { addItem } = useCart();
	const { addToWishlist, removeFromWishlist, isInWishlist, isLoading } =
		useWishlist();
	const isWishlisted = isInWishlist(product.id);
	const bgColor = useColorModeValue("white", "gray.800");

	const handleAddToCart = () => {
		addItem({
			id: product.id.toString(),
			name: product.name,
			price: product.price,
			image: product.image_url
		});
		toast({
			title: "Added to cart",
			description: `${product.name} has been added to your cart`,
			status: "success",
			duration: 3000,
			isClosable: true
		});
	};

	const handleWishlistClick = async (e: React.MouseEvent) => {
		e.preventDefault(); // Prevent triggering the link when clicking the heart
		try {
			if (isWishlisted) {
				await removeFromWishlist(product.id);
			} else {
				await addToWishlist({
					id: product.id,
					name: product.name,
					description: product.description,
					price: product.price,
					image_url: product.image_url,
					category_id: product.category_id,
					created_at: new Date().toISOString()
				});
			}
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to update wishlist",
				status: "error",
				duration: 3000,
				isClosable: true
			});
		}
	};

	return (
		<Box
			maxW="sm"
			borderWidth="1px"
			borderRadius="lg"
			overflow="hidden"
			bg={bgColor}
			position="relative"
			_hover={{ shadow: "lg" }}
		>
			<IconButton
				aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
				icon={isWishlisted ? <FaHeart /> : <FaRegHeart />}
				position="absolute"
				top={2}
				right={2}
				colorScheme={isWishlisted ? "red" : "gray"}
				onClick={handleWishlistClick}
				isLoading={isLoading}
				zIndex={2}
				size="sm"
				variant="solid"
				bg={isWishlisted ? "red.500" : "white"}
				color={isWishlisted ? "white" : "gray.500"}
				_hover={{
					bg: isWishlisted ? "red.600" : "gray.100"
				}}
			/>
			<RouterLink to={`/products/${product.id}`}>
				<Image
					src={product.image_url}
					alt={product.name}
					height="200px"
					width="100%"
					objectFit="cover"
				/>
				<VStack p={4} align="start" spacing={2}>
					<Heading size="md" noOfLines={2}>
						{product.name}
					</Heading>
					<Text color="gray.600" noOfLines={2}>
						{product.description}
					</Text>
					<Text fontWeight="bold" fontSize="xl">
						${product.price.toFixed(2)}
					</Text>
				</VStack>
			</RouterLink>
			<Box p={4} pt={0}>
				<Button colorScheme="blue" width="full" onClick={handleAddToCart}>
					Add to Cart
				</Button>
			</Box>
		</Box>
	);
};

export default ProductCard;
