"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { products, Product } from "@/lib/store-data";

export default function StorePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState<{ id: number; qty: number }[]>([]);
  const [name, setName] = useState("Guest");

  useEffect(() => {
    const savedUser = localStorage.getItem("storeapp-user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      if (parsed?.name) setName(parsed.name);
    }

    const savedCart = localStorage.getItem("storeapp-cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("storeapp-cart", JSON.stringify(cart));
  }, [cart]);

  const categories = ["All", ...new Set(products.map((product) => product.category))];

  const filteredProducts = useMemo(() => {
    const query = search.toLowerCase();

    return products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.seller.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  const addToCart = (product: Product) => {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id);

      if (found) {
        return current.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [...current, { id: product.id, qty: 1 }];
    });
  };

  const totalItems = cart.reduce((total, item) => total + item.qty, 0);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-2xl font-bold">
          StoreApp
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-300">Hi, {name}</span>
          <Link href="/cart" className="rounded-full bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-500">
            Cart ({totalItems})
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Shop trending products</h1>
          <p className="mt-2 text-slate-400">Browse fresh items from trusted sellers.</p>
        </div>

        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products or sellers"
            className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none placeholder:text-slate-500"
          />

          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full px-4 py-2 ${
                  category === item ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <article key={product.id} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
              <img src={product.image} alt={product.name} className="h-60 w-full object-cover" />

              <div className="p-5">
                <div className="mb-2 flex items-center justify-between text-sm text-slate-400">
                  <span className="rounded-full bg-slate-800 px-2 py-1 text-xs">{product.category}</span>
                  <span>{product.seller}</span>
                </div>

                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="mt-2 text-sm text-slate-400">{product.description}</p>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">${product.price}</p>
                    <p className="text-xs text-slate-400">{product.stock} in stock</p>
                  </div>

                  <button onClick={() => addToCart(product)} className="rounded-full bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-500">
                    Add to cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
