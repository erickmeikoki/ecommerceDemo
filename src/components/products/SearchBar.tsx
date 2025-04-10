import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  VStack,
  Text,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  List,
  ListItem,
} from "@chakra-ui/react";
import { SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../services/api";

interface SearchBarProps {
  products: Product[];
  onSearch: (query: string) => void;
  onFilter: (filter: string) => void;
  onSort: (sort: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  products,
  onSearch,
  onFilter,
  onSort,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.length > 2) {
      const filtered = products
        .filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5);
      setSuggestions(filtered);
      onOpen();
    } else {
      setSuggestions([]);
      onClose();
    }
  }, [searchQuery, products, onOpen, onClose]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleSuggestionClick = (product: Product) => {
    setSearchQuery(product.title);
    navigate(`/products/${product.id}`);
    onClose();
  };

  return (
    <Box as="form" onSubmit={handleSearch} position="relative">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          ref={inputRef}
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search products"
          role="searchbox"
          aria-autocomplete="list"
          aria-controls="search-suggestions"
          aria-expanded={isOpen}
        />
        <InputRightElement width="auto">
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              size="sm"
              mr={2}
            >
              Filter
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => onFilter("all")}>All Products</MenuItem>
              <MenuItem onClick={() => onFilter("electronics")}>
                Electronics
              </MenuItem>
              <MenuItem onClick={() => onFilter("clothing")}>Clothing</MenuItem>
              <MenuItem onClick={() => onFilter("books")}>Books</MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} size="sm">
              Sort
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => onSort("price-asc")}>
                Price: Low to High
              </MenuItem>
              <MenuItem onClick={() => onSort("price-desc")}>
                Price: High to Low
              </MenuItem>
              <MenuItem onClick={() => onSort("name-asc")}>
                Name: A to Z
              </MenuItem>
              <MenuItem onClick={() => onSort("name-desc")}>
                Name: Z to A
              </MenuItem>
            </MenuList>
          </Menu>
        </InputRightElement>
      </InputGroup>

      <Popover
        isOpen={isOpen}
        onClose={onClose}
        placement="bottom-start"
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <Box position="absolute" width="100%" />
        </PopoverTrigger>
        <PopoverContent width="100%">
          <PopoverBody>
            <List id="search-suggestions" role="listbox">
              {suggestions.map((product) => (
                <ListItem
                  key={product.id}
                  p={2}
                  cursor="pointer"
                  _hover={{ bg: "gray.100" }}
                  onClick={() => handleSuggestionClick(product)}
                  role="option"
                  aria-selected="false"
                >
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="medium">{product.title}</Text>
                    <Text fontSize="sm" color="gray.600">
                      ${product.price}
                    </Text>
                  </VStack>
                </ListItem>
              ))}
            </List>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
