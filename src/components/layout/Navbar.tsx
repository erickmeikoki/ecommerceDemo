import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  Badge,
  Text,
  Avatar,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import {
  FaShoppingCart,
  FaBolt,
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const Links = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Categories", path: "/categories" },
];

const NavLink = ({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) => (
  <Link
    as={RouterLink}
    to={to}
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
  >
    {children}
  </Link>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { items } = useCart();
  const { user, logout } = useAuth();
  const cartItemsCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <HStack spacing={2}>
            <Box
              as={FaBolt}
              color="blue.500"
              boxSize={8}
              transform="rotate(-15deg)"
            />
            <Text
              fontSize="xl"
              fontWeight="bold"
              bgGradient="linear(to-r, blue.500, blue.300)"
              bgClip="text"
            >
              Swift Basket
            </Text>
          </HStack>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link.name} to={link.path}>
                {link.name}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <HStack spacing={4}>
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Box position="relative">
                <FaShoppingCart size={24} />
                {cartItemsCount > 0 && (
                  <Badge
                    position="absolute"
                    top="-1"
                    right="-1"
                    colorScheme="red"
                    borderRadius="full"
                  >
                    {cartItemsCount}
                  </Badge>
                )}
              </Box>
            </MenuButton>
            <MenuList>
              <MenuItem as={RouterLink} to="/cart">
                View Cart
              </MenuItem>
              <MenuItem as={RouterLink} to="/checkout">
                Checkout
              </MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              {user ? (
                <Avatar size="sm" name={user.name} src={user.avatar} />
              ) : (
                <FaUser size={24} />
              )}
            </MenuButton>
            <MenuList>
              {user ? (
                <>
                  <MenuItem as={RouterLink} to="/profile">
                    Profile
                  </MenuItem>
                  <MenuItem as={RouterLink} to="/orders">
                    My Orders
                  </MenuItem>
                  <MenuItem as={RouterLink} to="/wishlist">
                    Wishlist
                  </MenuItem>
                  <MenuItem onClick={logout} icon={<FaSignOutAlt />}>
                    Logout
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem as={RouterLink} to="/login" icon={<FaSignInAlt />}>
                    Login
                  </MenuItem>
                  <MenuItem as={RouterLink} to="/register">
                    Register
                  </MenuItem>
                </>
              )}
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link.name} to={link.path}>
                {link.name}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
