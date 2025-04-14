import React, { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
	id: string;
	name: string;
	price: number;
	image: string;
	quantity?: number;
}

interface CartContextType {
	items: CartItem[];
	addItem: (item: CartItem) => void;
	removeItem: (itemId: string) => void;
	updateQuantity: (itemId: string, quantity: number) => void;
	clearCart: () => void;
	total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [items, setItems] = useState<CartItem[]>(() => {
		const saved = localStorage.getItem("cart");
		return saved ? JSON.parse(saved) : [];
	});

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(items));
	}, [items]);

	const addItem = (item: CartItem) => {
		setItems((prev) => {
			const existingItem = prev.find((i) => i.id === item.id);
			if (existingItem) {
				return prev.map((i) =>
					i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
				);
			}
			return [...prev, { ...item, quantity: 1 }];
		});
	};

	const removeItem = (itemId: string) => {
		setItems((prev) => prev.filter((item) => item.id !== itemId));
	};

	const updateQuantity = (itemId: string, quantity: number) => {
		if (quantity < 1) {
			removeItem(itemId);
			return;
		}
		setItems((prev) =>
			prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
		);
	};

	const clearCart = () => {
		setItems([]);
	};

	const total = items.reduce(
		(sum, item) => sum + item.price * (item.quantity || 1),
		0
	);

	return (
		<CartContext.Provider
			value={{
				items,
				addItem,
				removeItem,
				updateQuantity,
				clearCart,
				total
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
};
