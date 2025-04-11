# E-commerce Store

A modern, responsive e-commerce application built with React, TypeScript, and Chakra UI. This project demonstrates a full-featured online store with product browsing, cart management, wishlist functionality, and more.

## Features

- 🛍️ Product browsing and filtering
- 🔍 Advanced search functionality
- 🛒 Shopping cart management
- ❤️ Wishlist functionality
- 🔄 Product comparison
- 👤 User authentication
- 📱 Responsive design
- ⚡ Offline support with PWA
- 🚀 Serverless architecture

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **UI Library**: Chakra UI
- **State Management**: React Context API
- **Data Fetching**: Axios
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/erickmeikoki/ecommerceDemo.git
cd ecommerceDemo
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

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── common/        # Common components
│   ├── layout/        # Layout components
│   ├── products/      # Product-related components
│   └── lazy/          # Lazy-loaded components
├── context/           # React Context providers
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── services/          # API services
└── theme.ts           # Chakra UI theme configuration
```

## API Integration

The application uses the FakeStore API for product data:

- Base URL: `https://fakestoreapi.com`
- Endpoints:
  - Products: `/products`
  - Categories: `/products/categories`
  - Single Product: `/products/{id}`

## Deployment

The application is deployed on Vercel and can be accessed at:

- [https://ecommerce-snowy-three.vercel.app/](https://ecommerce-snowy-three.vercel.app/)

To deploy your own version:

1. Push your changes to the main branch
2. Vercel will automatically deploy the latest version
3. Visit your Vercel dashboard to manage deployments

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [FakeStore API](https://fakestoreapi.com) for providing the product data
- [Chakra UI](https://chakra-ui.com) for the component library
- [Vercel](https://vercel.com) for hosting and deployment
