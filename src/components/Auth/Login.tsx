import { useState } from "react";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	VStack,
	Text,
	useToast
} from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";

export function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { signIn } = useAuth();
	const toast = useToast();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			await signIn(email, password);
			toast({
				title: "Success",
				description: "You have been logged in successfully",
				status: "success",
				duration: 3000,
				isClosable: true
			});
		} catch (error) {
			toast({
				title: "Error",
				description: error instanceof Error ? error.message : "Failed to login",
				status: "error",
				duration: 3000,
				isClosable: true
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Box maxW="md" mx="auto" mt={8}>
			<form onSubmit={handleSubmit}>
				<VStack spacing={4}>
					<FormControl isRequired>
						<FormLabel>Email</FormLabel>
						<Input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</FormControl>
					<FormControl isRequired>
						<FormLabel>Password</FormLabel>
						<Input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
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
		</Box>
	);
}
