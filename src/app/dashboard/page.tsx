"use client";

import { useEffect, useState } from "react";
import { sellerProducts, sellerSummary } from "@/lib/store-data";

export default function DashboardPage() {
  const [name, setName] = useState("Seller");

  useEffect(() => {
    const user = localStorage.getItem("storeapp-user");
    if (user) {
      const parsed = JSON.parse(user);
      if (parsed?.name) setName(parsed.name);
    }
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">Seller dashboard</p>
            <h1 className="text-4xl font-bold">Welcome, {name}</h1>
          </div>

          <div className="flex gap-3">
            <a href="/seller" className="rounded-full border border-slate-700 px-4 py-2 hover:bg-slate-800">
              Product manager
            </a>
            <a href="/orders" className="rounded-full bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-500">
              Orders
            </a>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {[
            ["Sales", `$${sellerSummary.sales.toLocaleString()}`],
            ["Orders", sellerSummary.orders.toString()],
            ["Products", sellerSummary.products.toString()],
            ["Pending", sellerSummary.pending.toString()],
          ].map(([label, value]) => (
            <div key={label} className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-sm text-slate-400">{label}</p>
              <p className="mt-3 text-2xl font-bold">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h2 className="mb-5 text-2xl font-bold">Your listings</h2>

          <div className="overflow-x-auto rounded-3xl border border-slate-800">
            <table className="w-full min-w-[700px] text-left">
              <thead className="bg-slate-900">
                <tr className="text-slate-300">
                  <th className="p-4">Product</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Revenue</th>
                </tr>
              </thead>

              <tbody>
                {sellerProducts.map((product) => (
                  <tr key={product.id} className="border-t border-slate-800">
                    <td className="p-4">{product.name}</td>
                    <td className="p-4">{product.category}</td>
                    <td className="p-4">${product.price}</td>
                    <td className="p-4">{product.stock}</td>
                    <td className="p-4">${product.revenue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
