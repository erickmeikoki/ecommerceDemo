import { Login as LoginComponent } from "../components/Auth/Login";
import { Box, Heading, Text, Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function Login() {
	return (
		<Box>
			<Heading textAlign="center" mb={8}>
				Sign In
			</Heading>
			<LoginComponent />
			<Text mt={4} textAlign="center">
				Don't have an account?{" "}
				<ChakraLink as={RouterLink} to="/register" color="blue.500">
					Sign up
				</ChakraLink>
			</Text>
		</Box>
	);
}
