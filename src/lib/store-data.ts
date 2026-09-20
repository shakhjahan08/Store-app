export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  seller: string;
  description: string;
  stock: number;
  image: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 129,
    category: "Electronics",
    seller: "Apex Tech",
    description: "Noise cancelling over-ear headphones with deep bass.",
    stock: 18,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Classic Leather Bag",
    price: 89,
    category: "Fashion",
    seller: "Vanta Studio",
    description: "Premium leather crossbody bag with spacious compartments.",
    stock: 12,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Smart Watch Pro",
    price: 199,
    category: "Electronics",
    seller: "Nova Devices",
    description: "Track steps, sleep, heart rate, and messages in real time.",
    stock: 20,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Organic Cotton T-Shirt",
    price: 35,
    category: "Fashion",
    seller: "Green Thread",
    description: "Soft everyday t-shirt made from organic cotton.",
    stock: 42,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Home Coffee Kit",
    price: 64,
    category: "Home",
    seller: "Brew House",
    description: "Complete starter kit for fresh coffee at home.",
    stock: 15,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Office Chair",
    price: 220,
    category: "Home",
    seller: "WorkNest",
    description: "Ergonomic chair for work-from-home comfort and support.",
    stock: 8,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
  },
];

export const sellerSummary = {
  sales: 12480,
  orders: 342,
  products: 46,
  pending: 18,
};

export const sellerProducts = products.map((product) => ({
  ...product,
  revenue: product.price * 18,
}));
