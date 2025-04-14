import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import {
	addToWishlist as addToWishlistDB,
	removeFromWishlist as removeFromWishlistDB,
	getWishlistItems
} from "../lib/database";
import { useToast } from "@chakra-ui/react";

interface WishlistContextType {
	wishlistItems: Product[];
	addToWishlist: (product: Product) => Promise<void>;
	removeFromWishlist: (productId: number) => Promise<void>;
	isInWishlist: (productId: number) => boolean;
	clearWishlist: () => Promise<void>;
	isLoading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
	undefined
);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const { user } = useAuth();
	const toast = useToast();

	useEffect(() => {
		if (user) {
			loadWishlistItems();
		} else {
			setWishlistItems([]);
		}
	}, [user]);

	const loadWishlistItems = async () => {
		if (!user) return;

		setIsLoading(true);
		try {
			const items = await getWishlistItems(user.id);
			setWishlistItems(items.map((item) => item.products));
		} catch (error) {
			console.error("Error loading wishlist:", error);
			toast({
				title: "Error loading wishlist",
				status: "error",
				duration: 3000,
				isClosable: true
			});
		} finally {
			setIsLoading(false);
		}
	};

	const addToWishlist = async (product: Product) => {
		if (!user) {
			toast({
				title: "Please login",
				description: "You need to be logged in to add items to your wishlist",
				status: "warning",
				duration: 3000,
				isClosable: true
			});
			return;
		}

		setIsLoading(true);
		try {
			await addToWishlistDB(user.id, product.id);
			setWishlistItems((prev) => [...prev, product]);
			toast({
				title: "Added to wishlist",
				status: "success",
				duration: 2000,
				isClosable: true
			});
		} catch (error) {
			console.error("Error adding to wishlist:", error);
			toast({
				title: "Error adding to wishlist",
				status: "error",
				duration: 3000,
				isClosable: true
			});
		} finally {
			setIsLoading(false);
		}
	};

	const removeFromWishlist = async (productId: number) => {
		if (!user) return;

		setIsLoading(true);
		try {
			await removeFromWishlistDB(user.id, productId);
			setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
			toast({
				title: "Removed from wishlist",
				status: "success",
				duration: 2000,
				isClosable: true
			});
		} catch (error) {
			console.error("Error removing from wishlist:", error);
			toast({
				title: "Error removing from wishlist",
				status: "error",
				duration: 3000,
				isClosable: true
			});
		} finally {
			setIsLoading(false);
		}
	};

	const isInWishlist = (productId: number) => {
		return wishlistItems.some((item) => item.id === productId);
	};

	const clearWishlist = async () => {
		if (!user) return;

		setIsLoading(true);
		try {
			// Remove all items from the wishlist
			await Promise.all(
				wishlistItems.map((item) => removeFromWishlistDB(user.id, item.id))
			);
			setWishlistItems([]);
			toast({
				title: "Wishlist cleared",
				status: "success",
				duration: 2000,
				isClosable: true
			});
		} catch (error) {
			console.error("Error clearing wishlist:", error);
			toast({
				title: "Error clearing wishlist",
				status: "error",
				duration: 3000,
				isClosable: true
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<WishlistContext.Provider
			value={{
				wishlistItems,
				addToWishlist,
				removeFromWishlist,
				isInWishlist,
				clearWishlist,
				isLoading
			}}
		>
			{children}
		</WishlistContext.Provider>
	);
};

export const useWishlist = () => {
	const context = useContext(WishlistContext);
	if (context === undefined) {
		throw new Error("useWishlist must be used within a WishlistProvider");
	}
	return context;
};
