import { Product } from '../types/product';

// Mock product data
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description: "Experience crystal-clear sound with our premium wireless headphones. Features noise cancellation and 30-hour battery life.",
    price: 249.99,
    discount: 15,
    category: "electronics",
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.8,
    inStock: true
  },
  {
    id: 2,
    name: "Ergonomic Office Chair",
    description: "Work in comfort with this ergonomic office chair. Adjustable height, lumbar support, and breathable mesh back.",
    price: 199.99,
    discount: 0,
    category: "furniture",
    image: "https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.5,
    inStock: true
  },
  {
    id: 3,
    name: "Smart Fitness Watch",
    description: "Track your fitness goals with this advanced smartwatch. Features heart rate monitoring, GPS, and water resistance.",
    price: 179.99,
    discount: 10,
    category: "electronics",
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.6,
    inStock: true
  },
  {
    id: 4,
    name: "Organic Cotton T-Shirt",
    description: "Stay comfortable with this 100% organic cotton t-shirt. Eco-friendly, soft, and available in multiple colors.",
    price: 29.99,
    discount: 0,
    category: "clothing",
    image: "https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.3,
    inStock: true
  },
  {
    id: 5,
    name: "Professional DSLR Camera",
    description: "Capture stunning photos with this professional DSLR camera. 24.1 megapixels, 4K video recording, and interchangeable lenses.",
    price: 899.99,
    discount: 5,
    category: "electronics",
    image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.9,
    inStock: false
  },
  {
    id: 6,
    name: "Stainless Steel Water Bottle",
    description: "Stay hydrated with this insulated stainless steel water bottle. Keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 34.99,
    discount: 0,
    category: "kitchen",
    image: "https://images.pexels.com/photos/1188649/pexels-photo-1188649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.7,
    inStock: true
  },
  {
    id: 7,
    name: "Leather Messenger Bag",
    description: "Carry your essentials in style with this genuine leather messenger bag. Multiple compartments and adjustable strap.",
    price: 149.99,
    discount: 20,
    category: "accessories",
    image: "https://images.pexels.com/photos/2081199/pexels-photo-2081199.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.4,
    inStock: true
  },
  {
    id: 8,
    name: "Smart Home Speaker",
    description: "Transform your home with this smart speaker. Voice control, premium sound quality, and smart home integration.",
    price: 129.99,
    discount: 15,
    category: "electronics",
    image: "https://images.pexels.com/photos/6039243/pexels-photo-6039243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.5,
    inStock: true
  },
  {
    id: 9,
    name: "Ceramic Coffee Mug Set",
    description: "Enjoy your morning coffee with this set of 4 ceramic mugs. Microwave and dishwasher safe.",
    price: 39.99,
    discount: 0,
    category: "kitchen",
    image: "https://images.pexels.com/photos/1566308/pexels-photo-1566308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.2,
    inStock: true
  },
  {
    id: 10,
    name: "Yoga Mat",
    description: "Practice yoga comfortably with this non-slip, eco-friendly yoga mat. 6mm thickness for joint protection.",
    price: 49.99,
    discount: 10,
    category: "fitness",
    image: "https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.6,
    inStock: true
  },
  {
    id: 11,
    name: "Mechanical Keyboard",
    description: "Enhance your typing experience with this mechanical keyboard. Customizable RGB lighting and tactile key switches.",
    price: 89.99,
    discount: 0,
    category: "electronics",
    image: "https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.7,
    inStock: true
  },
  {
    id: 12,
    name: "Scented Candle Set",
    description: "Create a relaxing atmosphere with this set of 3 scented candles. Made with natural soy wax and essential oils.",
    price: 24.99,
    discount: 0,
    category: "home",
    image: "https://images.pexels.com/photos/4195499/pexels-photo-4195499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.4,
    inStock: true
  }
];

// Simulate API call with a delay
export const fetchProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 800);
  });
};

export const fetchProductById = (id: number): Promise<Product | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = mockProducts.find(p => p.id === id);
      resolve(product);
    }, 300);
  });
};

export const fetchProductsByCategory = (category: string): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredProducts = mockProducts.filter(p => p.category === category);
      resolve(filteredProducts);
    }, 500);
  });
};
