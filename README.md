# E-commerce Demo

A modern e-commerce application built with React, TypeScript, and Supabase.

## Features

- User authentication with Supabase
- Product browsing and searching
- Shopping cart functionality
- Wishlist management
- Responsive design with Chakra UI

## Tech Stack

- React
- TypeScript
- Supabase (Authentication & Database)
- Chakra UI
- React Router
- Vite

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/yourusername/ecommerce-demo.git
cd ecommerce-demo
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server

```bash
npm run dev
```

## Project Structure

```
src/
├── components/     # React components
├── context/        # React context providers
├── lib/            # Utility functions and configurations
├── services/       # API services
└── types/          # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
