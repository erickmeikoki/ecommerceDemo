# Serverless E-commerce App

A modern e-commerce application built with React, TypeScript, and Chakra UI. This application demonstrates a serverless architecture with a mock API for product data and cart management.

## Features

- Product listing and details
- Shopping cart functionality
- Checkout process
- Responsive design
- Modern UI with Chakra UI
- Type-safe development with TypeScript

## Tech Stack

- React
- TypeScript
- Chakra UI
- React Router
- React Query
- Vite

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd ecommerce
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and visit `http://localhost:5173`

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── layout/      # Layout components
│   ├── product/     # Product-related components
│   ├── cart/        # Cart-related components
│   └── checkout/    # Checkout-related components
├── context/         # React context providers
├── pages/           # Page components
├── services/        # API services
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## Development

- The application uses a mock API service for product data and cart operations
- All state management is handled through React Context
- The UI is built with Chakra UI components
- Routing is managed with React Router
- Data fetching is handled with React Query

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
