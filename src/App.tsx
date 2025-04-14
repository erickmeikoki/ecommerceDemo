import {
	Box,
	Container,
	Input,
	InputGroup,
	InputLeftElement,
	VStack
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
	const [searchQuery, setSearchQuery] = useState("");
	const navigate = useNavigate();

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchQuery(value);
		navigate(`/products?search=${encodeURIComponent(value)}`);
	};

	return (
		<AuthProvider>
			<WishlistProvider>
				<Box minH="100vh" display="flex" flexDirection="column">
					<Navbar />
					<Container maxW="container.xl" py={8} flex="1">
						<VStack spacing={8} align="stretch">
							<InputGroup>
								<InputLeftElement pointerEvents="none">
									<SearchIcon color="gray.300" />
								</InputLeftElement>
								<Input
									placeholder="Search products..."
									value={searchQuery}
									onChange={handleSearch}
								/>
							</InputGroup>
							<Outlet context={{ searchQuery }} />
						</VStack>
					</Container>
					<Footer />
				</Box>
			</WishlistProvider>
		</AuthProvider>
	);
}

export default App;
