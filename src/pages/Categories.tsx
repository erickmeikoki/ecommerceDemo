import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Image,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Link as RouterLink } from "react-router-dom";
import { api } from "../services/api";

const Categories = () => {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: api.getCategories,
  });

  const bgColor = useColorModeValue("white", "gray.800");
  const hoverBg = useColorModeValue("gray.50", "gray.700");

  if (error) {
    return (
      <Container maxW="container.xl" py={8}>
        <Box textAlign="center">
          <Heading color="red.500">Error</Heading>
          <Text>Failed to load categories. Please try again later.</Text>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading size="xl" textAlign="center">
          Shop by Category
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {categories?.map((category) => (
            <Box
              key={category}
              as={RouterLink}
              to={`/products?category=${category}`}
              p={6}
              bg={bgColor}
              borderRadius="lg"
              boxShadow="md"
              _hover={{
                transform: "translateY(-5px)",
                boxShadow: "lg",
                bg: hoverBg,
              }}
              transition="all 0.2s"
            >
              <VStack spacing={4}>
                <Badge
                  colorScheme="blue"
                  fontSize="lg"
                  textTransform="capitalize"
                >
                  {category}
                </Badge>
                <Text textAlign="center">
                  Discover our collection of {category}
                </Text>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Categories;
