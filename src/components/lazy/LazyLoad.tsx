import { Suspense, lazy, ComponentType } from "react";
import { Box, Spinner } from "@chakra-ui/react";

interface LazyLoadProps {
  component: () => Promise<{ default: ComponentType<any> }>;
  fallback?: React.ReactNode;
}

const defaultFallback = (
  <Box display="flex" justifyContent="center" alignItems="center" minH="200px">
    <Spinner size="xl" />
  </Box>
);

export const LazyLoad: React.FC<LazyLoadProps> = ({
  component,
  fallback = defaultFallback,
}) => {
  const LazyComponent = lazy(component);

  return (
    <Suspense fallback={fallback}>
      <LazyComponent />
    </Suspense>
  );
};
