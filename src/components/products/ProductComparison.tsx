import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { Product } from "../../services/api";

interface ProductComparisonProps {
  products: Product[];
  onRemove: (productId: number) => void;
}

const ProductComparison = ({ products, onRemove }: ProductComparisonProps) => {
  if (products.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Text>No products selected for comparison</Text>
      </Box>
    );
  }

  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Feature</Th>
            {products.map((product) => (
              <Th key={product.id}>
                <VStack>
                  <Text>{product.title}</Text>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => onRemove(product.id)}
                  >
                    Remove
                  </Button>
                </VStack>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Price</Td>
            {products.map((product) => (
              <Td key={product.id}>${product.price}</Td>
            ))}
          </Tr>
          <Tr>
            <Td>Rating</Td>
            {products.map((product) => (
              <Td key={product.id}>
                {product.rating.rate} ({product.rating.count} reviews)
              </Td>
            ))}
          </Tr>
          <Tr>
            <Td>Category</Td>
            {products.map((product) => (
              <Td key={product.id}>{product.category}</Td>
            ))}
          </Tr>
          <Tr>
            <Td>Description</Td>
            {products.map((product) => (
              <Td key={product.id}>{product.description}</Td>
            ))}
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default ProductComparison;
