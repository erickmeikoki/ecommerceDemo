import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { useCart } from "../context/CartContext";
import { Link as RouterLink } from "react-router-dom";

const Cart = () => {
  const { items, removeItem, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <Container maxW="container.xl" py={8}>
        <VStack spacing={4}>
          <Heading>Your Cart is Empty</Heading>
          <Text>Looks like you haven't added any items to your cart yet.</Text>
          <Button as={RouterLink} to="/products" colorScheme="blue">
            Continue Shopping
          </Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={8}>Shopping Cart</Heading>
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Product</Th>
              <Th>Price</Th>
              <Th>Quantity</Th>
              <Th>Total</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item) => (
              <Tr key={item.id}>
                <Td>
                  <Box display="flex" alignItems="center">
                    <Image
                      src={item.image}
                      alt={item.name}
                      boxSize="50px"
                      objectFit="cover"
                      mr={4}
                    />
                    <Text>{item.name}</Text>
                  </Box>
                </Td>
                <Td>${item.price.toFixed(2)}</Td>
                <Td>
                  <Button
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </Button>
                  <Text as="span" mx={2}>
                    {item.quantity}
                  </Text>
                  <Button
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                </Td>
                <Td>${(item.price * item.quantity).toFixed(2)}</Td>
                <Td>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Box mt={8} textAlign="right">
        <Heading size="md">Total: ${total.toFixed(2)}</Heading>
        <Button
          as={RouterLink}
          to="/checkout"
          colorScheme="blue"
          size="lg"
          mt={4}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Container>
  );
};

export default Cart;
