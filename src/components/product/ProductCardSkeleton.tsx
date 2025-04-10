import { Box, Skeleton, VStack } from "@chakra-ui/react";

const ProductCardSkeleton = () => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      <VStack spacing={4} align="stretch">
        <Skeleton height="200px" />
        <VStack spacing={2} align="start">
          <Skeleton height="20px" width="80px" />
          <Skeleton height="24px" width="full" />
          <Skeleton height="40px" width="full" />
          <Box>
            <Skeleton height="24px" width="80px" />
            <Skeleton height="16px" width="120px" mt={2} />
          </Box>
        </VStack>
        <Skeleton height="40px" width="full" />
      </VStack>
    </Box>
  );
};

export default ProductCardSkeleton;
