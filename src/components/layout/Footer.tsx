import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={"flex-start"}>
            <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
              Company
            </Text>
            <Link as={RouterLink} to={"/about"}>
              About Us
            </Link>
            <Link as={RouterLink} to={"/contact"}>
              Contact
            </Link>
            <Link as={RouterLink} to={"/careers"}>
              Careers
            </Link>
          </Stack>

          <Stack align={"flex-start"}>
            <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
              Support
            </Text>
            <Link as={RouterLink} to={"/help"}>
              Help Center
            </Link>
            <Link as={RouterLink} to={"/shipping"}>
              Shipping
            </Link>
            <Link as={RouterLink} to={"/returns"}>
              Returns
            </Link>
          </Stack>

          <Stack align={"flex-start"}>
            <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
              Legal
            </Text>
            <Link as={RouterLink} to={"/privacy"}>
              Privacy Policy
            </Link>
            <Link as={RouterLink} to={"/terms"}>
              Terms of Service
            </Link>
            <Link as={RouterLink} to={"/cookies"}>
              Cookie Policy
            </Link>
          </Stack>

          <Stack align={"flex-start"}>
            <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
              Follow Us
            </Text>
            <Link href={"#"}>Facebook</Link>
            <Link href={"#"}>Twitter</Link>
            <Link href={"#"}>Instagram</Link>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ md: "space-between" }}
          align={{ md: "center" }}
        >
          <Text>© 2024 Ecommerce. All rights reserved</Text>
          <Stack direction={"row"} spacing={6}>
            <Link href={"#"}>Privacy</Link>
            <Link href={"#"}>Terms</Link>
            <Link href={"#"}>Sitemap</Link>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
