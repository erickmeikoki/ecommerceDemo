import { useState, useEffect } from "react";
import {
	Box,
	Container,
	Heading,
	VStack,
	HStack,
	Avatar,
	Text,
	Button,
	useToast,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	SimpleGrid,
	Card,
	CardBody,
	Image,
	Badge,
	Input,
	IconButton
} from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import {
	getViewingHistory,
	getOrders,
	updateProfilePicture,
	ViewingHistory,
	Order
} from "../lib/database";
import { Link as RouterLink } from "react-router-dom";
import { EditIcon } from "@chakra-ui/icons";

export default function Profile() {
	const { user } = useAuth();
	const [viewingHistory, setViewingHistory] = useState<ViewingHistory[]>([]);
	const [orders, setOrders] = useState<Order[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const toast = useToast();

	useEffect(() => {
		if (user) {
			loadData();
		}
	}, [user]);

	const loadData = async () => {
		try {
			const [history, userOrders] = await Promise.all([
				getViewingHistory(user!.id),
				getOrders(user!.id)
			]);
			setViewingHistory(history);
			setOrders(userOrders);
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to load profile data",
				status: "error",
				duration: 3000,
				isClosable: true
			});
		}
	};

	const handleProfilePictureChange = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setIsLoading(true);
		try {
			await updateProfilePicture(user!.id, file);
			toast({
				title: "Success",
				description: "Profile picture updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true
			});
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to update profile picture",
				status: "error",
				duration: 3000,
				isClosable: true
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Container maxW="container.xl" py={8}>
			<VStack spacing={8} align="stretch">
				<HStack spacing={4}>
					<Box position="relative">
						<Avatar
							size="2xl"
							name={user?.email}
							src={user?.user_metadata?.avatar_url}
						/>
						<Input
							type="file"
							accept="image/*"
							position="absolute"
							top={0}
							left={0}
							width="100%"
							height="100%"
							opacity={0}
							cursor="pointer"
							onChange={handleProfilePictureChange}
						/>
						<IconButton
							aria-label="Change profile picture"
							icon={<EditIcon />}
							position="absolute"
							bottom={0}
							right={0}
							size="sm"
							colorScheme="blue"
							isRound
						/>
					</Box>
					<VStack align="start" spacing={2}>
						<Heading size="lg">{user?.email}</Heading>
						<Text>
							Member since {new Date(user?.created_at!).toLocaleDateString()}
						</Text>
					</VStack>
				</HStack>

				<Tabs variant="enclosed">
					<TabList>
						<Tab>Viewing History</Tab>
						<Tab>Orders</Tab>
					</TabList>

					<TabPanels>
						<TabPanel>
							<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
								{viewingHistory.map((item) => (
									<Card
										key={item.id}
										as={RouterLink}
										to={`/products/${item.products.id}`}
									>
										<CardBody>
											<Image
												src={item.products.image_url}
												alt={item.products.name}
												borderRadius="lg"
												height="200px"
												objectFit="cover"
											/>
											<Heading size="md" mt={4}>
												{item.products.name}
											</Heading>
											<Text color="gray.600">
												Viewed on{" "}
												{new Date(item.viewed_at).toLocaleDateString()}
											</Text>
										</CardBody>
									</Card>
								))}
							</SimpleGrid>
						</TabPanel>

						<TabPanel>
							<VStack spacing={4} align="stretch">
								{orders.map((order) => (
									<Card key={order.id}>
										<CardBody>
											<HStack justify="space-between">
												<VStack align="start">
													<Text>Order #{order.id}</Text>
													<Text>Total: ${order.total_amount.toFixed(2)}</Text>
													<Text>
														Date:{" "}
														{new Date(order.created_at).toLocaleDateString()}
													</Text>
												</VStack>
												<Badge
													colorScheme={
														order.status === "pending"
															? "yellow"
															: order.status === "processing"
															? "blue"
															: order.status === "shipped"
															? "purple"
															: order.status === "delivered"
															? "green"
															: "red"
													}
												>
													{order.status}
												</Badge>
											</HStack>
											<VStack align="start" mt={4}>
												{order.order_items.map((item) => (
													<HStack key={item.id} spacing={4}>
														<Image
															src={item.products.image_url}
															alt={item.products.name}
															boxSize="50px"
															objectFit="cover"
														/>
														<Text>
															{item.products.name} x {item.quantity}
														</Text>
														<Text>${item.price.toFixed(2)}</Text>
													</HStack>
												))}
											</VStack>
										</CardBody>
									</Card>
								))}
							</VStack>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</VStack>
		</Container>
	);
}
