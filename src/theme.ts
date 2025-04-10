import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.50",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "md",
      },
      variants: {
        solid: {
          bg: "blue.500",
          color: "white",
          _hover: {
            bg: "blue.600",
          },
        },
      },
    },
  },
});

export default theme;
