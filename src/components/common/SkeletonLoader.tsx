import { Box, Skeleton, SkeletonText, VStack } from "@chakra-ui/react";

interface SkeletonLoaderProps {
  count?: number;
  height?: string;
  width?: string;
}

export const ProductCardSkeleton: React.FC<SkeletonLoaderProps> = ({
  count = 1,
  height = "200px",
  width = "100%",
}) => {
  return (
    <VStack spacing={4} align="stretch">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
          >
            <Skeleton height={height} width={width} />
            <SkeletonText mt="4" noOfLines={2} spacing="4" />
            <Skeleton height="40px" mt="4" width="100%" />
          </Box>
        ))}
    </VStack>
  );
};

export const ProductListSkeleton: React.FC<SkeletonLoaderProps> = ({
  count = 6,
}) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{
        base: "1fr",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
      }}
      gap={6}
    >
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
    </Box>
  );
};
