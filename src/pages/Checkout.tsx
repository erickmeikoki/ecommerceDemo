import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { api } from "../services/api";

const Checkout = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { items, total, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderData = {
        items: items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
        total,
        customerInfo: formData,
      };

      const response = await api.placeOrder(orderData);

      if (response.success) {
        toast({
          title: "Order Placed!",
          description: `Your order #${response.orderId} has been placed successfully.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        clearCart();
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (items.length === 0) {
    return (
      <Container maxW="container.xl" py={8}>
        <Box textAlign="center">
          <Heading>Your Cart is Empty</Heading>
          <Text mt={4}>
            Please add some items to your cart before checking out.
          </Text>
          <Button
            mt={6}
            colorScheme="blue"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Stack spacing={8}>
        <Heading>Checkout</Heading>
        <Box as="form" onSubmit={handleSubmit} maxW="600px" mx="auto" w="100%">
          <Stack spacing={6}>
            <FormControl isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Shipping Address</FormLabel>
              <Input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main St, City, Country"
              />
            </FormControl>

            <Box>
              <Text fontSize="xl" fontWeight="bold">
                Total: ${total.toFixed(2)}
              </Text>
            </Box>

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              isLoading={isSubmitting}
              loadingText="Placing Order..."
            >
              Place Order
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default Checkout;
