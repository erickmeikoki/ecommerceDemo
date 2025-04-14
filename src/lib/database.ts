import { supabase } from "./supabase";

export interface Product {
	id: number;
	name: string;
	description: string;
	price: number;
	image_url: string;
	category_id: number;
	created_at: string;
}

export interface Category {
	id: number;
	name: string;
	description: string;
}

export interface CartItem {
	id: number;
	user_id: string;
	product_id: number;
	quantity: number;
	created_at: string;
}

export interface ViewingHistory {
	id: number;
	user_id: string;
	product_id: number;
	viewed_at: string;
	products: {
		id: number;
		name: string;
		image_url: string;
	};
}

export interface Order {
	id: number;
	user_id: string;
	total_amount: number;
	status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
	created_at: string;
	order_items: Array<{
		id: number;
		order_id: number;
		product_id: number;
		quantity: number;
		price: number;
		products: {
			id: number;
			name: string;
			image_url: string;
		};
	}>;
}

export interface OrderItem {
	id: number;
	order_id: number;
	product_id: number;
	quantity: number;
	price: number;
}

export interface WishlistItem {
	id: number;
	user_id: string;
	product_id: number;
	created_at: string;
	product: Product;
}

// Products
export const getProducts = async () => {
	const { data, error } = await supabase.from("products").select("*");
	if (error) throw error;
	return data;
};

export const getProduct = async (id: number) => {
	const { data, error } = await supabase
		.from("products")
		.select("*")
		.eq("id", id)
		.single();
	if (error) throw error;
	return data;
};

// Categories
export const getCategories = async () => {
	const { data, error } = await supabase.from("categories").select("*");
	if (error) throw error;
	return data;
};

// Cart
export const getCartItems = async (userId: string) => {
	const { data, error } = await supabase
		.from("cart_items")
		.select(
			`
      *,
      products (*)
    `
		)
		.eq("user_id", userId);
	if (error) throw error;
	return data;
};

export const addToCart = async (
	userId: string,
	productId: number,
	quantity: number
) => {
	const { data, error } = await supabase.from("cart_items").upsert({
		user_id: userId,
		product_id: productId,
		quantity
	});
	if (error) throw error;
	return data;
};

export const removeFromCart = async (userId: string, productId: number) => {
	const { error } = await supabase
		.from("cart_items")
		.delete()
		.eq("user_id", userId)
		.eq("product_id", productId);
	if (error) throw error;
};

// Viewing History
export const addToViewingHistory = async (
	userId: string,
	productId: number
) => {
	const { data, error } = await supabase.from("viewing_history").upsert({
		user_id: userId,
		product_id: productId,
		viewed_at: new Date().toISOString()
	});
	if (error) throw error;
	return data;
};

export const getViewingHistory = async (userId: string) => {
	const { data, error } = await supabase
		.from("viewing_history")
		.select(
			`
      *,
      products (*)
    `
		)
		.eq("user_id", userId)
		.order("viewed_at", { ascending: false })
		.limit(10);
	if (error) throw error;
	return data;
};

// Orders
export const createOrder = async (
	userId: string,
	items: { product_id: number; quantity: number; price: number }[]
) => {
	const { data: order, error: orderError } = await supabase
		.from("orders")
		.insert({
			user_id: userId,
			total_amount: items.reduce(
				(sum, item) => sum + item.price * item.quantity,
				0
			),
			status: "pending"
		})
		.select()
		.single();

	if (orderError) throw orderError;

	const orderItems = items.map((item) => ({
		order_id: order.id,
		product_id: item.product_id,
		quantity: item.quantity,
		price: item.price
	}));

	const { error: itemsError } = await supabase
		.from("order_items")
		.insert(orderItems);

	if (itemsError) throw itemsError;

	return order;
};

export const getOrders = async (userId: string) => {
	const { data, error } = await supabase
		.from("orders")
		.select(
			`
      *,
      order_items (
        *,
        products (*)
      )
    `
		)
		.eq("user_id", userId)
		.order("created_at", { ascending: false });
	if (error) throw error;
	return data;
};

// Profile Picture
export const updateProfilePicture = async (userId: string, file: File) => {
	const fileExt = file.name.split(".").pop();
	const fileName = `${userId}-${Math.random()}.${fileExt}`;
	const filePath = `profile-pictures/${fileName}`;

	const { error: uploadError } = await supabase.storage
		.from("profile-pictures")
		.upload(filePath, file);

	if (uploadError) throw uploadError;

	const {
		data: { publicUrl }
	} = supabase.storage.from("profile-pictures").getPublicUrl(filePath);

	const { error: updateError } = await supabase.from("profiles").upsert({
		id: userId,
		avatar_url: publicUrl
	});

	if (updateError) throw updateError;

	return publicUrl;
};

// Wishlist
export const addToWishlist = async (userId: string, productId: number) => {
	const { data, error } = await supabase
		.from("wishlist_items")
		.upsert({
			user_id: userId,
			product_id: productId
		})
		.select(
			`
			*,
			products (*)
		`
		)
		.single();

	if (error) throw error;
	return data;
};

export const removeFromWishlist = async (userId: string, productId: number) => {
	const { error } = await supabase
		.from("wishlist_items")
		.delete()
		.eq("user_id", userId)
		.eq("product_id", productId);

	if (error) throw error;
};

export const getWishlistItems = async (userId: string) => {
	const { data, error } = await supabase
		.from("wishlist_items")
		.select(
			`
			*,
			products (*)
		`
		)
		.eq("user_id", userId);

	if (error) throw error;
	return data;
};
