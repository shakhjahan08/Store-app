"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { products } from "@/lib/store-data";

export default function CheckoutPage() {
  const [submitted, setSubmitted] = useState(false);
  const [cart, setCart] = useState<{ id: number; qty: number }[]>([]);

  const loadCart = () => {
    const saved = localStorage.getItem("storeapp-cart");
    if (saved) setCart(JSON.parse(saved));
  };

  if (typeof window !== "undefined" && !cart.length) {
    loadCart();
  }

  const items = useMemo(
    () =>
      cart
        .map((item) => {
          const product = products.find((productItem) => productItem.id === item.id);
          return product ? { ...product, qty: item.qty } : null;
        })
        .filter(Boolean) as Array<(typeof products)[number] & { qty: number }>,
    [cart]
  );

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 0 ? 12 : 0;
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    localStorage.removeItem("storeapp-cart");
    setCart([]);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Checkout</p>
            <h1 className="text-4xl font-bold">Complete your order</h1>
          </div>
          <Link href="/store" className="rounded-full border border-slate-700 px-4 py-2 hover:bg-slate-800">
            Back to shop
          </Link>
        </div>

        {submitted ? (
          <div className="rounded-2xl border border-green-500/50 bg-green-500/10 p-6 text-center">
            <h2 className="text-2xl font-bold text-green-300">Order placed successfully!</h2>
            <p className="mt-2 text-slate-300">Your products are now being prepared for delivery.</p>
            <Link href="/store" className="mt-5 inline-block rounded-full bg-blue-600 px-5 py-2 font-semibold hover:bg-blue-500">
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="rounded-2xl bg-slate-800 p-4">
                <p className="text-sm text-slate-400">Shipping address</p>
                <p className="mt-2 text-lg font-semibold">123 Market Street</p>
                <p className="text-slate-300">New York, NY 10001</p>
              </div>

              <div className="rounded-2xl bg-slate-800 p-4">
                <p className="text-sm text-slate-400">Payment</p>
                <p className="mt-2 text-lg font-semibold">Visa •••• 4242</p>
              </div>

              <div className="rounded-2xl bg-slate-800 p-4">
                <p className="text-sm text-slate-400">Items</p>
                {items.length === 0 ? (
                  <p className="mt-2 text-slate-300">No items selected.</p>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="mt-3 flex items-center justify-between text-slate-300">
                      <span>
                        {item.name} x {item.qty}
                      </span>
                      <span>${item.price * item.qty}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-5">
              <h2 className="text-2xl font-bold">Summary</h2>

              <div className="mt-6 space-y-3 text-slate-300">
                <div className="flex justify-between"><span>Subtotal</span><span>${subtotal}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>${shipping}</span></div>
                <div className="flex justify-between"><span>Taxes</span><span>$0</span></div>
                <div className="mt-4 flex justify-between border-t border-slate-700 pt-4 text-xl font-bold text-white">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={!items.length}
                className="mt-8 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Place order
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
