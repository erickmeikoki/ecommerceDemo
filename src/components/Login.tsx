import { useState } from "react";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	VStack,
	Heading,
	Text,
	Link as ChakraLink,
	useColorModeValue
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { login } = useAuth();
	const formBackground = useColorModeValue("gray.100", "gray.700");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			await login(email, password);
		} catch (error) {
			// Error is handled in AuthContext
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Box
			minH="100vh"
			display="flex"
			alignItems="center"
			justifyContent="center"
			bg={useColorModeValue("gray.50", "gray.800")}
		>
			<Box
				p={8}
				maxWidth="400px"
				borderWidth={1}
				borderRadius={8}
				boxShadow="lg"
				bg={formBackground}
			>
				<VStack spacing={4} align="flex-start" w="full">
					<Heading size="lg">Welcome Back</Heading>
					<Text>Please sign in to continue</Text>

					<form onSubmit={handleSubmit} style={{ width: "100%" }}>
						<VStack spacing={4} align="flex-start" w="full">
							<FormControl isRequired>
								<FormLabel>Email</FormLabel>
								<Input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									bg={useColorModeValue("white", "gray.800")}
								/>
							</FormControl>

							<FormControl isRequired>
								<FormLabel>Password</FormLabel>
								<Input
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									bg={useColorModeValue("white", "gray.800")}
								/>
							</FormControl>

							<Button
								type="submit"
								colorScheme="blue"
								width="full"
								isLoading={isLoading}
							>
								Sign In
							</Button>
						</VStack>
					</form>

					<Text w="full" textAlign="center">
						Don't have an account?{" "}
						<ChakraLink as={Link} to="/register" color="blue.500">
							Sign Up
						</ChakraLink>
					</Text>
				</VStack>
			</Box>
		</Box>
	);
}
