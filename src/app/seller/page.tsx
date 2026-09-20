"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { products, Product } from "@/lib/store-data";
import { getLocalProducts, saveLocalProducts } from "@/lib/seller-storage";

const defaultForm = {
  name: "",
  category: "Electronics",
  price: "",
  stock: "",
  description: "",
  image: "",
};

export default function SellerPage() {
  const [form, setForm] = useState(defaultForm);
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    const customProducts = getLocalProducts();
    setItems([...products, ...customProducts]);
  }, []);

  const allProducts = useMemo(() => items, [items]);

  const handleChange = (field: string, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newProduct: Product = {
      id: Date.now(),
      name: form.name,
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
      description: form.description || "New seller product",
      seller: "Your Store",
      image:
        form.image ||
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    };

    const updated = [...items, newProduct];
    setItems(updated);
    saveLocalProducts(updated.filter((product) => product.seller === "Your Store"));
    setForm(defaultForm);
  };

  const removeProduct = (id: number) => {
    const filtered = items.filter((item) => item.id !== id);
    setItems(filtered);
    saveLocalProducts(filtered.filter((item) => item.seller === "Your Store"));
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Seller tools</p>
            <h1 className="text-4xl font-bold">Manage products</h1>
          </div>
          <Link href="/dashboard" className="rounded-full border border-slate-700 px-4 py-2 hover:bg-slate-800">
            Back to dashboard
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1.9fr]">
          <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-5 text-2xl font-bold">Add new product</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-300">Product name</label>
                <input
                  required
                  value={form.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300">Category</label>
                <select
                  value={form.category}
                  onChange={(event) => handleChange("category", event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
                >
                  <option>Electronics</option>
                  <option>Fashion</option>
                  <option>Home</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-300">Price</label>
                  <input
                    required
                    type="number"
                    min="1"
                    value={form.price}
                    onChange={(event) => handleChange("price", event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-300">Stock</label>
                  <input
                    required
                    type="number"
                    min="1"
                    value={form.stock}
                    onChange={(event) => handleChange("stock", event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-300">Image URL</label>
                <input
                  value={form.image}
                  onChange={(event) => handleChange("image", event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300">Description</label>
                <textarea
                  value={form.description}
                  onChange={(event) => handleChange("description", event.target.value)}
                  rows={4}
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
                />
              </div>

              <button className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold hover:bg-blue-500">
                Save product
              </button>
            </div>
          </form>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-5 text-2xl font-bold">Published products</h2>

            <div className="space-y-4">
              {allProducts.map((product) => (
                <div key={product.id} className="flex gap-4 rounded-2xl border border-slate-800 bg-slate-800 p-3">
                  <img src={product.image} alt={product.name} className="h-20 w-20 rounded-xl object-cover" />
                  <div className="flex flex-1 items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <p className="text-sm text-slate-400">{product.category}</p>
                      <p className="text-sm text-slate-300">${product.price} • {product.stock} in stock</p>
                    </div>

                    <button
                      onClick={() => removeProduct(product.id)}
                      className="rounded-full border border-red-500/50 px-3 py-2 text-sm text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
