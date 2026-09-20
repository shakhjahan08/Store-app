"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { products } from "@/lib/store-data";

export default function CartPage() {
  const [cart, setCart] = useState<{ id: number; qty: number }[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("storeapp-cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("storeapp-cart", JSON.stringify(cart));
  }, [cart]);

  const cartItems = useMemo(
    () =>
      cart
        .map((item) => {
          const product = products.find((p) => p.id === item.id);
          return product ? { ...product, qty: item.qty } : null;
        })
        .filter(Boolean) as Array<(typeof products)[number] & { qty: number }>,
    [cart]
  );

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 0 ? 12 : 0;
  const total = subtotal + shipping;

  const updateQty = (id: number, delta: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">Client cart</p>
            <h1 className="text-4xl font-bold">Your order</h1>
          </div>

          <Link href="/store" className="rounded-full border border-slate-700 px-4 py-2 hover:bg-slate-800">
            Continue shopping
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            {cartItems.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900 p-10 text-center text-slate-400">
                Your cart is empty.
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 rounded-3xl border border-slate-800 bg-slate-900 p-4">
                  <img src={item.image} alt={item.name} className="h-28 w-28 rounded-2xl object-cover" />

                  <div className="flex flex-1 items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold">{item.name}</h2>
                      <p className="text-slate-400">{item.seller}</p>
                      <p className="mt-2 font-bold">${item.price}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button onClick={() => updateQty(item.id, -1)} className="h-8 w-8 rounded-full bg-slate-800">
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="h-8 w-8 rounded-full bg-slate-800">
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <aside className="h-fit rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-bold">Order summary</h2>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-slate-300">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Shipping</span>
                <span>${shipping}</span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-slate-700 pt-4 text-xl font-semibold">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>

            <Link
              href={cartItems.length ? "/checkout" : "/store"}
              className={`mt-8 block w-full rounded-xl px-4 py-3 text-center font-semibold ${
                cartItems.length ? "bg-blue-600 hover:bg-blue-500" : "cursor-not-allowed bg-slate-700 text-slate-400"
              }`}
            >
              {cartItems.length ? "Proceed to checkout" : "Add products first"}
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
