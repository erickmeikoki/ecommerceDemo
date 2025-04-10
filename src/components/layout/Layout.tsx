import { Box, Container, Flex, Heading, Link, Spacer } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box minH="100vh">
      <Box as="header" bg="gray.100" py={4}>
        <Container maxW="container.xl">
          <Flex align="center">
            <Heading size="md">
              <Link as={RouterLink} to="/" _hover={{ textDecoration: "none" }}>
                E-Commerce Store
              </Link>
            </Heading>
            <Spacer />
            <Flex gap={4}>
              <Link as={RouterLink} to="/products">
                Products
              </Link>
              <Link as={RouterLink} to="/cart">
                Cart
              </Link>
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.xl" py={8} flex={1}>
        {children}
      </Container>

      <Box as="footer" bg="gray.100" py={4} mt={8}>
        <Container maxW="container.xl" textAlign="center">
          © {new Date().getFullYear()} E-Commerce Store. All rights reserved.
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
